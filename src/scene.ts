import { projection, translate, xRotate, yRotate, zRotate, scale } from './math';

// import { randomInt } from "./utils";
// import { setRectangle } from "./rectangle";

function setGeometry(
  gl: WebGLRenderingContext,
) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
      new Float32Array([
          // left column
          0, 0, 0,
          30, 0, 0,
          0, 150, 0,
          0, 150,0 ,
          30, 0, 0,
          30, 150, 0,

          // top rung
          30, 0, 0,
          100, 0, 0,
          30, 30, 0,
          30, 30, 0,
          100, 0, 0,
          100, 30, 0,

          // middle rung
          30, 60, 0,
          67, 60, 0,
          30, 90, 0,
          30, 90, 0,
          67, 60, 0,
          67, 90, 0,   ]),
    gl.STATIC_DRAW
  );
}

export function drawScene(gl: WebGLRenderingContext, program: WebGLProgram) {
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');

  return function draw() {
    console.log("drawScene");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    const rotation = [0.51, 0.86, 0.3];
    const translation = [50, 50, 50];
    const scaleVec = [0.51, 0.86, 1];

    gl.uniform4fv(colorUniformLocation, [0.5, 0.5, 0.5, 1]);
    // gl.uniform2fv(translationLocation, [50, 50]);
    // gl.uniform2fv(rotationUniformLocation, [0.51, 0.86]);
    // gl.uniform2fv(scaleLocation, [0.51, 0.86]);
    // gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    let matrix = projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = translate(matrix, translation[0], translation[1], translation[2]);
    matrix = xRotate(matrix, rotation[0]);
    matrix = yRotate(matrix, rotation[1]);
    matrix = zRotate(matrix, rotation[2]);
    matrix = scale(matrix, scaleVec[0], scaleVec[1], scaleVec[2]);
    console.log(matrix);
    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3; // 3 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    setGeometry(gl);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;
    gl.drawArrays(primitiveType, offset, count);
  };
}
