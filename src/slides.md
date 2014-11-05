# Programming Autonomous Agents
Christopher Usick
November 2014

## Notes
- giving a presentation on how to program autonomous agents

## Overview
We'll cover:
 - What is an Autonomous Agents
 - Applications
 - Implementing!
### Notes
I'll give an introduction to autonomous agents and show some of their application. Then, we will actually make one!

## Introduction
### What Are Autonomous Agents
An autonomous agent is a computer program or *software entity* which has the ability to *perceive its environment and act independently*.

#### Notes
Autonomous agents might have physical components but at the core, they are driven by software.
Agent comes from the 'Software entity' part of the definition, and autonomous comes from the 'perceive its environment and act independently'.

### Abilities
- perceive the environment
- operate autonomously
- can act perpetually
- pursue goals and
- adapt to the environment

#### Notes
All autonomous agents can do at least the first 4. Some AA don't adapt to their environment but do everything else.

### Categories
category            | decision making method
Simple Reflex agent | reacts to its immediate environment
model-based agent   | builds an internal model of its environment, using it to make decisions
goal-based agent    | Is given goals and has the ability to chose actions which achieve those goals
utility-based agent | Has the ability to reason about what action would yield the highest outcome
learning agent      | Can learn from their actions and their environment
[include graphic showing intelligence of AA]
 
#### Notes
AA can be categorized into these categories. [outline each]. The difference between goal-based and utility-based agents is that utility-based agents can calculate the profit from their action on a continuous scale. Goal-based agents simply know if an action completes a goal or not. It is quite difficult to build a utility-based AA.

### Autonomous agents applications
+ Robotic
    - Roomba: automated vacuum
    - autonomous helicopters: could be used for surveillance, search and rescue.
+ Software
    - email filter: perpetually filters incoming emails, filtering out unwanted ones.
    - air traffic controlling system: an automated system could be controlled by an autonomous agent.
    - medical applications: many uses, E.x. patient monitoring, automated diagnosis

#### Notes
[before slide] Does anyone have an example of autonomous agents?
All the examples here meet the definition given earlier. Example: the environment of an autonomous email filter is the email client. It interacts with the environment by checking incoming mail and categorizing it and it does this perpetually. 

## Implementation
## Notes
This is the fun part. We will implement a slightly sophisticated AA. Open up AA Factory now.

### AA Factory
- Educational programming app
- lets users build autonomous agents and test them in an interactive environment
- AA Factory has a series of levels for users to complete

#### Notes
AA Factory lets you interactively learn about AA. It's a work in progress, developed by my brother and I. 

#### How it works
- a user writes a javascript method.
- AA Factory interprets that method and uses it to control the autonomous agent each frame

### Seek and Destroy
Task: Find and destroy the *duds* and signal completion.
Complete task in the shortest amount of time possible.

#### Notes
We will implement an AA to complete this task. 'Duds' are simple agents which move slowly and randomly around the screen. They are the green tiles. Try out level 3 in AA Factory.
A dud is destroyed if the AA moves onto it.  An analagous task would be search and rescue. At the same time we're making Terminators and search and rescue drone!

### Interaction
The AA can perceive the following:
- the neighboring tiles: an array of length 9, containing `0` if there is nothing in a tile, `1` if there is a dud in the tile, and `null` if the tile is an invalid move.
- it's own location in the map

Duds die when on the same tile as the autonomous agent
Autonomous agent must signal that it is complete

#### Notes
[Show level 3 in AA Factory] The `x` and `y` parameters are for location of the AA. `neighbors` is the array of adjacent tiles. `ValidDirections` is an array of all the valid directions the AA can move. The AA can't move out of bounds, if it does, the AA fails. `data` is an object we use to store data from frame to frame. `finished` is a method the AA will call when the AA thinks it is done. The AA kills duds by moving into the tile that the dud is on. When the autonomous agent is finished, it will call the `finished` method. 


### Starting out
`Directions` is an object with the possible directions to move.
`Directions.CENTER` means the AA will stay where it is.
The method implemented in AA Factory must return a value from the `Directions` object.

#### Notes
As you can see, the only way for our AA to interact with the environment is by moving around.

### Simple reflex agent
If there is a dud near by, kill it
    - loop through neighbors array
    - if an element in the array equals 1, it is a dud.

