class Button extends Entity {
    constructor(name, x, y, w, h) {
        super();
        this.name = name;
        this.position = createVector(x, y);
        this.size = createVector(w, h);
    }

    contains(x, y) {
        if (x > this.position.x && x < this.position.x + this.size.x &&
            y > this.position.y && y < this.position.y + this.size.y) {
            return true;
        }
        return false;
    }

    render() {
        fill(colors.white);
        rectMode(CORNER);
        rect(this.position.x, this.position.y, this.size.x, this.size.y, 5);

        fill(colors.black);
        textAlign(CENTER, CENTER);
        text(this.name, this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);

        stroke(colors.red);
        line(
            this.position.x, this.position.y + this.size.y / 2,
            this.position.x + this.size.x, this.position.y + this.size.y / 2);
    }
}

class Cell {
    constructor(value) {
        this.value = value;
        this.scale = 0;
        this.translate = null;
    }

    render(cell, x, y, size, marge) {
        push(); {
            translate(x * size + size / 2, y * size + size / 2);

            if (this.translate) {
                if (this.translate.x) {
                    this.translate.x += -Math.sign(this.translate.x) * size / 10;
                }
                if (this.translate.y) {
                    this.translate.y += -Math.sign(this.translate.y) * size / 10;
                }
                translate(this.translate.x, this.translate.y);
                if (abs(this.translate.x) < 2 && abs(this.translate.y) < 2) {
                    this.translate = null;
                }
            }

            if (this.scale < 1) {
                this.scale += 0.1;
                scale(this.scale);
            }

            textSize(size / 2);

            let clr = this.color(cell);
            fill(clr[1]);
            rect(0, 0, size - marge, size - marge, size / 8);

            fill(clr[0]);
            text(cell.value, 0, 0);
        }
        pop();
    }

    color(cell) {
        return {
            [-1]: ['#766', '#dcb'],
            [0]: ['#766', '#dcb'],
            [2]: ['#766', '#eee'],
            [4]: ['#766', '#eec'],
            [8]: ['#ffe', '#fb8'],
            [16]: ['#ffe', '#f96'],
            [32]: ['#ffe', '#f75'],
            [64]: ['#ffe', '#f53'],
            [128]: ['#ffe', '#ec7'],
            [256]: ['#ffe', '#ec6'],
            [512]: ['#ffe', '#ec5'],
            [1024]: ['#fff', '#ec3'],
            [2048]: ['#fff', '#ec2'],
            [4096]: ['#fff', '#ec1'],
        }[cell.value] || [randomColor(), randomColor()];
    }
}

class Game2048 extends Sketch {
    setup() {
        colorMode(HSB, 1);

        this.params.autoPlay = false;
    }

    init() {
        this.grid = new Grid(4);
        this.score = 0;
        if (!this.load()) {
            this.addCell();
        }

        this.size = width / (this.grid.w + 1);
        this.button = new Button('new', this.size, height - this.size, this.size, this.size / 2);
    }

    newGame() {
        storeItem('2048/grid', null);
        this.init();
    }

    store() {
        storeItem('2048/grid', this.grid.items);
        storeItem('2048/score', this.score);
        storeItem('2048/highScore', this.highScore);
    }

    load() {
        let items = getItem('2048/grid');
        if (items) {
            this.score = getItem('2048/score') || 0;
            this.highScore = getItem('2048/highScore') || 0;
            this.grid.items = items;
            iterate(index(this.grid.w), col => {
                iterate(index(this.grid.h), row => {
                    if (this.grid.get(col, row) !== null) {
                        this.grid.set(col, row, new Cell(this.grid.get(col, row).value));
                    }
                });
            });
            return true;
        }

        return false;
    }

    addCell() {
        if (!this.isGameOver()) {
            let x;
            let y;
            do {
                x = randomInt(this.grid.w);
                y = randomInt(this.grid.h);
            } while (this.grid.get(x, y) !== null);

            this.grid.set(x, y, new Cell(random() < 0.85 ? 2 : 4));
        }

        this.store();
    }

    isGameOver() {
        let isGameOver = true;
        this.grid.forEach(element => {
            if (element === null) {
                isGameOver = false;
            }
        });
        if (isGameOver) {
            log_clear('Game Over');
        }
        return isGameOver;
    }

    update() {
        if (this.params.autoPlay) {
            if (this.move(LEFT_ARROW) === 0) {
                if (this.move(DOWN_ARROW) === 0) {
                    this.move(RIGHT_ARROW);
                }
            }
        }
    }

    render() {
        background(colors.black);

        noStroke();

        textAlign(CENTER, CENTER);

        let size = this.size;
        let marge = 5;

        fill('#dcb');
        rectMode(CENTER);
        rect(
            xc,
            yc,
            this.grid.w * size + marge * 2,
            this.grid.w * size + marge * 2,
            size / 8);

        textSize(size / 2);
        text(this.score, size * 1.5, size / 2);
        text(this.highScore, size * 3.5, size / 2);

        this.grid.render((cell, x, y) => {
            if (cell) {
                cell.render(cell, x, y, size, marge);
            }
        });

        this.button.render();
    }

    mouseReleased() {
        if (this.button.contains(mouseX, mouseY)) {
            this.newGame();
        }
    }

    keyPressed(keyCode, key) {
        if (key == 'n') {
            this.newGame();

        } else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW || keyCode === UP_ARROW) {
            this.move(keyCode);
        }
    }

    move(keyCode) {
        let up = (keyCode === DOWN_ARROW || keyCode === UP_ARROW) ? (keyCode === UP_ARROW ? -1 : 1) : 0;
        let right = (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) ? (keyCode === LEFT_ARROW ? -1 : 1) : 0;

        let grid = this.grid;

        let availableMove = false;

        let totalMoves = 0;
        let moves;
        do {
            moves = 0;
            iterate(index(grid.w, right === 1), col => {
                iterate(index(grid.h, up === 1), row => {
                    let from = grid.get(col, row);
                    if (from !== null) {
                        if (grid.valid(col + right, row + up)) {
                            let target = grid.get(col + right, row + up);
                            if (target === null) {
                                grid.set(col + right, row + up, from);
                                grid.set(col, row, null);
                                moves++;
                                availableMove = true;
                                from.translate = createVector(-right * this.size, -up * this.size);

                            } else if (target.value === from.value && from.value > 0) {
                                from.value *= -2;
                                grid.set(col + right, row + up, from);
                                grid.set(col, row, null);
                                moves++;
                                availableMove = true;
                                this.score += from * 2;
                                this.highScore = max(this.score, this.highScore);
                            }
                        }
                    }
                });
            });

            totalMoves += moves;
        }
        while (moves > 0);

        if (availableMove) {
            iterate(index(this.grid.w), col => {
                iterate(index(this.grid.h), row => {
                    if (this.grid.get(col, row) !== null) {
                        this.grid.get(col, row).value = Math.abs(this.grid.get(col, row).value);
                    }
                });
            });
            this.addCell();
        } else {
            this.isGameOver();
        }

        return totalMoves;
    }
}

setSketch(Game2048);
