import axios from 'axios'
export const API_URL = 'http://localhost:4000'

export async function getAllQuestions() {
  return await axios.get(`${API_URL}/questions`)
}

export async function getQuestion(id) {
  return await axios.get(`${API_URL}/question/${id}`)
}

export async function postQuestion(question) {
  return await axios.post(`${API_URL}/question`, question)
}

export async function updateQuestion(question, id) {
  return await axios.put(`${API_URL}/question/${id}`, question)
}

export async function deleteQuestion(id) {
  return await axios.delete(`${API_URL}/question/${id}`)
}
