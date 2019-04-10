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
