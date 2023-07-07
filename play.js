import Space from './space.js'

export default function play (){

  // initialize board state and select first space on board
  const boardState = makeState()
  let selected = 0
  boardState[selected].isSelected = true
  printBoard(boardState)

}

const makeState = () => {
  let output = []
  for(let i = 0; i < 9; i++){
    output.push(new Space())
  }
  return output
}

const printBoard = (boardState) => {
  const board = `
${boardState[0].toString()}|${boardState[1].toString()}|${boardState[2].toString()}
-----
${boardState[3].toString()}|${boardState[4].toString()}|${boardState[5].toString()}
-----
${boardState[6].toString()}|${boardState[7].toString()}|${boardState[8].toString()}
`
  console.log(board)
}