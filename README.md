### How to run

The quickest way to run is opening the app.js file with Node including the following:

- two digits describing the initial position of the object on the board, e.g. 0,0
- two digits defining the size of the board, e.g. 5,5
  The four digits should be separated with commas and entered as one argument, e.g.:
  `node ./src/app.js 2,3,5,5`
  will tell the program that the initial position is x=2,y=2 and the board is of size 5x5

### How to use

Once the initial position and the board size are set, you can enter the commands that will move the object.

The object always has a direction (north, east, south or west). A simulation always starts with direction north. North means that if the object sits on [2, 4] and moves forward one step, the object will now stand on [2, 3].

**Available commands are:**

- 0 = quit simulation and print results to ​stdout
- 1 = move forward one step
- 2 = move backwards one step
- 3 = rotate clockwise 90 degrees (eg north to east)
- 4 = rotate counterclockwise 90 degrees (eg west to south)

The program will return the final position of the object unless the object was moved outside of the set boundaries, in which case [-1,-1] will be returned.

### Testing

To test the application:

1. Run `npm i` to install dependencies
2. Run `npm test` to run unit tests
