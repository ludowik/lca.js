let defaultSketch = 'ulam_spiral';

const categories = [
    {
        name: 'math',
        sketches: [
            'pi',
            'feigenbaum',
            'fourier',
            'cardioid',
            'ulam_spiral'
        ]
    },
    {
        name: '2d',
        sketches: [
            'circle_packing',
            'circle_sizing',
            'circle_recursive',
            'lines',
            'noise',
            'lightning_ball',
            'schotter',
            'scribble',
            'micro',
            'rainbow',
        ]
    },
    {
        name: '3d',
        sketches: [
            '3d',
            'bees',
            'spirale',
        ]
    },
    {
        name: 'generative algo',
        sketches: [
            'trees',
        ]
    },
    {
        name: 'game',
        sketches: [
            '2048',
            'brick_breaker',
            'game_of_life',
        ]
    },
    {
        name: 'python',
        sketches: []
    },
    {
        name: 'lua',
        sketches: [
            'codingCreative/circles.lua',
            'codingCreative/phyllotaxis.lua',
            'sketches2D/collatz.lua',
            'sketches2D/canevas.lua',
            'sketches2D/rose.lua',
            'sketches2D/squaregrid.lua',
            'sketches2D/horloge.lua',
        ]
    },
    {
        name: 'ui',
        sketches: [
            'ui',
        ]
    },
    {
        name: 'physics',
        sketches: [
            'attraction',
            'flow_fields',
            'grains',
        ]
    },
    {
        name: 'shader',
        sketches: [
            'shader',
            'camera',
        ]
    },
    {
        name: 'divers',
        sketches: [
            'cc',
            'lexer',
        ]
    }
];

let inCatalog = false;
function setInCatalog(catalog) {
    inCatalog = catalog;
}

function getInCatalog() {
    return inCatalog;
}

function addLink(sketch, category) {
    let link = document.createElement('a');
    link.innerText = sketch;
    link.href = `index.html?sketch=/${sketch}`;

    let elt;
    if (category) {
        elt = document.getElementById("scripts_" + category);
        if (!elt) {
            elt = document.createElement('div');
            elt.id = "scripts_" + category;
            elt.innerText = category;

            document.getElementById("scripts").appendChild(elt);
        }
    }
    else {
        elt = document.getElementById("scripts");
    }
    elt.appendChild(link);
}

function addSketch(sketch, category) {
    if (sketch === 'default') {
        sketch = defaultSketch;

    } else if (sketch === 'random') {
        let cat = categories[randomInt(categories.length)];
        category = cat.name;
        sketch = cat.sketches[randomInt(cat.sketches.length)];
    }

    let script = document.createElement('script');
    script.id = 'sketch=' + sketch + '&category=' + category;
    if (sketch.includes('.lua')) {
        script.innerText = 'setSketch(SketchLua, "' + sketch.replace('.lua', '') + '")';

    } else if (sketch.includes('.bry')) {
        //script.innerText = 'setSketch(SketchPython, "' + sketch.replace('.py', '') + '")';
        script.type = 'text/python';
        script.src = sketch;
        setSketch(SketchPython);

    } else {
        script.src = `sketches.js/${sketch}.js`;
    }
    script.async = false;

    let elt;
    if (category) {
        elt = document.getElementById("scripts_" + category);
        if (!elt) {
            elt = document.createElement('div');
            elt.id = "scripts_" + category;
            document.getElementById("scripts").appendChild(elt);
        }
    }
    else {
        elt = document.getElementById("scripts");
    }
    elt.appendChild(script);

    if (sketch.includes('.bry')) {
        brython();
    }
}

function addOneSketche(sketch) {
    setInCatalog(false);

    console.clear();
    addSketch(sketch, sketch);

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
}

function addAllSketches() {
    setInCatalog(true);

    for (const category of categories) {
        // if (category.name !== 'lua') continue;
        // if (category.name !== 'python') continue;
        for (const sketch of category.sketches) {
            addLink(sketch, category.name);
        }
    }

    document.body.style.overflow = 'visible';
    document.body.style.position = 'absolute';
}
