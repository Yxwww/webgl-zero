import { join } from "ramda";

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = join(' ')(['Hello', 'webpack']);

    btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./app.tsx', function() {
        console.log('Accepting the updated printMe module!');
    })
}
