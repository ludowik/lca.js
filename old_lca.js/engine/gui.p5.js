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
    }

    isParameter(key) {
        return key.endsWith('Min') ||
            key.endsWith('Max') ||
            key.endsWith('Step') ||
            key.endsWith('List') ||
            key.endsWith('OnChange');
    }

    update() {
        if (getInCatalog()) {
            return;
        }

        for (const [key, value] of Object.entries(this.params)) {
            if (this.isParameter(key)) {
                continue;
            }

            const type = typeof value;
            switch (type) {
                case 'number':
                    this.params[key] = this.ui[key].value();
                    break;
            }
        }
    }

    updateDisplay(key) {
        if (getInCatalog()) {
            return;
        }

        if (key && this.ui[key]) {
            this.ui[key].value(this.params[key]);
        }
    }

    set() {
        if (getInCatalog()) {
            return;
        }

        for (const [key, value] of Object.entries(this.params)) {
            if (this.isParameter(key)) {
                continue;
            }

            const type = typeof value;
            switch (type) {
                case 'number':
                    this.ui[key].value(this.params[key]);
                    break;
            }
        }
    }

    addObject(params) {
        if (getInCatalog()) {
            return;
        }

        let div = document.getElementById('gui');
        div.style.width = width + 'px';

        this.params = params;

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
                        ui = createSlider(min, max, value, step);
                        break;
                    }
                case 'boolean':
                    {
                        ui = createCheckbox(key, value);
                        ui.changed(() => {
                            params[key] = ui.checked();
                        });
                        break;
                    }
                case 'object':
                    {
                        if (value instanceof p5.Color) {
                            ui = createColorPicker(value);
                            ui.input(() => {
                                params[key] = ui.color();
                            });
                            break;
                        }
                    }
                case 'function':
                    {
                        const engine = this;
                        ui = createButton(key);
                        ui.mousePressed(() => {
                            value();
                            redraw();
                        });
                        break;
                    }
                case 'string':
                    {
                        let list = params[key + 'List'];
                        if (list) {
                            ui = createSelect(value);
                            for (const item of list) {
                                ui.option(item);
                            }
                            ui.changed(() => {
                                params[key] = ui.value();
                            });
                        } else {
                            ui = createInput(value);
                            ui.input(() => {
                                params[key] = ui.value();
                            });
                        }
                        break;
                    }
            }

            if (ui) {
                let p = createP();
                p.parent(div);
                p.style('text-align:right');

                createSpan(key).parent(p);
                ui.parent(p);

                this.ui[key] = ui;

                if (params[key + 'OnChange']) {
                    ui.input(params[key + 'OnChange']);
                }
            }
        }
    }
}
