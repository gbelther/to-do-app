import { useState } from 'react';
import nextId from 'react-id-generator';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      return;
    }

    const newTask = {
      id: nextId(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: string) {
    const currentTask = tasks.filter((task) => task.id !== id);

    setTasks(currentTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            autoFocus
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateNewTask()}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
