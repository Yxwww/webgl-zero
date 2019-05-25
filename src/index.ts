import { hereWeGo } from './app';
function createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    canvas.style.border = '1px solid grey';

    return canvas;
}

let canvas = createCanvas(); // Store the element to re-render on print.js changes
document.body.appendChild(canvas);

hereWeGo(canvas);

if (module.hot) {
    module.hot.accept('./app.tsx', function() {
        console.log('Accepting the updated printMe module!');
    })
}
