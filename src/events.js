function mapEvents(engine, canvas) {
    function mouseEvent(evt) {
        engine.mouseEvent(evt);
    }
    canvas.addEventListener("click", mouseEvent);
    canvas.addEventListener("dblclick", mouseEvent);
    canvas.addEventListener("mousedown", mouseEvent);
    canvas.addEventListener("mousemove", mouseEvent);
    canvas.addEventListener("mouseup", mouseEvent);
    canvas.addEventListener("mouseenter", mouseEvent);
    canvas.addEventListener("mouseover", mouseEvent);
    canvas.addEventListener("mouseleave", mouseEvent);
    canvas.addEventListener("wheel", mouseEvent, { passive: false });

    function touchEvent(evt) {
        engine.touchEvent(evt);
    }
    canvas.addEventListener('touchstart', touchEvent);
    canvas.addEventListener('touchend', touchEvent);
    canvas.addEventListener('touchcancel', touchEvent);
    canvas.addEventListener('touchmove', touchEvent);

    function keyboardEvent(evt) {
        engine.keyboardEvent(evt);
    }
    document.addEventListener('keydown', keyboardEvent);
}
