const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date-input")
  const calendarBtn = document.querySelector(".icon-btn")
  const calendarCard = document.querySelector(".calendar-card")
  const container = document.querySelector(".datepicker-container")
  const monthDisplay = document.querySelector(".current-month")
  const grid = document.querySelector(".calendar-grid")
  const [prevBtn, nextBtn] = document.querySelectorAll(".nav-btn")
  const todayBtn = document.querySelector(".text-btn")
  const clearBtn = document.querySelector(".action-btn")

  let currentDate = new Date()
  let selectedDate = new Date(2022, 11, 21)

  function formatDate(d) {
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth() + 1).padStart(2, "0")
    return `${day} / ${month} / ${d.getFullYear()}`
  }

  function renderCalendar() {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const lastDay = new Date(year, month + 1, 0).getDate()

    monthDisplay.textContent = `${MONTHS[month]} ${year}`

    const dayNames = [...grid.querySelectorAll(".day-name")]
    grid.innerHTML = ""
    dayNames.forEach((el) => grid.appendChild(el))

    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement("span")
      cell.className = "day empty"
      grid.appendChild(cell)
    }

    for (let d = 1; d <= lastDay; d++) {
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "day"
      btn.textContent = d
      const isSelected =
        selectedDate.getDate() === d &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      if (isSelected) btn.classList.add("active")
      btn.addEventListener("click", () => selectDate(d))
      grid.appendChild(btn)
    }
  }

  function selectDate(day) {
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    dateInput.value = formatDate(selectedDate)
    closeCalendar()
    renderCalendar()
  }

  function openCalendar() {
    calendarCard.classList.add("show")
    container.classList.add("is-open")
    document.body.classList.add("calendar-open")
  }

  function closeCalendar() {
    calendarCard.classList.remove("show")
    container.classList.remove("is-open")
    document.body.classList.remove("calendar-open")
  }

  calendarBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    calendarCard.classList.contains("show") ? closeCalendar() : openCalendar()
  })

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    renderCalendar()
  })

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    renderCalendar()
  })

  todayBtn.addEventListener("click", () => {
    currentDate = new Date()
    selectDate(currentDate.getDate())
  })

  clearBtn.addEventListener("click", () => {
    dateInput.value = ""
    closeCalendar()
  })

  document.addEventListener("click", (e) => {
    if (!calendarCard.contains(e.target) && !calendarBtn.contains(e.target)) {
      closeCalendar()
    }
  })

  dateInput.value = formatDate(selectedDate)
  renderCalendar()
})
