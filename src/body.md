This paper presents an overview of autonomous agents, outlines an environment for programming autonomous agents, and shows an implementation of an autonomous agent, which will run in AA Factory. AA Factory is an interactive programming environment, which can be tried out at: <http://ec2-54-69-176-176.us-west-2.compute.amazonaws.com/robots/>. 

# Introduction
Automated processes are all around us. In our world, automation plays a key role, from manufacturing to email filters.  At the heart of almost all automation there is an autonomous agent.  An autonomous agent is a computer program or software entity which has the ability to perceive its environment and act independently. More specifically, an autonomous agent can do at least some of the following \autocite{russell2010}:
\begin{singlespacing}
\begin{itemize*}
\item
  perceive their environment
\item
  operate autonomously
\item
  can act perpetually
\item
  pursue goals and
\item
  adapt to the environment
\end{itemize*}
\end{singlespacing}
Autonomous agents can be categorized into groups based on their capabilities. Some of the common classes of autonomous agents are Simple reflex agents, model-based agents, goal-based agents and utility-based agents \autocite{russell2010_types}. Simple reflex agents act based solely on their current environment.  Model-based agents store knowledge of the environment. The model is stored in the agent and the agent chooses actions based on it. Goal-based agents act on information given to them which describes desirable outcomes.  Utility-based agents choose actions which yield the most desirable outcome. Utility based agents quantify the desirability of possible behavior, whereas goal-based agents only perceive whether an action completes a goal or not. Other classifications of autonomous agents exist \autocite{franklin}.

## Autonomous agents in daily life
There are many examples of autonomous agents in our daily lives.  An email filter which identifies unwanted email is an autonomous agent.  It could be a utility-based agent which compares new emails with email marked as undesirable by a user and decides if the email is likely desirable or not. A more traditional example of autonomous agents are robots. The Roomba vacuum \autocite{roomba}, robotic arms, and autonomous helicopters \autocite{bekey2005} all behave as autonomous agents. They each have goals (eg. vacuuming the room, painting a surface, performing search and rescue), they each interact with their environment, and can perform their function for extended periods of time without external intervention. Autonomous agents have also been used in the medical field as patient monitoring and diagnosis tools \autocite{visell}. An autonomous medical diagnosis uses questions, tests and other information to make decisions about patients and chooses treatments or actions that a doctor should do. Other applications of autonomous agents include air traffic control \autocite{jennings1998} and autonomous trading agents \autocite{toulis2006}.


## Structure of an Autonomous Agent
An autonomous agents is essentially made of three parts: sensors, actuators, and state \autocite{russell2010}. Sensors allow an autonomous agent to perceive their environment. Consider the Roomba vacuum. It has sensors that help it detect walls, corners, and obstacles \autocite{roomba}. Actuators are anything by which an autonomous agent interacts with its environment. This includes things which help an autonomous agent change its own state in the environment. The Roomba's actuators might include a vacuum, motors (which give it locomotion) and some lights which signal how much battery it has, whether it is on or not, etc. State can be considered the "knowledge" of an autonomous agent. Some agents don't keep track of their state or the state of the environment. An autonomous agent uses state to make decisions or accomplish goals.

# Implementations
## Overview
As mentioned, all autonomous agents (AA) are implemented using software. Some autonomous agents are solely made of software such as an air traffic control system, whereas other AA like the Roomba have external components to interact with and perceive their environment. There are two main considerations to make before implementing an autonomous agent. One must consider what the environment of the AA is, as well as how can the AA interact with the environment. In this paper we will use an interactive coding tool called AA Factory, created by Sean Usick and I. AA Factory is an educational web browser application which allows users to create and test autonomous agents in a simulated environment. The users are given a goal or task and have to create an autonomous agent which completes the task.  The autonomous agents are created by writing JavaScript code in the app's built in editor. 

