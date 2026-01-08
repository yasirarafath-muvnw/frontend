export const endpoints = {
  auth: {
    signUp: "/api/auth/signup",
    login: "/api/auth/login",
  },

  user: {
    create: "api/user",
    update: (id) => `/api/user/${id}`,
    delete: (id) => `api/user/${id}`,
    get: (id) => `api/user/${id}`,
    uploadProfilePic: "api/user/upload",
    getAll: `/api/users`
  },

  project: {
    getAll: "/api/projects"
  },

  task: {
    getAll: `/api/tasks`,
    post: `/api/tasks`,
  }
};
