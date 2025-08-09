"use client"

import { GetAllTasks } from '@/api/queries/user';
import React, { useEffect } from 'react'

export default function Task() {

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await GetAllTasks();
      console.log(data);
    };
    fetchTasks();
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-black">Task Page</h2>
    </div>
  )
}
