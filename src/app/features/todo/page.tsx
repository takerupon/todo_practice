"use client"
import { useEffect, useState } from 'react';
import TaskInputForm from '../../components/add_todo';
import TaskList from '../../components/task_list';
import { Task } from '../../common/types/taskTypes';

const TodoPage = () => {

  return (
    <div>
      <TaskInputForm />
      <TaskList />
    </div>
  );
};

export default TodoPage;


