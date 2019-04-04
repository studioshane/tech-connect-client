const BASE_URL = "http://localhost:3000/"
const TECH_URL = BASE_URL + "technicians"
const PROD_URL = BASE_URL + "producers"
const EVENT_URL = BASE_URL + "events"

const getAllTechnicians = () => fetch(TECH_URL).then(resp => resp.json())

const signUpTech = techData => {
  return fetch(TECH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ technician: techData })
  }).then(resp => resp.json())
}

const signUpProd = prodData => {
  return fetch(TECH_URL, {
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
