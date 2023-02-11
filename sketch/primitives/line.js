class Line extends Sketch {
    draw() {
        background();
        
        strokeSize(20);
        stroke(colors.red);

        line(W/2, H/2, mouse.x, mouse.y);
    }
}