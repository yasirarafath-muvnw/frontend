export const endpoints = {
    signUp: "api/auth/signup",
    login: "api/auth/login",
    postProfilePic: 'api/user/upload',
    postProfileDetails: 'api/user',
    GetUserProfile: (data) => `api/user/${data}`
}