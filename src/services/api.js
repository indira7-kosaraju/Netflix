import axios from 'axios'
import { findMovie, movies } from '../data/movies'
export const API_BASE_URL = 'http://localhost:8080/api'
export const apiClient = axios.create({ baseURL: API_BASE_URL })
export const loginUser = async (credentials) => ({ data: credentials })
export const registerUser = async (details) => ({ data: details })
export const getMovies = async () => movies
export const getMovieById = async (id) => findMovie(id)