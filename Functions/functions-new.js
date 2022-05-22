// var canvas = document.getElementById("my-canvas");
// var context = canvas.getContext("2d");
// var cw = (canvas.width = 800);
// var ch = (canvas.height = 800);

// // tree definitions
// var x1 = 200;
// var y1 = 500;
// var x2 = 200;
// var y2 = 400;

// // growing definitions
// var angle = 0.1 * Math.PI;
// var depth = 10;

// // save segments for later animation
// var branches = [];
// for (var i = 0; i <= depth; i++) {
//     branches.push([]);
// }
// var segments = [];
// var segmentIndex = 0;

// // animation variables
// var nextTime = 0;
// var delay = 16 * 5;

// ///////////// Do stuff!

// // define the tree
// defineTree(x1, y1, x2, y2, angle, depth);

// // create a combined array of segments to be drawn with animation
// for (var i = branches.length - 1; i >= 0; i--) {
//     segments = segments.concat(branches[i]);
// }

// // load leaf images and then start animating
// var leaves = new Image();
// leaves.onload = function () {
//     // animate drawing the tree
//     requestAnimationFrame(animate);
// };
// leaves.src =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kYZ-tkZrFLjQucw8tlkPst_UZF17I5_o0g&usqp=CAU";

// ///////////// functions

// // function to reiteratively define all segments of a tree
// function defineTree(x1, y1, x2, y2, angle, depth) {
//     var segment = {
//         x1: x1,
//         y1: y1,
//         x2: x2,
//         y2: y2,
//         linewidth: depth,
//     };
//     branches[depth].push(segment);

//     if (depth > 0) {
//         var x = x2 - x1;
//         var y = y2 - y1;

//         var scale = 0.5 + Math.random() * 0.5;

//         x *= scale;
//         y *= scale;

//         var xLeft = x * Math.cos(-angle) - y * Math.sin(-angle);
//         var yLeft = x * Math.sin(-angle) + y * Math.cos(-angle);

//         var xRight = x * Math.cos(+angle) - y * Math.sin(+angle);
//         var yRight = x * Math.sin(+angle) + y * Math.cos(+angle);

//         xLeft += x2;
//         yLeft += y2;

//         xRight += x2;
//         yRight += y2;

//         defineTree(x2, y2, xLeft, yLeft, angle, depth - 1);
//         defineTree(x2, y2, xRight, yRight, angle, depth - 1);
//     }
// }

// // draw 1 segment of the tree
// function drawSegment(segment) {
//     context.strokeStyle = "rgb( 0, 0, 0 )";
//     context.lineWidth = segment.linewidth;
//     context.beginPath();
//     context.moveTo(segment.x1, segment.y1);
//     context.lineTo(segment.x2, segment.y2);
//     context.stroke();
//     //
//     if (segment.linewidth == 0) {
//         var dx = segment.x2 - segment.x1;
//         var dy = segment.y2 - segment.y1;
//         var angle = Math.atan2(dy, dx) + Math.PI / 2;
//         var i = parseInt(Math.random() * 2.99);
//         var j = parseInt(Math.random() * 1.99);
//         context.save();
//         context.translate(segment.x2, segment.y2);
//         context.rotate(angle);
//         context.scale(0.25, 0.25);
//         context.drawImage(
//             leaves,
//             127 * i,
//             142 * j,
//             127,
//             142,
//             -127 / 2,
//             -142 / 2,
//             127,
//             142
//         );
//         context.restore();
//     }
// }

// // animate drawing each segment of the tree
// function animate(currentTime) {
//     // request another loop until all segments have been drawn
//     if (segmentIndex < segments.length) {
//         requestAnimationFrame(animate);
//     }

//     // delay until nextTime
//     if (currentTime < nextTime) {
//         return;
//     }

//     // set the new nextTime
//     nextTime = currentTime + delay;

//     // draw the current segment
//     drawSegment(segments[segmentIndex]);

//     // increment the segmentIndex for next loop
//     segmentIndex++;
// }