### Environment considerations
When implementing an autonomous agent one must consider all the properties of the environment. Environment properties include limitations, boundaries, other entities in the environment, etc. The environment of an autonomous email filter is very different from that of a Roomba vacuum. The environment of the email filter doesn't have gravity, and the email filter may be able to access user settings which are part of the environment. In AA Factory the the environment is a two dimensional grid.  

### Agent considerations
When implementing an autonomous agent one must thoroughly understand how an AA perceives their environment as well as how they can interact with it. In some cases an autonomous agent will be fully aware of its environment (the autonomous email agent) but the majority of the time it will only be able to receive partial information about the environment. The things which an agent can be aware about may be controlled by factors of the environment/situation[^AC1] or may be controlled by the design of the agent. Secondly, one must consider the ways in which the agent can interact with the environment. Often an AA won't be able to perform the exact action which will complete it's goal, therefore it will have to use alternate methods to achieve its goal. 

[^AC1]: E.x. An autonomous search and rescue vehicle can't know the location of injured people without finding them first.

## Seek and Destroy
We will implement a seek and destroy agent[^SD1]. The environment will be a two dimensional grid. In this environment there will be a single autonomous agent which will search for 'duds' and destroy them. A dud is what we will call the simple agents which move around the map slowly and randomly[^SD2].  The AA will have to find and destroy all the duds and then signal that it is complete *in the shortest amount of time possible*. A dud is destroyed when the AA moves into the same tile which contains the dud[^SD3].  

[^SD1]: An equivalent scenario is a search and rescue agent. Rather than destroying duds on contact the agent would rescue the duds. 
[^SD2]: Duds are not autonomous agents. They do not respond to their environment.
[^SD3]: This task, including the following code is available at AA Factory, level 3. Click the arrows at the top of the web page to move between levels.

To implement this autonomous agent we will make a single method. This method will determine how our autonomous agent will move each frame. In AA Factory this method is then interpreted and used to control the AA when the simulation is run. The AA will be developed incrementally, which will illustrate the structure of an AA and the natural progression of intelligence from a simple reflex agent to a goal based agent.

AA Factory gives us the following skeleton to work from.  

\begin{singlespacing}
\begin{listing}
\begin{minted}[linenos,
               frame=leftline]{javascript}
function(x, y, neighbors, validDirections, data, finished) {
  return Directions.CENTER;
}
\end{minted}
\caption{The skeleton.}
\label{skeleton}
\end{listing}
\end{singlespacing}

As mentioned, there is one function, with a several parameters and it returns a direction. All the possible directions are stored in an object called `Directions`. `Directions` is defined in listing \ref{directions}.  
\begin{singlespacing}
\begin{listing}[H]
\begin{minted}[linenos,
               frame=leftline]{javascript}
var Directions = {
  UPLEFT: 0,
  LEFT: 1,
  DOWNLEFT: 2,
  UP: 3,
  // center corresponds to the reference point
  CENTER: 4,
  DOWN: 5,
  UPRIGHT: 6,
  RIGHT: 7,
  DOWNRIGHT: 8,

}
\end{minted}
\caption{The Directions object.}
\label{directions}
\end{listing}
\end{singlespacing}

So, in listing \ref{skeleton} our AA will simply stay where it is. Here are the definitions of the parameters of the function:  

`x`
:   the horizontal location of the AA.  

`y`
:   the vertical location of the AA. Note: a 0 `y` value is in the top of the grid.  

`neighbors`
:   An array of all the adjacent tiles. It can be referenced in the following manner: `neighbors[Directions.UP]`. This will select the neighboring tile which is about the AA.  

`validDirections`
:   An array of the valid directions the AA can move. By using this array to select a direction to move you will avoid moving in an invalid direction.  

`data` 
:   this is an object which an AA can store information in.  

`finished`
:   a method which the AA must call to signal that it is completed. Calling this method before all the duds are destroyed will cause it to lose.

Let's add the first code to create an autonomous agent.

