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
        return chalk.inverse(`${this.belongsTo}`)
      }else{
        return this.belongsTo
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