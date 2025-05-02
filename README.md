# Homework

## First exercise
#### Dependencies + starting the dev server:
- `cd one`
- `npm i`
- `npm run dev`

#### Solution
- In the left column there are the circles. I filter out any circle already placed, and then render each remaining circle as a draggable div.
- In the right column there are the corresponding squares. Each square listens for `onDragOver` and `onDrop`. The circle is conditionally rendered inside the square only if the `placed` flag is set to true.
- For the Drag-and-Drop, I used the following handlers: `handleDragStart`, `handleDragOver` (that calls `e.preventDefault()` in order to turn the square into a valid drop target), and `handleDrop`.

## Second exercise
#### Dependencies + starting the dev server:
- `cd two`
- `npm i`
- `npm run dev`

#### Solution
- The `useEffect` hook fetches and parses the testData.txt (file placed in the `public/` directory). It builds and stores the full set of original options.
- `filteredRows` takes every row stored in `data` and keeps it only if it matches all non-empty filters.
- `dynamicOptions` makes sure that: if it is the first render or that dropdown comes at or before the one last clicked on, the dropdown shows all possible options. If it comes after the last-changed dropdown, it will only show the values still present in `filteredRows`. It uses an order array (A -> B -> C) to decide which selects are staying full and which ones get filtered.
- `handleSelect` applies the user's pick, resets all options if "Toate" is clicked, auto-selects the options if there's only one possible remaining, and remembers which dropdown the user used. It updates the `lastChanged` state so that `dynamicOptions` knows which dropdown to keep unfiltered.

## Third exercise
#### Solution
- In order to avoid sqrt operations, I worked with squared values.
- If the centers of the circles are the same, either we have the same circle (infinite solutions), or there are no solutions.
- Calculates the squared distance between the centers of the circles.
- If `d^2 > (r1 + r2)^2`, the circles are too far apart.
- If `d^2 < (r1 - r2)^2`, the circles are one inside the other, but they are not touching.
- If `d^2 = (r1 + r2)^2` they are externally tangent.
- If `d^2 = (r1 - r2)^2` they are internally tangent.
- If neither of the above checks, the circles overlap and there are 2 solutions.