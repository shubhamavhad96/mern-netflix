import axios from 'axios'
import {create} from 'zustand'
import toast from 'react-hot-toast'

// here we are creating a store for the authenticated user and thats a hook that we can use in our components

export const useAuthStore = create((set) => ({
    user:null,
    isSigningUp: false,
    isCheckingAuth: false,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials)
            set({user: response.data.user, isSigningUp: false})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Signup Failed");
            set({isSigningUp: false, user: null})
        }
    },
    login: async (credentials) => {
        set({isLoggingIn: true})
        try {
            const response = await axios.post('/api/v1/auth/login', credentials)
            set({user: response.data.user, isLoggingIn: false})
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Login Failed");
            set({isLoggingIn: false, user: null})
        }
    },
    logout: async () => {
        set({isLoggingOut: true})
        try {
            await axios.post('/api/v1/auth/logout')
            set({user: null, isLoggingOut: false})
            toast.success("Logged out successfully")
        } catch (error) {
            set({isLoggingOut: false})
            toast.error(error.response.data.message || "Logout failed")
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: true})
        try {
            const response = await axios.get('/api/v1/auth/authCheck')
            set({user: response.data.user, isCheckingAuth: false})
        } catch (error) {
            set({isCheckingAuth: false, user: null})
            void error;
            // toast.error(error.response.data.message || "An error occurred")    why this is commented because if we allow the toast then it will show the toast on every page refresh liek no token found and we dont want that.
        }
    }
}))