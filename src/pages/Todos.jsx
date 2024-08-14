import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import { useUser } from "@clerk/clerk-react";

function Todos() {
  const { user } = useUser();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id);
      setTodos(data || []);
    };

    fetchTodos();
  }, [user.id]);

  const handleAddTodo = async (newTodo) => {
    const { data } = await supabase
      .from("todos")
      .insert([{ user_id: user.id, task: newTodo, completed: false }])
      .select();
    setTodos([...todos, ...data]);
  };

  return (
    <div className="container">
      <h1 className="header">Your To-Do List</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default Todos;
