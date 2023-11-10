"use client"
import { useState } from 'react'
import  TaskInputForm from '../components/add_todo'
import  TaskList  from '../components/task_list'
import { Task } from '../types/taskTypes';

const TodoPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // タスクの状態を管理

  const addTask = (taskTitle: string) => {
    const newTask = { id: Date.now().toString(), title: taskTitle, completed: false };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string) => {
    // タスクの更新ロジック
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <TaskInputForm onAddTask={addTask} />
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </div>
  );
};

export default TodoPage;
