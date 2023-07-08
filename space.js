import chalk from 'chalk'

export default class Space{
  constructor(){
    this.isSelected = false
    this.taken = false
    this.belongsTo = null
  }

  toString(){
    if(this.taken){
      if(this.isSelected){
        return this.belongsTo == 'X' ? chalk.bold.inverse(`${this.belongsTo}`) : chalk.bold.inverse(`${this.belongsTo}`)
      }else{
        return this.belongsTo == 'X' ? chalk.bold.red(`${this.belongsTo}`) : chalk.bold.blue(`${this.belongsTo}`)
      }
    }else{
      if(this.isSelected){
        return chalk.inverse(` `)
      }else{
        return ` `
      }
    }
  }
}