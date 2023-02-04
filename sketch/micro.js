class Micro /*extends Sketch*/ {
    setup() {
        engine.canvas.mousePressed(userStartAudio);
        if (!getInCatalog()) {
            this.mic = new p5.AudioIn();
            this.mic.start();

            this.fft = new p5.FFT();
            this.fft.setInput(this.mic);
        } else {
            this.render = Sketch.prototype.render;
        }

        this.levels = [];
    }

    mouseMoved() {
    }

    draw() {
        background(colors.black);

        let scanner = {
            values: this.levels,
            get: value => value * 10,
            step: 0.05,
        };
        this.levels.push(this.mic.getLevel());
        if (this.levels.length >= TAU / scanner.step) {
            this.levels.shift();
        }

        this.renderData(scanner);

        scanner = {
            values: autoCorrelate(this.fft.analyze()),
            get: value => (value + 1) / 2,
        };
        this.renderData(scanner);

        scanner = {
            values: autoCorrelate(this.fft.waveform(1024, 'float32')),
            get: value => (value + 1) / 2,
        };
        this.renderData(scanner);
    }

    renderData(scanner) {
        let step = scanner.step || (TAU / scanner.values.length);

        let angle = -PI / 2 - scanner.values.length * step;

        noFill();

        let vmin = Math.MAX_VALUE, vmax = -Math.MAX_VALUE;
        for (const value of scanner.values) {
            let level = sqrt(scanner.get(value), 4);
            vmin = min(vmin, level);
            vmax = max(vmax, level);
        }

        beginShape();
        for (const value of scanner.values) {
            let level = sqrt(scanner.get(value), 4);
            level *= (width / 2);
            stroke(randomColor());
            vertex(
                CX + cos(angle) * level,
                CY + sin(angle) * level);
            angle += step;
        }
        endShape();
    }
}

// if > 0, ignores levels below this threshold
var centerClip = 0;
var bNormalize = true;

function autoCorrelate(buffer) {
    var newBuffer = [];
    var nSamples = buffer.length;

    var autocorrelation = [];

    // center clip removes any samples under 0.1
    if (centerClip) {
        var cutoff = centerClip;
        for (var i = 0; i < buffer.length; i++) {
            var val = buffer[i];
            buffer[i] = Math.abs(val) > cutoff ? val : 0;
        }
    }

    for (var lag = 0; lag < nSamples; lag++) {
        var sum = 0;
        for (var index = 0; index < nSamples; index++) {
            var indexLagged = index + lag;
            var sound1 = buffer[index];
            var sound2 = buffer[indexLagged % nSamples];
            var product = sound1 * sound2;
            sum += product;
        }

        // average to a value between -1 and 1
        newBuffer[lag] = sum / nSamples;
    }

    if (bNormalize) {
        var biggestVal = 0;
        for (var index = 0; index < nSamples; index++) {
            if (abs(newBuffer[index]) > biggestVal) {
                biggestVal = abs(newBuffer[index]);
            }
        }
        // dont divide by zero
        if (biggestVal !== 0) {
            for (var index = 0; index < nSamples; index++) {
                newBuffer[index] /= biggestVal;
            }
        }
    }

    return newBuffer;
}
