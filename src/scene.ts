import { projection, translate, xRotate, yRotate, zRotate, scale } from './math';
import {geometry, color} from './data/f';

function setColors(gl: WebGLRenderingContext) {
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(color), gl.STATIC_DRAW);
}

function setGeometry(
  gl: WebGLRenderingContext,
) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
      new Float32Array(geometry),
    gl.STATIC_DRAW
  );
}

export function drawScene(gl: WebGLRenderingContext, program: WebGLProgram) {
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');
  const colorLocation = gl.getAttribLocation(program, "a_color");

  return function draw() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    console.log("drawScene");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);

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
    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Create buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // Put the colors in the buffer.
    setColors(gl);

    // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    var size = 3;                 // 3 components per iteration
    var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
    var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(
    colorLocation, size, type, normalize, stride, offset)

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
    var count = 16 * 6;
    gl.drawArrays(primitiveType, offset, count);
  };
}
