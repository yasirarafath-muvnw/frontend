"use client";

import { GetAllProjects, GetAllTasks, GetAllUsers } from "@/api/queries/user";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Modal, Box, Typography, TextField, MenuItem, IconButton, FormControlLabel, Checkbox
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axiosInstance from "@/api/axios";
import { DeleteTaskById, PostTask, UpdateTaskStatus } from "@/api/mutations/user";

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
  const { accessToken, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskModal, setTaskModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    const previousTasks = tasks;
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await UpdateTaskStatus(taskId, { status: newStatus });
      toast.success("Task status updated");
    } catch (err) {
      toast.error("Failed to update status");
      setTasks(previousTasks);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    const previousTasks = tasks;

    // Optimistic UI update
    setTasks((prev) =>
      prev.filter((task) => task._id !== taskToDelete)
    );

    try {
      await DeleteTaskById(taskToDelete);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
      setTasks(previousTasks); // rollback
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
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
        <Button variant="contained" color="primary" disabled={role === "USER"} onClick={() => setTaskModal(true)}>
          Add Task
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              {/* <TableCell sx={{ color: "white" }}>Description</TableCell> */}
              <TableCell sx={{ color: "white" }}>project</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Created By</TableCell>
              <TableCell sx={{ color: "white" }}>Assigned To</TableCell>
              <TableCell sx={{ color: "white" }}>Created Date</TableCell>
              <TableCell sx={{ color: "white" }}>Last Updated</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id} hover>
                <TableCell>{task.title}</TableCell>
                {/* <TableCell>{task.description}</TableCell> */}
                <TableCell>{task?.project?.name}</TableCell>
                <TableCell>
                  <TextField
                    select
                    size="small"
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                    sx={{
                      minWidth: 80,
                      "& .MuiSelect-select": {
                        padding: "4px 8px",
                        fontSize: "14px",
                      },
                    }}
                  >
                    <MenuItem value="pending" sx={{ fontSize: 12, minHeight: 28 }} >Pending</MenuItem>
                    <MenuItem value="in-progress" sx={{ fontSize: 12, minHeight: 28 }} >In Progress</MenuItem>
                    <MenuItem value="completed" sx={{ fontSize: 12, minHeight: 28 }} >Completed</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>
                  {task.createdBy?.name || "Unknown"}
                </TableCell>
                <TableCell>
                  {task.assignedTo?.name || "Unknown"}
                </TableCell>
                <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(task.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    disabled={role === "USER"}
                    onClick={() => {
                      setTaskToDelete(task._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
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

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Delete
            </h2>

            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this task?
              <br />
              <span className="text-red-600 font-medium">
                This action cannot be undone.
              </span>
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTaskToDelete(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
