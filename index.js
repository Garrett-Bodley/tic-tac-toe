import chalk from 'chalk'
import figlet from 'figlet'
import * as readline from 'node:readline';
import play from './play.js'

// Listen for user keyboard input
if(process.stdin.isTTY) process.stdin.setRawMode(true)
readline.emitKeypressEvents(process.stdin)
// Quit program when user input is 'Ctrl + c'
process.stdin.on('keypress', (str, key) => {
  if(key.sequence == '\x03') process.exit()
});

const home = () => {
  clearConsole()
  console.log(figlet.textSync('Tic Tac Toe', {font: 'ANSI Shadow'}))
  console.log(`
    ========================================================================================================
    
    ${chalk.bold.underline.yellow(`How to Play:`)}
    ${chalk.bold.yellow(`1. The game is played on a grid that's 3 squares by 3 squares.`)}
    ${chalk.bold.yellow(`2. The first player is known as X and the second is O. Players take turns putting their marks in empty squares.`)}
    ${chalk.bold.yellow(`3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.`)}
    ${chalk.bold.yellow(`4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.`)}
    

    ${chalk.bold.underline.bgYellowBright(`Press SPACE to START`)}
    ========================================================================================================`
  )
  process.stdin.on('keypress', (str, key) => {
    if(key.sequence == ' ') play()
  })
}

const clearConsole = () => {
  console.clear()
  for(let i = 0; i < 100; i++) console.log()
}

home()