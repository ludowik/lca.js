class PlayWithRect extends Sketch {
    setup() {
        //noLoop();
    }

    draw() {
        background(colors.black);

        let cols = 12, rows = 20;
        let size = H / (rows + 2);
        let x = 0, y = 0;

        translate(
            (W - cols * size) / 2,
            (H - rows * size) / 2);

        rectMode(CENTER);
        textAlign(CENTER, CENTER);

        noStroke();

        for (const j of index(rows)) {
            for (const i of index(cols)) {
                x = i * size + random(-size / 2, size / 2) * ((j / rows) ** 2);
                y = j * size + random(-size / 2, size / 2) * ((j / rows) ** 2);

                push();
                translate(x, y);

                let angle = random(-PI / 2, PI / 2) * ((j / rows) ** 2);
                rotate(angle);

                fill(Color.random());
                rect(0, 0, size, size);

                fill(Color.random());
                fontSize(size);

                let name = 'Hello world !'
                text(name[randomInt(name.length)], 0, 0);

                pop();
            }
        }
    }
}
