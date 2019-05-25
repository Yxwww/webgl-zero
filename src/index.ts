function component(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.border = '1px solid grey';

    return canvas;
}

let canvas = component(); // Store the element to re-render on print.js changes
document.body.appendChild(canvas);

if (module.hot) {
    module.hot.accept('./app.tsx', function() {
        console.log('Accepting the updated printMe module!');
    })
}