#### Notes
```
function(x, y, neighbors, validDirections, data, finished) {
  var dudDir;
  // loop through neighbors, if there's a dud, break
  for (var dir = 0; dir < neighbors.length; dir++) {
    if (neighbors[dir] == 1) {
      dudDir = dir;
      break;
    }
  }

  // if there is a dud, move in that direction
  if (dudDir) {
    return dudDir;
  } else {
    return Directions.CENTER;
  }
}
```

### Simple reflex Agent
You can use `Directions.*` to get the corresponding value from the neighbors array.
Example:
    - `neighbors[Directions.UPLEFT]` will be the upper-left neighbor.
    - `neighbors[Directions.CENTER` will be the autonomous agent itself

#### Notes
Each value in `Directions` is just an `int`, therefore we can use it to index the neighbors array. The values in the `Directions` object correspond with the correct values of the `neighbors` array

### Searching behavior
When there isn't a dud move in a random direction
Not the most intelligent search behavior

#### Notes
[read before bringing up points] This is good, but we need to add some more intelligent autonomous behavior.  Instead of staying still when there is no duds around the AA should search for a dud. A simple was of searching is to say 'move around randomly'. This isn't the best solution.
```
function(x, y, neighbors, validDirections, data, finished) {
  var dudDir;
  var randomNum = Math.floor(Math.random() * validDirections.length);
  // loop through neighbors, if there's a dud, break
  for (var dir = 0; dir < neighbors.length; dir++) {
    if (neighbors[dir] == 1) {
      dudDir = dir;
      break;
    }
  }

  // if there is a dud, move in that direction
  if (dudDir) {
    return dudDir;
  } else {
    // return a random, valid direction
    return validDirections[randomNum];
  }
}
```
[Run the AA] That is a little better. Notice it helps most of the time, but sometimes the AA will move in circles where there isn't a dud.

### Signaling Completion: How?
How does the autonomous agent know when it is done?
Answer: Guess!!
If the autonomous agent hasn't seen a dud in a time that's greater the average time it takes to see a dud plus some more, there probably isn't anymore duds.
#### Notes
This is a difficult task. The autonomous agent only knows about the tiles that immediately surround it, therefore, how can it know whether or not there are any more duds? Our AA can't know for sure so it will have to guess when it is done. Here is a simple method of guessing.  The 'plus some more' part is necessary, because we are dealing with randomness. 

### Signaling Completion: Implementation
Keep a running Average
make a variable `maxDifference` 
Increment the running average variables
Add the condition

#### Notes
There are the things we need to do.  [Follow steps one at a time]. 
```
  // maxDifference is a constant
  const maxDifference = 3;
  // the `data` object may not have the properties initialized (at the initial calling of the function)
  data.deltaSum = data.deltaSum || 0;
  data.deltaCount = data.deltaCount || 0;
  data.lastSeen = data.lastSeen || 0;
```
We can use the `data` parameter to store information what we want to use from frame to frame.  The average is the sum of the time differences divided by the number of times a dud has been seen. By keeping the sum and the count separate we can compute the average time each frame. Note, we have the max value constant. We just chose a random value for that. We will experiment to if it is good.
If a dud is seen we need to increment the running average variables. Each frame we increment the lastSeen variable
```
  // if dudDir was set, then there was a dud
  if (dudDir) {
    data.deltaSum += data.lastSeen;
    data.deltaCount += 1;
    data.lastSeen = 0;
  }
  // always increment the lastSeen property
  data.lastSeen++;
```
Now we can add in the condition which determines whether to be finished or not.
```
  // if the data.lastSeen is greater than the average lastSeen time
  if (Math.abs((data.deltaSum / data.deltaCount) - data.lastSeen) > maxDifference) {
    finished();
  }
```
If the absolute value of the difference of the average and the lastSeen is greater than `maxDifference` then the autonomous agent should be done.
[Experiment with `maxDifference` to get a successful value (10-12)]

### Next Steps
Use more complex math
Do better searching
    - make the autonomous agent build a representation of the environment
    - have the autonomous agent guess where duds should be using statistics.

#### Notes
[notes first, then slides] There is definitely some improvement we could add the this AA. Rather than comparing the time difference of the average time the the lastSeen time to a arbitrarily chosen value we could compare it to the standard deviation. Also, we could use better searching techniques. 

### Conclusion
Autonomous agents are software entities which interact and perceive their environment
They can be categorized into classes, based on design and intelligence
With AA Factory it is easy and intuitive to build and test autonomous agents interactively

#### notes
We covered what AA are and how they can be classified. Then we jumped right into implementing one.  We made a seek and destroy agent which had the ability to find and destroy duds. The autonomous agent also had the ability to decide when it was complete based on its pasted experiences. 