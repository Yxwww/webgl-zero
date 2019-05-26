const fragShaderSrc = `
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;

  uniform vec4 u_color;

  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = u_color;
  }
 

`;

const vertextShaderSrc = `
  // an attribute will receive data from a buffer
  attribute vec2 a_position;

  uniform vec2 u_resolution;
  uniform vec2 u_translation;
  uniform vec2 u_rotation;
 
  // all shaders have a main function
  void main() {
 
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    // gl_Position = a_position;

    vec2 rotatedPosition = vec2(
      a_position.x * u_rotation.y + a_position.y * u_rotation.x,
      a_position.y * u_rotation.y - a_position.x * u_rotation.x
    );

    vec2 position = rotatedPosition + u_translation;

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  }
`;
function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  gl.deleteProgram(program);
}

export function getGLRenderingContext(
  canvas: HTMLCanvasElement
): WebGLRenderingContext {
  return canvas.getContext("webgl");
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function resize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

export function createPrograms(gl: WebGLRenderingContext) {
  const vertextShader = createShader(gl, gl.VERTEX_SHADER, vertextShaderSrc);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
  const program = createProgram(gl, vertextShader, fragShader);
  return program;
}
