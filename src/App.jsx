import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      id:1,
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id:2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id:3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todo"));
    if ( data !== null) setTodos(data)
  }, [])

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false
      }
    ];
    localStorage.setItem("todo", JSON.stringify(newTodos));
    const getTodo = JSON.parse(localStorage.getItem("todo")); 
    setTodos(getTodo);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
     todo.id !== id ? todo : null
    );
    localStorage.setItem("todo", JSON.stringify(filteredTodos));
    const getTodo = JSON.parse(localStorage.getItem("todo")); 
    setTodos(getTodo);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => 
      todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
    );
    setTodos(newTodos);
  };

  const filteredTodo = () =>
    todos.filter((todo) =>
      filter === "All" 
      ? true 
      : filter === "Completed" 
      ? todo.isCompleted 
      : !todo.isCompleted
    )
    .filter((todo) => 
      todo.text.toLowerCase().includes(search.toLocaleLowerCase())
    ).sort((a, b) => 
        sort === "Asc" 
        ? a.text.localeCompare(b.text) 
        : b.text.localeCompare(a.text)
    );

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {filteredTodo()
          .map((todo) => (
            <Todo 
              key={todo.id}
              todo={todo} 
              removeTodo={removeTodo} 
              completeTodo={completeTodo} 
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  ); 
}

export default App;