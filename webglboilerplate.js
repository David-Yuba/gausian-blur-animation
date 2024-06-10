export function createProgram(ctx){
    let program = ctx.createProgram();
    let vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    let fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
 
    let vertexShader = createShader(ctx, ctx.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(ctx, ctx.FRAGMENT_SHADER, fragmentShaderSource);
    
    ctx.attachShader(program, vertexShader);
    ctx.attachShader(program, fragmentShader);
    ctx.linkProgram(program);

    let positionAttributeLocation = ctx.getAttribLocation(program, "a_position");

    createBuffer(ctx, positionAttributeLocation);

    let success = ctx.getProgramParameter(program, ctx.LINK_STATUS);
    
    if(success) return program;

    console.log(ctx.getProgramInfoLog(program));
    ctx.deleteProgram(program);
}

function createBuffer(ctx, positionAttributeLocation){
    
    let positionBuffer = ctx.createBuffer();

    ctx.enableVertexAttribArray(positionAttributeLocation);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
    
    let size = 2;          // 2 components per iteration
    let type = ctx.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer
    ctx.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
}

function createShader(ctx, type, source){
    let shader = ctx.createShader(type);
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);
    let success = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    
    if(success) return shader;
    console.log(ctx.getShaderInfoLog(shader));
    ctx.deleteShader(shader);
}

