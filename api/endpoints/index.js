export const endpoints = {
  auth: {
    signUp: "api/auth/signup",
    login: "api/auth/login",
  },

  user: {
    create: "api/user",
    update: (id) => `api/user/${id}`,
    delete: (id) => `api/user/${id}`,
    get: (id) => `api/user/${id}`,
    uploadProfilePic: "api/user/upload",
  },

  tasks: {
    create: "api/tasks",
    getAll: "api/tasks",
    getById: (id) => `api/tasks/${id}`,
    deleteById: (id) => `api/tasks/${id}`,
    getByUser: (userId) => `api/tasks/user/${userId}`,
    updateStatus: (id) => `api/tasks/${id}`,
  },

  projects: {
    create: "api/projects",
    getAll: "api/projects",
    getById: (id) => `api/projects/${id}`,
    deleteById: (id) => `api/projects/${id}`,
    update: (id) => `api/projects/${id}`,
    getByUser: (userId) => `api/projects/user/${userId}`,
  }
};
