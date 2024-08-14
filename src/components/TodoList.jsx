function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <span className="todo-task">{todo.task}</span>
          <button
            className={`todo-status ${todo.completed ? "completed" : ""}`}
          >
            {todo.completed ? "Completed" : "Incomplete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
