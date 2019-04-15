const BASE_URL = "http://localhost:3000/"
const TECH_URL = BASE_URL + "technicians"
const PROD_URL = BASE_URL + "producers"
const EVENT_URL = BASE_URL + "events"
const LOGIN_URL = BASE_URL + "login"

const getAllTechnicians = () => fetch(TECH_URL).then(resp => resp.json())

const getTechnicianEvents = id =>
  fetch(TECH_URL + `/${id}/events`).then(resp => resp.json())

const getAvailableTechnicians = id =>
  fetch(EVENT_URL + `/${id}/available_technicians`).then(resp => resp.json())

const getProducerEvents = id =>
  fetch(PROD_URL + `/${id}/events`).then(resp => resp.json())

const signUpTech = techData => {
  return fetch(TECH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ technician: techData })
  }).then(resp => resp.json())
}

const signUpProd = prodData => {
  return fetch(PROD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ producer: prodData })
  }).then(resp => resp.json())
}

const createEvent = eventData => {
  return fetch(EVENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventData })
  }).then(resp => resp.json())
}

const login = user => {
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user })
  }).then(resp => resp.json())
}

const getTechById = id => fetch(`${TECH_URL}/${id}`).then(resp => resp.json())

const getEventById = id => fetch(`${EVENT_URL}/${id}`).then(resp => resp.json())

const deleteEvent = id =>
  fetch(`${EVENT_URL}/${id}`, { method: "DELETE" }).then(resp => resp.json())

const removeTechFromEvent = (eventId, techId) =>
  fetch(`${EVENT_URL}/${eventId}/removetechnician`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: eventId, technician: { id: techId } })
  }).then(resp => resp.json())

const addTechToEvent = (eventId, techId) =>
  fetch(`${EVENT_URL}/${eventId}/addtechnician`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: eventId, technician_id: techId })
  }).then(resp => resp.json())

export default {
  signUpTech,
  signUpProd,
  createEvent,
  getTechById,
  getEventById,
  getAllTechnicians,
  login,
  getTechnicianEvents,
  getProducerEvents,
  deleteEvent,
  removeTechFromEvent,
  addTechToEvent,
  getAvailableTechnicians
}