### Simple reflex Agent
The first step to creating our autonomous agent is adding a reflexive behavior: if there is a dud next to the AA, it should move in that direction.  To do this, we will loop through the   `neighbors` array and check if there is a dud in an adjacent tile[^SRA1]. Duds are denoted by the integer `1` in the `neighbors` array.
\begin{singlespacing}
\begin{listing}[H]
  \begin{minted}[gobble=2,linenos, frame=leftline]{javascript}
  function(x, y, neighbors, validDirections, data, finished) {
    var dudDir;
    // loop through neighbors, if there's a dud, break
    for (var dir = 0; dir < neighbors.length; dir ++) {
      if (neighbors[dir] == 1) {
        dudDir = dir;
        break;
      }
    }

    // if there is a dud, move in that direction
    if (dudDir != undefinded) {
      return dudDir;
    } else {
      return Directions.CENTER;
  } 
  \end{minted}
  \caption{An automation with simple reflex behavior.}
  \label{reflex}
\end{listing}
\end{singlespacing}
If `dudDir` is set the AA will move in the direction of the dud, else stay put. Now we have a fully operational simple reflex autonomous agent. Keep in mind though, this agent doesn't complete the task it was given. It doesn't say that it is finished nor does it have a way of reasoning out whether it should be done or not.

[^SRA1]: Neighbors is an array of length 9 where the neighbors are listed from top-left to bottom-right. The `Directions` object's properties contain integers that can be used to reference an array of neighbors. E.x. `neighbors[0]` corresponds to the upper-left neighbor. `Directions.UPLEFT`'s value is `0`.

### Adding goal-oriented behavior: Searching
The next step is to add searching behavior. When there isn't any duds around the AA, it should move in order to find some. This behavior is necessary for programming the AA to signal that it is complete. A simple search behavior could be, "if there isn't a dud around me, move in a random direction."
One of the parameters passed to the AA method is `validDirections`. To move around randomly would be to return a randomly selected element from `validDirections`. We will do this by adding the following code to the AA:

\begin{singlespacing}
\begin{listing}[H]
  \begin{minted}[gobble=2, linenos, frame=leftline]{javascript}
  function(x, y, neighbors, validDirections, data, finished) {
      var dudDir;
      var randomNum = Math.floor(Math.random() * validDirections.length);
      // loop through neighbors, if there's a dud, break
      for (var dir = 0; dir < neighbors.length; dir ++) {
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
  \end{minted}
  \caption{An AA with searching behavior.}
  \label{searching}
\end{listing}
\end{singlespacing}

### Deciding When to Finish: Simple Learning
This is perhaps the most difficult task the AA must complete. There are a variety of ways of approaching the problem but given the ability of our current AA, a statistical approach will be used here. Consider the question, "How would you solve this problem?" An answer might be, "When I haven't seen a dud in a long time, they are probably all gone." Since the AA must complete the task as soon as possible this would be a better answer than something like "find the edges of the map and then search every possible tile." That would take far too long. We can an analytical component to our AA to try and approximate the right decision[^SL1].  A solution to the problem could be stated as follows:

> Given the average time elapsed between each sighting of a dud, if the time since the last seen dud minus the average time it takes to sight a dud is greater than a certain value, it is statistically likely that there are no more duds.  Assuming the duds move in random motion, the "certain value" will be dependent only on the size of the environment.
 
In mathematical notation this could be stated as $ABS(deltaAvg - lastSeen) > x$ where `deltaAvg` is the average time between seeing 2 duds and `lastSeen` is the time since the last dud was seen. `x` is a constant that we will select through experimentation. If the above expression is true then it is likely that there are no more duds left, therefore the AA should signal that it is complete. Note, the smaller the value of `x`, the more likely the AA will signal completion when there are still duds left.

To implement that in our autonomous agent, we will use the `data` parameter. A simple way to keep a running average is to have one property store the sum, and one property store the number of items being averaged. We will initialize these properties like this:

\begin{singlespacing}
\begin{listing}[H]
  \begin{minted}[gobble=2, frame=leftline]{javascript}
  function(x, y, neighbors, validDirections, data, finished) {
      ...
      // maxDifference is a constant
      const maxDifference = 20;
      // the `data` object may not have the properties initialized 
      // (at the initial calling of the function)
      data.deltaSum = data.deltaSum || 0;
      data.deltaCount = data.deltaCount || 0;
      data.lastSeen = data.lastSeen || 0;
      ...


    }
  \end{minted}
  \caption{Properties to initialize. Parts of the function are omitted for brevity.}
  \label{initProps}
\end{listing}
\end{singlespacing}

The AA should call the `finished` method if the following expression evaluates to true:

\begin{minted}[frame=leftline]{javascript}
Math.abs((data.deltaSum/data.deltaCount) - data.lastSeen) > maxDifference;
\end{minted}

Note, the value of the constant `maxDifference` was arbitrarily chosen. We will test this value to find the lowest value which give good results. Putting all this together will yield an AA which completes the given task.

\begin{singlespacing}
\begin{listing}[H]
  \begin{minted}[linenos, frame=leftline]{javascript}
    function(x, y, neighbors, validDirections, data, finished) {
      var dudDir;
      var randomNum = Math.floor(Math.random() * validDirections.length);
      // maxDifference is a constant
      const maxDifference = 14;
      // the `data` object may not have the properties initialized 
      // (at the initial calling of the function)
      data.deltaSum = data.deltaSum || 0;
      data.deltaCount = data.deltaCount || 0;
      data.lastSeen = data.lastSeen || 0;
      // loop through neighbors, if there's a dud, break
      for (var dir = 0; dir < neighbors.length; dir ++) {
        if (neighbors[dir] == 1) {
          dudDir = dir;
          break;
        }
      }

      // if dudDir was set, then there was a dud
      if(dudDir) {
        data.deltaSum += data.lastSeen;
        data.deltaCount += 1;
        data.lastSeen = 0;
      }

      // if the data.lastSeen is greater than the average lastSeen time
      if (Math.abs((data.deltaSum / data.deltaCount) - data.lastSeen) > maxDifference) {
        finished();
      }

      // always increment the lastSeen property
      data.lastSeen++;

      // if there is a dud, move in that direction
      if (dudDir) {
        return dudDir;
      } else {
        // return a random, valid direction
        return validDirections[randomNum];
      }
    }
  \end{minted}
  \caption{The final AA.}
  \label{final}
\end{listing}
\end{singlespacing}

Note, there were several lines of code that we added here. An if statement is added to control the properties in the `data` object. Then there is an if statement which controls whether to call the `finished` method or not. Lastly there is the line to increment `data.lastSeen`. The constant `maxDifference` has been reduced to 14. This value results in a high success rate when tested multiple times.

[^SL1]: Technically, this isn't machine learning. The autonomous agent doesn't change its behavior by evaluating its previous actions \autocite{russell_learning}. If the AA was given the opportunity to run again, and change whether they won or lost based on how they did in the previous game the AA could be considered a learning AA. 

### Next Steps
There are many improvements that could be made to the autonomous agent. The primary area of concern with the current AA program is that it doesn't succeed all the time. To improve this a better searching algorithm could be used, as well as a modified method for determining whether or not it should be completed. Another improvement that could be made is to have our AA build a model of the environment. This would allow it to predict the location of duds and be more accurate about when it is complete. 

# Conclusion
\begin{doublespace}
Autonomous agents are entities which interact with their environment and can be classified based on their abilities and intelligence. Actuators, sensors and state are the components which make up an AA. AA Factory, an interactive programming tool, was used to implement an autonomous agent.  An autonomous agent was created which could be behave perpetually and complete goals. Through AA Factory autonomous agent development can be explored in an intuitive and simple way. Autonomous agents are a science that will change the world, and by learning about them one may appreciate, and even contribute to the future of autonomous agents. 
\end{doublespace}