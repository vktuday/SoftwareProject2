import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api",
});

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const createQuiz = (data) =>
  API.post("/quiz", data);

export const getQuizzes = (userId) =>
  API.get(`/quiz/${userId}`);
