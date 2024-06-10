import { createProgram } from "./webglboilerplate.js";

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("webgl2");

let prog = createProgram(ctx);

canvas.width = 3*canvas.clientWidth;
canvas.height = 3*canvas.clientHeight;

ctx.viewport(0,0,ctx.drawingBufferWidth,ctx.drawingBufferHeight);

ctx.clearColor(22/255,18/255,59/255,1.0);
ctx.clear(ctx.COLOR_BUFFER_BIT);

ctx.useProgram(prog)
let resUniformLocation = ctx.getUniformLocation(prog, "res");
ctx.uniform2f(resUniformLocation, canvas.width, canvas.height);

let radUniformLocation = ctx.getUniformLocation(prog, "rad");
let length=1;

let position = [
    0,0,
    length,length,
    -length,length,
    -length,-length,
    length,-length,
    length,length,
]
let primitiveType = ctx.TRIANGLE_FAN;
let offset = 0;
let count = 6;


requestAnimationFrame(breath);
function breath(time){

    ctx.clear(ctx.COLOR_BUFFER_BIT);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(position), ctx.STATIC_DRAW);
    ctx.uniform1f(radUniformLocation, time);
    

    ctx.drawArrays(primitiveType, offset, count);
    requestAnimationFrame(breath);
}