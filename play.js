import Space from './space.js'
import chalk from 'chalk'

export default function play (){

  // initialize board state and select first space on board
  const boardState = makeState()
  let selected = 0
  let currentPlayer = 'X'
  let moveCount = 0
  boardState[selected].isSelected = true

  // if input matches direction keys, select new space on board. Press Enter for to make move
  process.stdin.on('keypress', (str, key) => {
    const moveList = ['up', 'down', 'left', 'right']
    if(moveList.includes(key.name)) parseDirection(key.name)
    if(key.name == 'return') makeMove(selected)
  });

  const parseDirection = (name) => {
    switch(name){
      case 'up':
        if(selected > 2) updateSelection(selected - 3)
        break
      case 'down':
        if(selected < 6) updateSelection(selected + 3)
        break
      case 'left':
        if([1, 2, 4, 5, 7, 8].includes(selected)) updateSelection(selected - 1)
        break
      case 'right':
        if([0, 1, 3, 4, 6, 7].includes(selected)) updateSelection(selected + 1)
        break
    }
    clearBoard()
    printBoard(boardState)
  }

  const updateSelection = (num) => {
    boardState[selected].isSelected = false
    selected = num
    boardState[selected].isSelected = true
  }

  const makeMove = (selected) => {
    if(!boardState[selected].taken){
      selectSpace(selected)
      moveCount += 1
      currentPlayer = moveCount % 2 == 0 ? 'X' : 'O'
      clearBoard()
      printBoard(boardState)
    }
  }

  const selectSpace = (selected) => {
    boardState[selected].taken = true
    boardState[selected].belongsTo = currentPlayer
  }
  
  const printBoard = (boardState) => {
      const board = `
    ${chalk.bold(`Player ${(moveCount % 2) + 1}'s Turn (${currentPlayer})`)}
    
    ${boardState[0].toString()}|${boardState[1].toString()}|${boardState[2].toString()}
    -----
    ${boardState[3].toString()}|${boardState[4].toString()}|${boardState[5].toString()}
    -----
    ${boardState[6].toString()}|${boardState[7].toString()}|${boardState[8].toString()}
  `
    console.log(board)
  }
  
  const clearBoard = () => {
    process.stdout.moveCursor(-50,-9)
    process.stdout.clearLine(1)
  }

  printBoard(boardState)
}

const makeState = () => {
  let output = []
  for(let i = 0; i < 9; i++){
    output.push(new Space())
  }
  return output
}
