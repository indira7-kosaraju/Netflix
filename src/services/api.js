import axios from 'axios'
import { findMovie, movies } from '../data/movies'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const apiClient = axios.create({
    baseURL: API_BASE_URL
})

export const loginUser = async (credentials) => {
    const response = await apiClient.post('/users/login', credentials)
    return response.data
}

export const registerUser = async (details) => {
    const response = await apiClient.post('/users', details)
    return response.data
}

export const getMovies = async () => movies

export const getMovieById = async (id) => findMovie(id)