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
- `filters` state holds the current selected values.
- `explicit` state marks which fields the user chose. It is `true` if the user picked that column manually, `false` if it was autocompleted or is still empty. A column is autocompleted only when its `explicit` flag is `false`.
- The `useEffect` hook fetches and parses the testData.txt (file placed in the `public/` directory). It stores the resulting rows in `data`.
- `filteredRows` keeps each row only if it matches every non-empty value in `filters`.
- `dynamicOptions` shows for each dropdown: all distinct values if that field or any field to its left hasn’t been explicitly chosen, otherwise only the distinct values remaining inside filteredRows. This is achieved by ignoring any implicit filters when the dropdown is to the left of the last explicit choice.  It uses an order array (A -> B -> C) to decide which selects are staying full and which ones get filtered.
- `handleSelect` updates the clicked field in filters and marks it `explicit`. Recomputes the rows still valid. Clears values that became invalid. Autocompletes any still empty field that now has a single valid value.

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