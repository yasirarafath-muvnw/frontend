"use client";

import { GetAllProjects, GetAllUsers } from '@/api/queries/user';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Projects() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectModal, setProjectModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    status: '',
    priority: '',
    startDate: '',
    endDate: '',
    members: [],
  });

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        const { data } = await GetAllUsers();

        console.log('users', data?.users);
        setUsers(data?.users);

        // console.log('users', response?.data?.users);
        // setUsers(response.data.users);

      } catch (error) {
        console.log('err', error);
      }
    };

    const fetchProjects = async () => {

      try {
        const { data } = await GetAllProjects();

        console.log('projects', data);
        setProjects(data);

        // console.log('projects', res?.data);
        // console.log('projects', res?.data);
        // setProjects(res.data);

      } catch (err) {
        console.log('Failed to fetch projects:', err);
      }
    };

    fetchUsers();
    fetchProjects();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMemberToggle = (id) => {
    setForm((prev) => {
      const exists = prev.members.includes(id);
      const newMembers = exists
        ? prev.members.filter((mid) => mid !== id)
        : [...prev.members, id];
      return { ...prev, members: newMembers };
    });
  };

  const handleAddProject = async () => {
    if (!form.name || !form.status || !form.priority) {
      toast.error('Required fields missing');
      return;
    }

    const payload = {
      ...form
    };

    console.log('project payload', payload);

    console.log('accessToken', accessToken);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/projects',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('res', response?.data);

      toast.success('Project added successfully');
      setProjectModal(false);

      setForm({
        name: '',
        description: '',
        status: '',
        priority: '',
        startDate: '',
        endDate: '',
        members: [],
      });

      setProjects((prev) => [...prev, response.data.project]);
    } catch (error) {
      toast.error('Failed to add project');
      console.log('error', error);
    }
  };

  const getUserNameById = (id) => {
    const user = users.find((u) => u._id === id);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="bg-amber-100 min-h-screen p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      <div className="flex justify-between items-center mb-4">
        <p>Project List</p>
        <button
          className="bg-sky-500 text-white px-4 py-2 rounded"
          onClick={() => setProjectModal(true)}
        >
          Add Project
        </button>
      </div>

      {/* Project Modal */}
      {projectModal && (
        <div className="fixed inset-4 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl text-black relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setProjectModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-3">Add Project</h2>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2 text-black"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2 text-black"
            ></textarea>

            <select
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2 text-black"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2 text-black"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <div className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleInputChange}
                className="p-2 border rounded text-black"
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleInputChange}
                className="p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <p className="font-medium mb-2">Select Members:</p>
              <div className="grid grid-cols-2 gap-2 text-black">
                {users.map((user) => (
                  <label key={user._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.members.includes(user._id)}
                      onChange={() => handleMemberToggle(user._id)}
                    />
                    <span>{user.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded text-black"
                onClick={() => setProjectModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddProject}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className='flex-col w-full bg-white'>
        <div className='flex-row gap-2 flex justify-between mb-1 bg-blue-300 p-3'>
          <p className='flex-[1]' >Name</p>
          <p className='flex-[1]' >Description</p>
          <p className='flex-[1]' >Status</p>
          <p className='flex-[1]' >Priority</p>
          <p className='flex-[1]' >Members</p>
          <p className='flex-[1]' >StartDate</p>
          <p className='flex-[1]' >EndDate</p>
        </div>

        {projects.map((item) => {
          return (
            <div
              key={item._id}
              className="flex-row gap-2 flex justify-between py-3 bg-blue-400 p-3"
            >
              <p className='flex-[1]'>{item.name}</p>
              <p className='flex-[1]'>{item.description}</p>
              <p className='flex-[1]'>{item.status}</p>
              <p className='flex-[1]'>{item.priority}</p>
              <select
                name="priority"
                value={form.priority}
                // onChange={handleInputChange}
                className="w-full p-2 border rounded text-black flex-[1]"
              >
                {item.members.map((item) => <div>
                  <p>
                    <option value={getUserNameById(item)}>{getUserNameById(item)}</option>

                  </p>
                </div>)}
              </select>
              <p className='flex-[1]'>{new Date(item.startDate).toLocaleDateString()}</p>
              <p className='flex-[1]'>{new Date(item.endDate).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div> */}

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-blue-300 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Members</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t hover:bg-blue-50">
              <td className="p-3">{project.name}</td>
              <td className="p-3">{project.description}</td>
              <td className="p-3 capitalize">{project.status}</td>
              <td className="p-3 capitalize">{project.priority}</td>
              <td className="p-3">
                <div className="flex flex-col gap-1">
                  {project.members.map((memberId) => {
                    const user = users.find((u) => u._id === memberId);
                    return (
                      <div key={memberId} className="flex items-center gap-2">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
                          {user?.name?.charAt(0) || "?"}
                        </div>
                        <span>{user?.name || "Unknown User"}</span>
                      </div>
                    );
                  })}
                </div>
              </td>
              <td className="p-3">{new Date(project.startDate).toLocaleDateString()}</td>
              <td className="p-3">{new Date(project.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Projects;
