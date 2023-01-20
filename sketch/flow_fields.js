class FlowFields extends Sketch {
    init() {
        this.left_x = round(width * -0.5);
        this.right_x = round(width * 1.5);
        this.top_y = round(height * -0.5);
        this.bottom_y = round(height * 1.5);

        this.resolution = Math.max(1, round(width * 0.01));

        this.num_columns = round((this.right_x - this.left_x) / this.resolution);
        this.num_rows = round((this.bottom_y - this.top_y) / this.resolution);

        this.grid = new Array(this.num_columns);

        let default_angle = PI * 0.25;
        for (var i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(this.num_rows);
            for (var j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = default_angle;
            }
        }

        this.initGrid();

        this.params.reset = () => this.initGrid();
        this.params.lines = true;
    }

    initGrid() {
        let scaled_x, scaled_y, noise_val, angle;

        noiseSeed(elapsedTime);
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                // Processing's noise() works best when the step between
                // points is approximately 0.005, so scale down to that
                scaled_x = i * 0.005;
                scaled_y = j * 0.005;

                // get our noise value, between 0.0 and 1.0
                noise_val = noise(scaled_x, scaled_y);

                // translate the noise value to an angle (betwen 0 and 2 * PI)
                angle = map(noise_val, 0, 1, 0, PI * 2);
                this.grid[i][j] = angle;
            }
        }
    }

    render() {
        background(colors.white);
        
        colorMode(HSB, 1);
        
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                let v = createVector(this.resolution, 0).rotate(this.grid[i][j]);
                if (this.params.lines) {
                    stroke(this.grid[i][j] / (PI * 2.), 0.5, 1);
                    line(
                        i * this.resolution, j * this.resolution,
                        i * this.resolution + v.x, j * this.resolution + v.y);
                } else {
                    fill(this.grid[i][j] / (PI * 2.), 0.5, 1);
                    rect(
                        i * this.resolution, j * this.resolution,
                        this.resolution, this.resolution);
                }
            }
        }
    }
}

declareSketch(FlowFields);
