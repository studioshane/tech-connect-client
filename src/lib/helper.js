export const capitalize = word => word[0].toUpperCase() + word.substring(1)

export const firstName = name => name.split(" ")[0]

export const formatDate = date => {
  const formatDate = date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/")

  const formatTime = date.split("T")[1].slice(0, 5)

  return formatDate + " - " + formatTime
}

export const disciplines = ["audio", "video", "lighting", "general"]

export const sortDatesHighToLow = (a, b) => {
  a = new Date(a.start)
  b = new Date(b.start)
  return a > b ? -1 : a < b ? 1 : 0
}
export const sortDatesLowToHigh = (a, b) => {
  a = new Date(a.start)
  b = new Date(b.start)
  return a < b ? -1 : a > b ? 1 : 0
}
