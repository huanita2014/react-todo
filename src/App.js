import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoInfo from './components/TodoInfo/Fotoer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import todoService from './services/todoService';
import userService from './services/authService';
import LoginForm from './components/Authentication/LoginForm/LoginForm';
import RegisterForm from './components/Authentication/RegisterForm/RegisterForm';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

//callbacks for filtering todos by status
const FILTERS = {
  All: () => true,
  Active: (todo) => !todo.done,
  Completed: (todo) => todo.done,
};

const FILTER_NAMES = Object.keys(FILTERS);

const successNotify = (message) =>
  toast(message, {
    type: 'success',
  });

const errorNotify = (message) =>
  toast(message, {
    type: 'error',
  });

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const reamainingTodos = todos.filter((todo) => !todo.done);

  const checkAuth = async () => {
    try {
      const res = await userService.isAuthenticated();
      setIsAuthenticated(res.data.isAuthenticated);
      setUser(res.data.user);
      retrieveTodos();
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const login = async (userData) => {
    try {
      const res = await userService.login(userData);
      setIsAuthenticated(res.data.isAuthenticated);
      retrieveTodos();
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const register = async (userData) => {
    if (userData.password != userData.password2) {
      errorNotify("Passwords doesn't match");
    } else {
      const { username, email, password } = userData;
      console.log(password);
      try {
        const res = await userService.register({ username, email, password });
        successNotify(res.data.message);
      } catch (err) {
        errorNotify(err.message);
      }
    }
  };

  const logout = () => {
    userService.logout();
    setIsAuthenticated(false);
  };

  const retrieveTodos = async () => {
    try {
      const res = await todoService.getAll();
      setTodos(res.data);
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const clearCompleted = async () => {
    if (reamainingTodos.length !== todos.length) {
      try {
        const res = await todoService.clearCompleted();
        successNotify(res.data);
        setTodos(reamainingTodos);
      } catch (err) {
        errorNotify(err.message);
      }
    } else {
      errorNotify("You don't have completed todos");
    }
  };

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) {
      retrieveTodos();
    }
  }, []);

  let itemsLeft = todos.reduce((accumulator, todo) => {
    return todo.done ? accumulator : accumulator + 1;
  }, 0);

  const toggleTodoDone = async (id) => {
    try {
      const todo = (await todoService.getTodoByID(id)).data;
      const res = await todoService.update(id, { done: !todo.done });
      successNotify(res.data.mes);
      const updatedTodos = todos.map((todo) => {
        if (id === todo._id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (err) {
      errorNotify(err.message);
    }
  };

  //Toggle checked status of all todos
  const toggleTodos = async () => {
    try {
      const res = await todoService.toggleTodos();
      successNotify(res.data);
      const updatedTodos = todos.map((todo) => {
        return { ...todo, done: reamainingTodos.length > 0 ? true : false };
      });
      setTodos(updatedTodos);
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const addTodo = async (title) => {
    const newTodo = { title, done: false };
    try {
      const res = await todoService.add(newTodo);
      successNotify(res.data.message);
      setTodos([...todos, res.data.todo]);
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await todoService.remove(id);
      successNotify(res.data);
      const reamainingTodos = todos.filter((todo) => todo._id !== id);
      setTodos(reamainingTodos);
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const editTodo = async (id, newTitle) => {
    try {
      const res = await todoService.update(id, { title: newTitle });
      const editedTodos = todos.map((todo) => {
        if (id === todo._id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      });
      setTodos(editedTodos);
      successNotify(res.data.message);
    } catch (err) {
      errorNotify(err.message);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm login={login} />
    );
  };

  const registerForm = () => {
    return (
      <RegisterForm register={register} />
    );
  };

  if (isAuthenticated) {
    return (
      <Router>
        <Navbar isAuthenticated={isAuthenticated} user={user} logout={logout} />
        <div className="wrapper">
          <h1>Todos</h1>
          <div className="container">
            <TodoForm
              addTodo={addTodo}
              toggleTodos={toggleTodos}
              errorNotify={errorNotify}
            />
            <TodoList
              todos={todos}
              toggleTodoDone={toggleTodoDone}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              filters={FILTERS}
              filter={filter}
            />
            {todos.length > 0 ? (
              <TodoInfo
                itemsLeft={itemsLeft}
                filterNames={FILTER_NAMES}
                setFilter={setFilter}
                filter={filter}
                clearCompleted={clearCompleted}
              />
            ) : (
                ''
              )}
          </div>
          <ToastContainer />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <Redirect to="/login" />
        <Navbar isAuthenticated={isAuthenticated} />
        <div className="wrapper">
          <h1>Todos</h1>
          <div className="container">
            <Route exact path="/login" component={loginForm} />
            <Route exact path="/register" component={registerForm} />
          </div>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}

export default App;
