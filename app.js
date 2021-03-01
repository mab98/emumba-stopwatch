let milliseconds = 0
let seconds = 0
let minutes = 0

let displayMilliseconds = 0
let displaySeconds = 0
let displayMinutes = 0

let splitMilliseconds = 0
let splitSeconds = 0
let splitMinutes = 0

let splitDisplayMilliseconds = 0
let splitDisplaySeconds = 0
let splitDisplayMinutes = 0

let display = document.getElementById('time-displayer')
let splitTimeDiv = document.getElementById('split-time-displayer')
let startBtn = document.getElementById('startPause')
let splitBtn = document.getElementById('split-button')
let resetBtn = document.getElementById('reset')
let table = document.getElementById('lap-table')
let lapDiv = document.getElementById('lap-div')
let hr = document.getElementById('hr')

splitBtn.disabled = true
resetBtn.disabled = true

let time = ''
let splitTime = ''

let interval = null

let status = 'paused'

function watchCounter () {
  milliseconds++
  if (milliseconds === 10) {
    milliseconds = 0
    seconds++
    if (seconds === 60) {
      seconds = 0
      minutes++
      if (minutes === 60) {
        minutes = 0
      }
    }
  }

  displayMilliseconds = milliseconds

  if (seconds < 10) {
    displaySeconds = '0' + seconds.toString()
  } else {
    displaySeconds = seconds
  }
  if (minutes < 10) {
    displayMinutes = '0' + minutes.toString()
  } else {
    displayMinutes = minutes
  }

  time = `${displayMinutes}:${displaySeconds}.${displayMilliseconds}`
  display.innerHTML = time

  splitMilliseconds++
  if (splitMilliseconds === 10) {
    splitMilliseconds = 0
    splitSeconds++
    if (splitSeconds === 60) {
      splitSeconds = 0
      splitMinutes++
      if (splitMinutes === 60) {
        splitMinutes = 0
      }
    }
  }
  splitDisplayMilliseconds = splitMilliseconds

  if (splitSeconds < 10) {
    splitDisplaySeconds = '0' + splitSeconds.toString()
  } else {
    splitDisplaySeconds = splitSeconds
  }
  if (splitMinutes < 10) {
    splitDisplayMinutes = '0' + splitMinutes.toString()
  } else {
    splitDisplayMinutes = splitMinutes
  }

  splitTime = `${splitDisplayMinutes}:${splitDisplaySeconds}.${splitDisplayMilliseconds}`
  splitTimeDiv.innerHTML = splitTime
}

function startPause () {
  if (status === 'paused') {
    interval = window.setInterval(watchCounter, 100)
    startBtn.innerHTML = 'Pause'
    startBtn.setAttribute('class', 'pause-button')
    splitBtn.disabled = false
    splitBtn.setAttribute('class', 'split-button-enabled')
    resetBtn.disabled = true
    resetBtn.setAttribute('class', 'reset-button-disabled')

    status = 'started'
  } else {
    window.clearInterval(interval)
    startBtn.innerHTML = 'Start'
    startBtn.setAttribute('class', 'start-button')
    splitBtn.disabled = true
    splitBtn.setAttribute('class', 'split-button-disabled')
    resetBtn.disabled = false
    resetBtn.setAttribute('class', 'reset-button-enabled')
    pauseSplitDetails(splitTime, 'Pause')
    zeroSplitTime()
    status = 'paused'
  }
}

function resetWatch () {
  hr.setAttribute('class', 'disappear-hr')
  window.clearInterval(interval)
  minutes = 0
  seconds = 0
  milliseconds = 0
  display.innerHTML = '00:00.0'
  startBtn.innerHTML = 'Start'
  resetBtn.setAttribute('class', 'reset-button-disabled')
  splitTimeDiv.innerHTML = 'SPLIT TIME'
  table.innerHTML = ''
  lapNumber = 0
}

function split () {
  pauseSplitDetails(splitTime, 'Split')
  zeroSplitTime()
}

let lapNumber = 0
function pauseSplitDetails (time, type) {
  hr.setAttribute('class', 'show-hr')
  lapNumber++
  let tr = document.createElement('tr')
  let td1 = document.createElement('td')
  let td2 = document.createElement('td')
  td2.setAttribute('class', type.toLowerCase() + '-lap-td')
  let td3 = document.createElement('td')
  td1.innerText = `#${lapNumber}`
  td2.innerText = time
  td3.innerText = type
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  table.appendChild(tr)
}

function zeroSplitTime () {
  splitMilliseconds = 0
  splitSeconds = 0
  splitMinutes = 0
}
