# Click the canvas app

Give it a look in https://johncol.github.io/app-click-the-canvas/index.html.

## Shapes

The goal of this task is to write a simple html/JavaScript program that interacts with the user and draws some geometrical shapes. The program is launched by viewing “index.html” in a
recent standards-compliant web browser.

## Basic flow
The user selects three arbitrary points within the client area of the browser. As they are selected, the program highlights their location by drawing red circles, 11 pixels in diameter,
cantered on each selected point.

Based on these three points, two additional shapes are drawn:
  - a blue parallelogram, having three of its corners in the points selected by the user.
  - a yellow circle, with the same area and centre of mass as the parallelogram.

These shapes should not be filled. The coordinates of the selected points as well as the area of the parallelogram and circle should be presented to the user.
The user is free to move around the points. This makes the parallelogram, circle and printed information update accordingly.

There is also a "reset" feature that clears the board and lets the user select three new points, repeating the process described above. Finally, there is an “about” feature that presents information about the program, its author and how it should be used, in your own words.
