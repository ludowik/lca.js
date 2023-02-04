class Line extends Sketch {
    draw() {
        background();
        
        strokeSize(20);
        line(100, 100, mouse.x, mouse.y);
    }
}