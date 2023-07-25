import Space from './space.js'
import chalk from 'chalk'
import figlet from 'figlet'

export default function play (){

  // Initialize board state and select first space on board
  const boardState = makeState()
  let selected = 0
  boardState[selected].isSelected = true
  let currentPlayer = 'X'
  let moveCount = 0

  // If input matches direction keys, select new space on board. Press Space to make move
  process.stdin.on('keypress', (str, key) => {
    const moveList = ['up', 'down', 'left', 'right']
    if(moveList.includes(key.name)) parseDirection(key.name)
    if(key.name == 'space') makeMove(selected)
  });

  const parseDirection = (name) => {
    // Board is represented as a simple array
    // This logic parses user input and then selects a different space if it is within bounds
    // ex:
    // [0, 1, 2,
    //  3, 4, 5,
    //  6, 7, 8]

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

  // Process player move and check if there is a winner or draw
  const makeMove = (selected) => {
    if(!boardState[selected].taken){
      claimSpace(selected)
      checkForWinner(boardState)
    }
  }

  // Update boardState when player claims the selected space. Update current player and reprint board.
  const claimSpace = (selected) => {
    boardState[selected].taken = true
    boardState[selected].belongsTo = currentPlayer
    moveCount += 1
    currentPlayer = moveCount % 2 == 0 ? 'X' : 'O'
    clearBoard()
    printBoard(boardState)
  }
  
  const printBoard = (boardState) => {
      const board = `
    ${parsePlayerStatement()}
    
           |       |       
       ${boardState[0].toString()}   |   ${boardState[1].toString()}   |   ${boardState[2].toString()}   
           |       |       
    -------+-------+-------
           |       |       
       ${boardState[3].toString()}   |   ${boardState[4].toString()}   |   ${boardState[5].toString()}   
           |       |       
    -------+-------+-------
           |       |       
       ${boardState[6].toString()}   |   ${boardState[7].toString()}   |   ${boardState[8].toString()}   
           |       |       
  `
    console.log(board)
  }

  // Outputs string that displays whose turn it is
  const parsePlayerStatement = () => {
    if(currentPlayer == 'X') return chalk.bold.bgRed(`Player 1's Turn (X). Navigate using the arrow keys. Press SPACE to confirm selection.`)
    return chalk.bold.bgBlue(`Player 2's Turn (O). Navigate using the arrow keys. Press SPACE to confirm selection.`)
  }
  
  const clearBoard = () => {
    process.stdout.moveCursor(-50,-15)
    process.stdout.clearLine(1)
  }

  // Checks for win or draw. If win/draw print message and quit program.
  const checkForWinner = (boardState) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ]

    for(const combo of winningCombos){
      let [a, b, c] = combo
      if(boardState[a].belongsTo !== null && boardState[a].belongsTo == boardState[b].belongsTo && boardState[a].belongsTo == boardState[c].belongsTo){
        console.log(figlet.textSync(`Player ${boardState[a].belongsTo == 'X' ? 1: 2} Wins!`, {font: 'ANSI Shadow'}))
        process.exit()
      }
    }

    if(moveCount >= 9){
      console.log(figlet.textSync('Draw Game', {font: 'ANSI Shadow'}))
      process.exit()
    }
  }

  printBoard(boardState)
}

// boardState factory
const makeState = () => {
  let output = []
  for(let i = 0; i < 9; i++){
    output.push(new Space())
  }
  return output
}