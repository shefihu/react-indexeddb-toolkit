import React, { useState } from "react";

import { Plus, Trash2, Check, RefreshCw } from "lucide-react";
import { useIndexedDB } from "react-indexeddb-toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

const TodoDemo: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    error,
    save,
    remove,
    update,
  } = useIndexedDB<Todo>({
    dbName: "TodoDemoDB",
    stores: [
      {
        name: "todos",
        keyPath: "id",
      },
    ],
  });

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await save(todo);
      setNewTodo("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      await update(todo.id, { completed: !todo.completed });
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await remove(id);
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 card">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
          <span className="ml-3 text-gray-600">Loading todos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 card">
        <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold">
          <Check className="w-8 h-8 text-primary-600" />
          Todo Demo
        </h2>

        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">
            {error}
          </div>
        )}

        {/* Add Todo Form */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className="flex items-center gap-2 btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 text-center rounded bg-gray-50">
            <div className="text-2xl font-bold text-primary-600">
              {todos.length}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="p-3 text-center rounded bg-gray-50">
            <div className="text-2xl font-bold text-green-600">
              {todos.filter((t) => t.completed).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="p-3 text-center rounded bg-gray-50">
            <div className="text-2xl font-bold text-orange-600">
              {todos.filter((t) => !t.completed).length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <Check className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No todos yet. Add your first todo above!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="w-5 h-5 border-gray-300 rounded text-primary-600"
                />
                <div className="flex-1">
                  <div
                    className={`${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {todo.text}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-gray-400 transition-colors hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDemo;
