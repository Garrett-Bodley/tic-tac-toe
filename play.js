import Space from './space.js'

export default function play (){

  // initialize board state and select first space on board
  const boardState = makeState()
  let selected = 0
  boardState[selected].isSelected = true

}

const makeState = () => {
  let output = []
  for(let i = 0; i < 9; i++){
    output.push(new Space())
  }
  return output
}