import { Brick } from './sprites/Brick';
import {
  BRICK_IMAGES,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_ENERGY,
  BRICK_PADDING
} from './setup';

export function createBricks(): Brick[] {
  /* So the reason the author insists on not using "map" or "foreach or something is that we do not want to return the same amount of objects as we would have to with map... And we want to filter out the zeroes ... but em... We could have just filtered out the zeroes and used map? I don't get this. Why not do LEVEL.filter((a)=> a!=0).map((elem)=>new Brick(elem))... Weird.
   */
  return LEVEL.reduce((prev_element,current_element,i) => {
    const row = Math.floor((i+1) / STAGE_COLS); // current row that this brick is going to be on
    // Because the LEVEL variable is just a list of numbers
    // Determining which row we are on is a matter of dividing the index of where we are (like 31st number iterated)
    // Byt the number of columns. So if we have 2 columns it will be on the floor(31/2) => 15.??? => 15th row, if we have 3 columns it will be on the 31 / 3 = 10.3 => 10th row
    // And the column number is simply the remainder after divi!ding the index by number of columns
    // So 31st number / 3 columns = 10 and remainder is 1-> first column
    
    // 1  2   3   4 
    // 5  6   7   8
    // 9  10  11  12

    // So take the 7th number. Divide by number of columns 4 -> 1.7 or something. Which row is it on? Em. 1st? No, second...
    // Math.floor((i) / 4) = 
    // Well you need to add 1 to the column? Why floor and not ceil? => I guess because we want to return zero-indexed information. So it works well if you want to do for rows[0]

    const col = i % STAGE_COLS // correct column for this brick
    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (current_element === 0 ) return prev_element // this is the whole reson for reduce? Sheesh

      return [
        ...prev_element, // OK so... Yes we want to accumulate so we do need to return a copy of the old element
        new Brick(
          BRICK_WIDTH,
          BRICK_HEIGHT,
          { x,y },
          BRICK_ENERGY[current_element],
          BRICK_IMAGES[current_element]
        )
      ];

  }, [] as Brick[]); /* the reduce method takes two arguments
                        A1: 
                        the first argument is a function that is called with 4 paramterers
                        1. previous value
                        2. the current value being iterated over 
                        3. the index of the element being iterated over
                        4. the object being traversed
                        A2:
                        an initial value to supply, in this case an empty array
                        The as keyword is a Type Assertion in TypeScript which tells the compiler 
                        to consider the object as another type than the type the compiler infers the object to be.*/
}
