import { randomInt } from "./utils";
import { setRectangle } from "./rectangle";

function setGeometry(gl: WebGLRenderingContext, width: number, height: number, thickness: number) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // left column
        0,
        0,
        30,
        0,
        0,
        150,
        0,
        150,
        30,
        0,
        30,
        150,

        // top rung
        30,
        0,
        100,
        0,
        30,
        30,
        30,
        30,
        100,
        0,
        100,
        30,

        // middle rung
        30,
        60,
        67,
        60,
        30,
        90,
        30,
        90,
        67,
        60,
        67,
        90
      ]),
      gl.STATIC_DRAW
    );
  }

export function drawScene(gl: WebGLRenderingContext, program: WebGLProgram) {
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const translationLocation = gl.getUniformLocation(program, "u_translation");
  const rotationUniformLocation = gl.getUniformLocation(program, "u_rotation");
  return function draw() {
    console.log("drawScene");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var resolutionUniformLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    );

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.uniform4f(colorUniformLocation, 0.5, 0.5, 0.5, 1);
    gl.uniform2fv(translationLocation, [50, 50]);
    gl.uniform2fv(rotationUniformLocation, [1, 0]);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
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

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    setGeometry(gl, 100, 150, 30);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;
    gl.drawArrays(primitiveType, offset, count);
  };
}

