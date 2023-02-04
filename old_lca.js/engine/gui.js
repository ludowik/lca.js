let gui;
function createGUI() {
    gui = new GUI();
    return gui;
}

function updateGUI() {
    if (gui) {
        gui.update();
    }
}

class GUI {
    constructor() {
        this.params = {};
        this.ui = {};

        if (getInCatalog()) {
            return;
        }

        this.gui = new dat.GUI({
            name: 'params',
            closeOnTop: true
        });

        // this.gui.useLocalStorage = true;

        let div = document.getElementById('gui');
        div.style.width = width + 'px';
        div.append(this.gui.domElement);
    }

    update() {
        if (getInCatalog()) {
            return;
        }
    }

    updateDisplay(key) {
        if (getInCatalog()) {
            return;
        }

        if (key && this.ui[key]) {
            this.ui[key].updateDisplay();
        }
    }

    isParameter(key) {
        return key.endsWith('Min') ||
            key.endsWith('Max') ||
            key.endsWith('Step') ||
            key.endsWith('List') ||
            key.endsWith('OnChange');
    }

    addObject(params) {
        if (getInCatalog()) {
            return;
        }

        this.params = params;

        // this.gui.remember(this.params);

        for (const [key, value] of Object.entries(params)) {
            if (this.isParameter(key)) {
                continue;
            }

            let ui;

            const type = typeof value;
            switch (type) {
                case 'number':
                    {
                        let min = params[key + 'Min'] || 0;
                        let max = params[key + 'Max'] || 100;
                        let step = params[key + 'Step'] || 1;
                        ui = this.gui.add(this.params, key, min, max, step);
                        break;
                    }
                case 'boolean':
                    {
                        ui = this.gui.add(this.params, key);
                        break;
                    }
                case 'object':
                    {
                        if (value instanceof p5.Color) {
                            const param = {};
                            param[key] = {
                                r: value._getRed() * 255,
                                g: value._getGreen() * 255,
                                b: value._getBlue() * 255
                            };
                            ui = this.gui.addColor(param, key).onChange(() => {
                                value.setRed(param[key].r / 255);
                                value.setGreen(param[key].g / 255);
                                value.setBlue(param[key].b / 255);
                            });
                        }
                        break;
                    }
                case 'function':
                    {
                        ui = this.gui.add(this.params, key);
                        break;
                    }
                case 'string':
                    {
                        let list = params[key + 'List'];
                        if (list)
                            ui = this.gui.add(this.params, key, list);
                        else
                            ui = this.gui.add(this.params, key);
                        break;
                    }
            }

            if (ui) {
                this.ui[key] = ui;
                if (params[key + 'OnChange']) {
                    ui.onChange(params[key + 'OnChange']);
                }
            }
        }
    }
}
