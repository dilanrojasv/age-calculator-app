const calcAgeBTN = document.querySelector("#calc-btn")

const dateUserInput = document.querySelector("#date-picker-form")

const invalidDate = document.querySelector(".invalid-date-wrapper")
const dimBackground = document.querySelector(".bg-overlay")

const dayInput = document.querySelector("#day-input")
const monthInput = document.querySelector("#month-input")
const yearInput = document.querySelector("#year-input")

const dayHeader = document.querySelector(".day")
const monthHeader = document.querySelector(".month")
const yearHeader = document.querySelector(".year")

const dayError = document.querySelector("#day-error")
const monthError = document.querySelector("#month-error")
const yearError = document.querySelector("#year-error")

const calcDays = document.querySelector("#calc-days")
const calcMonths = document.querySelector("#calc-months")
const calcYears = document.querySelector("#calc-years")

var validDays = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/
var validMonths = /^(0?[1-9]|1[0-2])$/
var validYears = /^(?:[1-9]|[1-9][0-9]{1,2}|1[0-9]{3}|20[01][0-9]|202[0-4])$/

// Whole form error
function checkDate() {
  if (dayInput.hasAttribute("valid") && monthInput.hasAttribute("valid") && yearInput.hasAttribute("valid")) {
    dateUserInput.setAttribute("valid", "")
    dateUserInput.removeAttribute("invalid")
  } 
  if (dayInput.hasAttribute("invalid") && monthInput.hasAttribute("invalid") && yearInput.hasAttribute("invalid")) {
    dateUserInput.removeAttribute("valid")
    dayError.textContent = "Must be a valid date"
    monthError.textContent = ""
    yearError.textContent = ""
  }
}

function invalidForm() {
  dateUserInput.setAttribute("invalid", "")
  dateUserInput.removeAttribute("valid")
}

function validForm() {
  dateUserInput.setAttribute("valid", "")
  dateUserInput.removeAttribute("invalid")
}

function invalidDay() {
  dayError.textContent = "Must be a valid day"
  dayHeader.style.color = "var(--clr-light-red)"
  dayInput.removeAttribute("valid")
  dayInput.setAttribute("invalid", "")
  invalidForm()
}

function invalidMonth() {
  monthError.textContent = "Must be a valid month"
  monthHeader.style.color = "var(--clr-light-red)"
  monthInput.removeAttribute("valid")
  monthInput.setAttribute("invalid", "")
  dateUserInput.setAttribute("invalid", "")
  invalidForm()
}

function invalidYear() {
  yearError.textContent = "Must be a valid year"
  yearHeader.style.color = "var(--clr-light-red)"
  yearInput.removeAttribute("valid")
  yearInput.setAttribute("invalid", "")
  dateUserInput.setAttribute("invalid", "")
  invalidForm()
}

function validDay() {
  dayError.textContent = ""
  dayHeader.style.color = "var(--clr-smokey-grey)"
  dayInput.removeAttribute("invalid")
  dayInput.setAttribute("valid", "")
  validForm()
}

function validMonth() {
  monthError.textContent = ""
  monthHeader.style.color = "var(--clr-smokey-grey)"
  monthInput.removeAttribute("invalid")
  monthInput.setAttribute("valid", "")
  validForm()
}

function validYear() {
  yearError.textContent = ""
  yearHeader.style.color = "var(--clr-smokey-grey)"
  yearInput.removeAttribute("invalid")
  yearInput.setAttribute("valid", "")
  validForm()
}

// Day user input
dayInput.addEventListener("keyup", () => {
  if (dayInput.value.match(validDays)) {
    validDay();
    checkDate();
  } else {
    invalidDay();
    checkDate();
  }
})

dayInput.addEventListener("keypress", function(event) {
  if(dayInput.value.length >= 2) {
    event.preventDefault();
  }
})

// Month user input
monthInput.addEventListener("keyup", () => {
  if (monthInput.value.match(validMonths)) {
    validMonth();
    checkDate();
  } else {
    invalidMonth();
    checkDate();
  }
})

monthInput.addEventListener("keypress", function(event) {
  if(monthInput.value.length >= 2) {
    event.preventDefault();
  }
})

// Year user input
yearInput.addEventListener("keyup", () => {
  if (yearInput.value.match(validYears)) {
    validYear();
    checkDate();
  } else {
    invalidYear();
    checkDate();
  }
})

yearInput.addEventListener("keypress", function(event) {
  if(yearInput.value.length >= 4) {
    event.preventDefault();
  }
})

// Get current date
const date = new Date();

// Age calculator
function getUserYears() {
  let currentYear = date.getFullYear();
  let userYears = currentYear - yearInput.value;

  if (date.getMonth() + 1 < monthInput.value ||
      (date.getMonth() + 1 === monthInput.value && date.getDate() < dayInput.value)) {
    userYears--;
  }

  return userYears;
}

function getUserMonths() {
  let currentMonth = date.getMonth() + 1;
  let userMonths = currentMonth - monthInput.value;

  if (date.getDate() < dayInput.value) {
    userMonths--;
  }

  if (userMonths < 0) {
    userMonths = 12 + userMonths;
  }

  return userMonths;
}

function getUserDays() {
  let currentDay = date.getDate();
  let userDays = currentDay - dayInput.value;

  // Ajustar días si el resultado es negativo
  if (userDays < 0) {
    let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    userDays = lastDayOfMonth + userDays;
  }

  return userDays;
}

calcAgeBTN.addEventListener("click", function(event) {
  event.preventDefault();
  if (dateUserInput.hasAttribute("valid")) {
    calcYears.textContent = "";
    calcMonths.textContent = "";
    calcDays.textContent = "";
    calcYears.textContent = getUserYears();
    calcMonths.textContent = getUserMonths();
    calcDays.textContent = getUserDays();
  } else {
    alert("Invalid date!")
  }
})