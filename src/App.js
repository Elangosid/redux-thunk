import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateTask, GetTask, DeleteTask, UpdateTask } from "./actions/taskAction";

const App = () => {
  const [task, setTask] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const dispatch = useDispatch();
  const { task: tasks, isLoading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(GetTask());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      dispatch(UpdateTask({ ...task, id: currentTaskId }));
      setEditing(false);
    } else {
      dispatch(CreateTask(task));
    }
    setTask({ name: "", email: "" });
  }

  function handleEdit(task) {
    setTask({ name: task.name, email: task.email });
    setEditing(true);
    setCurrentTaskId(task.id);
  }

  return (
    <div className="container  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={task.email}
            onChange={(e) => setTask({ ...task, email: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold text-white ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isLoading ? "Submitting..." : editing ? "Update" : "Submit"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-600">Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-md shadow">
              <span>{task.name} - {task.email}</span>
              <div>
                <button
                  onClick={() => handleEdit(task)}
                  className="mr-2 text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(DeleteTask(task.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
