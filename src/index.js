document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("identicon-form")
  form.addEventListener("submit", handleSubmit)
})

function handleSubmit(e) {
  clearSquares()
  e.preventDefault()
  let input = document.querySelector('input').value
  colorSquares(input)
  document.querySelector('#identicon-form').reset()
}

function colorSquares(input) {
  const firstTwoColumns = getFirstTwoColumns()
  const lastTwoColumns = getLastTwoColumns()
  const middleColumn = getMiddleColumn()
  const hashedArr = md5.array(input)
  const color = `rgb(${hashedArr[0]}, ${hashedArr[1]}, ${hashedArr[2]})`
  for (const index in firstTwoColumns) {
    let number = hashedArr[index]
    if (number % 2 === 0) {
      firstTwoColumns[index].style.backgroundColor = color
    }
  }
  for (const index in lastTwoColumns) {
    let square = lastTwoColumns[index]
    let row = lastTwoColumns[index].id.slice(0, 1)
    let column = lastTwoColumns[index].id.slice(-1)
    if (column == 4) {
      let matchingSquare = document.getElementById(`${row}-0`)
      square.style.backgroundColor = matchingSquare.style.backgroundColor
    } else {
      let matchingSquare = document.getElementById(`${row}-1`)
      square.style.backgroundColor = matchingSquare.style.backgroundColor
    }
  }
  for (const index in middleColumn) {
    let newIndex = 1 + index
    let middleNumber = hashedArr[newIndex]
    if (middleNumber % 2 === 0) {
      middleColumn[index].style.backgroundColor = color
    }
  }
}

function clearSquares() {
  const allColumns = getAllColumns()
  for (const index in allColumns) {
    allColumns[index].style.removeProperty("background-color")
  }
}

function getFirstTwoColumns () {
  let firstTwo = []
  let array = [0, 1, 2, 3, 4]
  for (const num in array) {
    firstTwo.push(document.getElementById(`${num}-0`))
    firstTwo.push(document.getElementById(`${num}-1`))
  }
  return firstTwo
}

function getLastTwoColumns () {
  let lastTwo = []
  let array = [0, 1, 2, 3, 4]
  for (const num in array) {
    lastTwo.push(document.getElementById(`${num}-3`))
    lastTwo.push(document.getElementById(`${num}-4`))
  }
  return lastTwo
}

function getMiddleColumn () {
  let middle = []
  let array = [0, 1, 2, 3, 4]
  for (const num in array) {
    middle.push(document.getElementById(`${num}-2`))
  }
  return middle
}

function getAllColumns () {
  let all = []
  let array = [0, 1, 2, 3, 4]
  for (const num in array) {
    all.push(document.getElementById(`${num}-0`))
    all.push(document.getElementById(`${num}-1`))
    all.push(document.getElementById(`${num}-2`))
    all.push(document.getElementById(`${num}-3`))
    all.push(document.getElementById(`${num}-4`))
  }
  return all
}
