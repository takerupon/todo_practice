"use client"
import { useEffect, useState } from 'react';
import TaskInputForm from '../../components/add_todo';
import TaskList from '../../components/task_list';
import Header from '@/app/header';
import RootLayout from '@/app/layout';

const TodoPage = () => {

  return (
    <>
    <RootLayout showLogoutButton={true}>
      <TaskInputForm />
      <TaskList />
    </RootLayout>
    </>
  );
};

export default TodoPage;


