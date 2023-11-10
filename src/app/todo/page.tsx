import { useEffect, useState } from 'react';
import TaskInputForm from '../components/add_todo';
import TaskList from '../components/task_list';
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../types/taskTypes';

const TodoPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // タスクの読み込み
  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    };

    fetchTasks();
  }, []);

  // タスクの追加
  const handleAddTask = async (taskTitle: string) => {
    await addTask(taskTitle);
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  // タスクの更新
  const handleUpdateTask = async (taskId: string, newValues: Partial<Task>) => {
    await updateTask(taskId, newValues);
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  // タスクの削除
  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  return (
    <div>
      <TaskInputForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default TodoPage;


