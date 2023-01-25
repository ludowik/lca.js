class Camera extends Sketch {
    setup() {
        this.grayscales = this.characters();

        pixelDensity(1);

        if (!getInCatalog()) {
            this.myCapture = createCapture(VIDEO);
            this.myCapture.hide();
        } else {
            this.render = Sketch.prototype.render;
        }

        this.params = {
            uPixelSize: 8,
            uPixelSizeMin: 1,
            uPixelSizeMax: 16,
            uPixelSizeStep: 1,
        };

        this.shader();
    }

    shader() {
        this.shader = createShader(
            `#ifdef GL_ES
            precision mediump float;
            #endif

            attribute vec3 aPosition;
            attribute vec2 aTexCoord;

            uniform mat4 uProjectionMatrix;
            uniform mat4 uModelViewMatrix;
            uniform vec2 iResolution;

            varying vec2 vTexCoord;
            

            void main() {
                vec4 positionVec4 = vec4(aPosition, 1.0);
                gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

                vTexCoord = aTexCoord;
            }`
            ,
            `#ifdef GL_ES
            precision mediump float;
            #endif

            const float PI = 3.14159265358979323846;
            const float TAU = 6.28318530718;

            uniform vec2 iResolution;
            uniform int iFrame;
            uniform float iTime;
            uniform vec2 iMouse;

            // Receive the texture from our p5 sketch
            // Uniform is a variable type used for sending data from your sketch to the shader
            // sampler2D is the type of variable we use for textures
            // uTexture is the name of our texture. It could be anything you want though!
            uniform sampler2D uTexture;
            uniform float uPixelSize;
            const float maxPixelSize = 1.0;

            // grab our textures coordinates from vert shader
            varying vec2 vTexCoord;

            void main() {
                // Call texture2D with our image and texture coordinates
                // texture2D typically takes two arguments
                // First is the sampler2D you want to use
                // Second is a vec2 containing the texture coordinates you want to use

                vec4 color = vec4(0.0);

                for (float x = 0.0; x < maxPixelSize; x += 1.0) {
                    if (x >= uPixelSize) break;                    
                    for (float y = 0.0; y < maxPixelSize; y += 1.0) {
                        if (y >= uPixelSize) break;
                        color += texture2D(
                            uTexture,
                            vec2(
                                    ivec2(vTexCoord + vec2(x, y) / iResolution)
                            )
                        );
                    }
                }

                color /= uPixelSize*uPixelSize;

                color = vec4((color.r+color.g+color.b)/3.0);
                
                // Send the color to the screen
                gl_FragColor = color;
            }`
        );
    }

    daw() {
        background(colors.black);
        noStroke();
        fill(colors.white);

        // ortho(0, width, 0, height, 0, 1);

        renderThis(() => {
            texture(this.myCapture);
            rect(-minSize / 2, -minSize / 2, minSize / 2, minSize / 2 * (this.myCapture.height / this.myCapture.width));
        });

        renderThis(() => {
            this.shader.setUniform("uTexture", this.myCapture);
            this.shader.setUniform("uPixelSize", this.params.uPixelSize);
            this.shader.setUniform("iResolution", [this.myCapture.width, this.myCapture.height]);
            shader(this.shader);
            rect(0, -minSize / 2, minSize / 2, minSize / 2 * (this.myCapture.height / this.myCapture.width));
        });

        this.myCapture.loadPixels();

        scale(minSize / 2 / this.myCapture.width, minSize / 2 * (this.myCapture.height / this.myCapture.width) / this.myCapture.height);
        for (let x = 0; x < this.myCapture.width / this.params.uPixelSize; x++) {
            for (let y = 0; y < this.myCapture.height / this.params.uPixelSize; y++) {
                let clr = this.myCapture.pixels[(x + y * this.myCapture.width) * 4 * this.params.uPixelSize];
                fill(clr / 255);
                rect(x, y, 1, 1);
            }
        }

        let str = '';
        for (let y = 0; y < this.myCapture.height / this.params.uPixelSize; y++) {
            for (let x = 0; x < this.myCapture.width / this.params.uPixelSize; x++) {
                let clr = this.myCapture.pixels[(x + y * this.myCapture.width) * 4 * this.params.uPixelSize];
                try {
                    str += this.grayscales[floor(this.grayscales.length * clr / 256)].character;
                }
                catch (error) {
                    log(floor(this.grayscales.length * clr / 256));
                }
            }
            str += '\r\n';
        }
        scale(1, 0.5);
        resetShader();
        noStroke();
        fill(colors.white);

        text(str, -minSize, 0);
    }

    characters() {
        let size = 64;
        let img = createGraphics(size, size);
        img.fill(colors.white);
        img.textAlign(CENTER, CENTER);
        img.fontSize(size);
        let grayscales = [];
        let characters = " -=~odg0";
        for (const character of characters) {
            let info = {
                character: character,
                grayscale: 0,
            };
            grayscales.push(info);

            img.background(colors.black);
            img.text(info.character, size / 2, size / 2);
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    let clr = img.get(x, y);
                    info.grayscale += clr[0] + clr[1] + clr[2];
                }
            }
        }

        let str = '';
        for (const info of grayscales) {
            str += info.character;
        }
        log(str);

        grayscales.sort((a, b) => a.grayscale - b.grayscale);

        str = '';
        for (const info of grayscales) {
            str += info.character;
        }
        log(str);

        return grayscales;
    }
}
