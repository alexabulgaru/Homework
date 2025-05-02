# Homework

## First exercise
#### Dependencies + starting the dev server:
- `cd one`
- `npm i`
- `npm run dev`

#### Solution
- On the left column there are the circles. I filter out any circle already placed, and then render each remaining circle as a draggable div.
- On the right column there are the coresponding squares. Each squares listens for `onDragOver` and `onDrop`. The circle is conditionally rendered inside the square only if the `placed` flag is set to true.
- For the Drag-and-Drop, I used the following handlers: `handleDragStart`, `handleDragOver` (that calls `e.preventDefault()` in order to turn the square into a valid drop targer), and `handleDrop`.

## Second exercise
#### Dependencies + starting the dev server:
- `cd one`
- `npm i`
- `npm run dev`

#### Solution
- The `useEffect` hook fetches and parses the testData.txt (file placed in the `public/` directory). It builds and stores the full set of original options.
- `filteredRows` takes every row stored in `data` and keeps it only if it matches all non-empty filters.
- `dynamicOptions` makes sure that: if it is the first render or that dropdown comes at or before the one last clicked on, the dropdown shows all possible options. If it comes after the last-changed dropdown, it will only show the values still present in `filteredRows`. It uses an order array (A -> B -> C) to decide which selects are staying full and which ones get filtered.
- `handleSelect` applies the user's pick, resets all the option if "Toate" is clicked, auto-selects the options if there's only one possible remaining, and remembers which dropdown the user used. It updates the `lastChanged` state so that `dynamicOptions` knows which dropdown to keep unfiltered.