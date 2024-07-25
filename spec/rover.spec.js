const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test('constructor sets position and default values for mode and generatorWatts', function(){
    let output = new Rover(98382)
    expect(output.position).toBe(98382)
    expect(output.mode).toBe('NORMAL')
    expect(output.generatorWatts).toBe(110)
  });
  test('response returned by receiveMessage contains the name of the message', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW-POWER'), new Command('STATUS_CHECK')];
    let messageOutput = new Message('nameTest', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(messageOutput);
    expect(response.message).toEqual("nameTest")
    
  })

 test('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let messageOutput = new Message('nameTest', commands);
    let rover = new Rover(98382);
    let results = rover.receiveMessage(messageOutput).results
    expect(results.length).toEqual(commands.length)
  })

  test('responds correctly to th status check command', function(){
    let commands = [new Command('STATUS_CHECK')];
    let messageOutput = new Message('statusCheck', commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(messageOutput)
    let statusCheck = {mode: (rover.mode), generatorWatts: (rover.generatorWatts), position: (rover.position)}
    expect(response.results[0].roverStatus).toEqual(statusCheck)
  })

  test('responds correctly to the mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let messageOutput = new Message('modeChange', commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(messageOutput);
    let completed = {completed: true}
    expect(rover.mode).toBe('LOW_POWER')
    expect(response.results[0]).toEqual(completed)
  })

  test('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
 let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 200)];
 let messageOutput = new Message('lowPowerMove', commands);
 let rover = new Rover(100)
 let completed = {completed: false}
 let response = rover.receiveMessage(messageOutput);
 expect(rover.mode).toBe('LOW_POWER');
 expect(response.results[1]).toEqual(completed)

  })

  test('responds with the position for the move command', function(){
    let commands = [new Command('MOVE', 200)]
    let messageOutput = new Message('move', commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(messageOutput);
    expect(rover.position).toEqual(200)
  })
});
