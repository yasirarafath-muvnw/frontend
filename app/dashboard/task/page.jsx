"use client";

import { GetAllProjects, GetAllTasks, GetAllUsers } from "@/api/queries/user";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Modal, Box, Typography, TextField, MenuItem, FormControlLabel, Checkbox
} from "@mui/material";
import axiosInstance from "@/api/axios";
import { PostTask } from "@/api/mutations/user";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function Task() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskModal, setTaskModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
    assignedTo: "",
    project: ""
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await GetAllTasks();
        setTasks(data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        const { data } = await GetAllUsers();
        setUsers(data?.users || []);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchProjects = async () => {
      try {
        const { data } = await GetAllProjects();
        console.log('projects----------------', data);

        setProjects(data);
      } catch (err) {
        console.log('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    if (!form.name || !form.status || !form.project || !form.assignedTo) {
      toast.error("Please fill all required fields");
      return;
    }

    const taskPayload = {
      title: form.name,
      description: form.description,
      status: form.status,
      assignedTo: form.assignedTo,
      project: form.project,
    };

    const { data } = await PostTask(taskPayload);

    console.log('data', data);

    setTasks((prev) => [...prev, data]);
    toast.success("Task added successfully");
    setTaskModal(false);
    setForm({ name: "", description: "", status: "", assignedTo: "", project: "" });
  };

  return (
    <div className="p-4">
      <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
        Tasks
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'black' }}>Task List</Typography>
        <Button variant="contained" color="primary" onClick={() => setTaskModal(true)}>
          Add Task
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>project</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Created By</TableCell>
              <TableCell sx={{ color: "white" }}>Assigned To</TableCell>
              <TableCell sx={{ color: "white" }}>Created Date</TableCell>
              <TableCell sx={{ color: "white" }}>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id} hover>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task?.project?.name}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>{task.status}</TableCell>
                <TableCell>
                  {task.createdBy?.name || "Unknown"}
                </TableCell>
                <TableCell>
                  {task.assignedTo?.name || "Unknown"}
                </TableCell>
                <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(task.updatedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Task Modal */}
      <Modal
        open={taskModal}
        onClose={() => setTaskModal(false)}
        aria-labelledby="add-task-title"
      >
        <Box sx={modalStyle}>
          <Typography id="add-task-title" variant="h6" sx={{ mb: 2 }}>
            Add Task
          </Typography>

          <TextField
            fullWidth
            label="Task Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Project"
            name="project"
            value={form.project}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Project</MenuItem>
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="on-hold">On Hold</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Assign To"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Member</MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => setTaskModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleAddTask}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
