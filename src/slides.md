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

The AA kills duds by moving into the tile that the dud is on.
When the autonomous agent is finished, it will call the `finished` method.

#### Notes
[Show level 3 in AA Factory] The `x` and `y` parameters are for location of the AA. `neighbors` is the array of adjacent tiles. `ValidDirections` is an array of all the valid directions the AA can move. The AA can't move out of bounds, if it does, the AA fails. `data` is an object we use to store data from frame to frame. `finished` is a method the AA will call when the AA thinks it is done.


### Starting out
`Directions` is an object with the possible directions to move.
`Directions.CENTER` means the AA will stay where it is.
The method implemented in AA Factory must return a value from the `Directions` object.
