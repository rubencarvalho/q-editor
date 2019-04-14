import axios from 'axios'
export const API_URL = 'http://localhost:4000'

export async function getAllQuestions() {
  return await axios.get(`${API_URL}/questions`)
}

export async function getQuestion() {}

export async function postQuestion(question) {
  return await axios.post(`${API_URL}/question`, question)
}

export async function putQuestion() {}
