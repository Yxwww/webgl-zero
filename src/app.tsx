let gl: Maybe<WebGLRenderingContext>;

export function getGLRenderingContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
    return canvas.getContext('webgl');
}

export function hereWeGo(canvas: HTMLCanvasElement) {
    gl = getGLRenderingContext(canvas);
    console.log(gl);
}
