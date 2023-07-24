import chalk from 'chalk'

export default class Space{
  constructor(){
    this.isSelected = false
    this.taken = false
    this.belongsTo = null
  }

  // parses status of space and outputs string representation for user to view 
  toString(){
    if(this.taken){
      if(this.isSelected){
        // X is red, O is blue, selected spaces are inverted
        return this.belongsTo == 'X' ? chalk.bold.red.inverse(`${this.belongsTo}`) : chalk.bold.blue.inverse(`${this.belongsTo}`)
      }else{
        return this.belongsTo == 'X' ? chalk.bold.red(`${this.belongsTo}`) : chalk.bold.blue(`${this.belongsTo}`)
      }
    }else{
      // highlight space if selected
      if(this.isSelected){
        return chalk.inverse(` `)
      }else{
        return ` `
      }
    }
  }
}