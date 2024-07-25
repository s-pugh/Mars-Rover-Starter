class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      
   }
   receiveMessage(messageOutput){
     let message = messageOutput.name
      let results = []

       for(let i = 0; i < messageOutput.commands.length; i++){

         if (messageOutput.commands[i].commandType === 'STATUS_CHECK'){
            results.push({roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
         }

         if (messageOutput.commands[i].commandType === 'MODE_CHANGE'){
            this.mode = messageOutput.commands[i].value
            results.push({completed: true})
         }
         
        if (messageOutput.commands[i].commandType ==='MOVE'){
         if (this.mode === 'LOW_POWER'){
            results.push({completed: false})
         } else if (this.mode === 'NORMAL'){
            this.position = messageOutput.commands[i].value
            results.push({completed: true})
         } else {
            throw Error('Invalid mode type')
         }
         
         }
      }
     return {message, results}
   
   }
}


module.exports = Rover;