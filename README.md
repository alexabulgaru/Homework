# Homework

## First exercise
#### Dependencies + starting the dev server:
- `cd one`
- `npm i`
- `npm run dev`

#### Solution
- On the left column there are the circles. I filter out any circle already placed, and then render each remaining circle as a draggable div.
- On the right column there are the coresponding squares. Each squares listens for `onDragOver` and `onDrop`. The circle is conditionally render inside the square only if the `placed` flag is set to true.
- For the Drag-and-Drop, I used the following handlers: `handleDragStart`, `handleDragOver` (that calls `e.preventDefault()` in order to turn the square into a valid drop targer), and `handleDrop`.

## Second exercise