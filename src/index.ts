import { createPrograms, getGLRenderingContext } from "./app";
import { drawScene } from "./scene";
import {startRotation} from './store/actions';
import {store} from './store';

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  canvas.style.border = "1px solid grey";

  return canvas;
}

let canvas = createCanvas(); // Store the element to re-render on print.js changes
document.body.appendChild(canvas);

const gl = getGLRenderingContext(canvas);
const program = createPrograms(gl);
const draw = drawScene(gl, program);

store.dispatch(startRotation()).subscribe(draw);
