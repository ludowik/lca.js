function pushGlobal(L, name, value) {
    fengari.interop.push(L, value);
    fengari.lua.lua_setglobal(L, name);
}

var parameter;
function pushParameter(L) {
    parameter = {
        param: (name, minValue = 0, maxValue = 100, stepValue = 1, defaultValue = 0, callback = fengari.nil) => {
            pushGlobal(L, name, defaultValue);
            engine.sketch.params[name] = defaultValue;
            engine.sketch.params[name + 'Min'] = minValue;
            engine.sketch.params[name + 'Max'] = maxValue;
            engine.sketch.params[name + 'Step'] = stepValue;
            engine.sketch.params[name + 'OnChange'] = () => {
                pushGlobal(L, name, engine.sketch.params[name]);
                callback(engine.sketch.params[name]);
            };
        },

        number: (name, minValue = 0, maxValue = 100, defaultValue = 0, callback = fengari.nil) => {
            parameter.param(name, minValue, maxValue, 0.01, defaultValue, callback);
        },

        integer: (name, minValue, maxValue, defaultValue, callback) => {
            parameter.param(name, minValue, maxValue, 1, defaultValue, callback);
        },

        action: (name, url) => {
        },

        link: (name, url) => {
        },
    };
}

class SketchLua extends Sketch {
    constructor(sketchName) {
        super();
        this.sketchName = sketchName;
    }

    dofile(filename) {
        let rc = this.lauxlib.luaL_dofile(this.L, fengari.to_luastring(filename));
        if (rc) {
            console.log(fengari.to_jsstring(this.lua.lua_tostring(this.L, -1)));
        };
    }

    dostring(code) {
        let rc = this.lauxlib.luaL_dostring(this.L, fengari.to_luastring(code));
        if (rc) {
            if (this.lua.lua_tostring(this.L, -1)) {
                console.log(fengari.to_jsstring(this.lua.lua_tostring(this.L, -1)));
            } else {
                console.log('error in ' + code);
                throw 'error in ' + code;
            }
        };
    }

    setup(config) {
        // config.mode = WEBGL;
        this.luaconf = fengari.luaconf;
        this.lua = fengari.lua;
        this.lauxlib = fengari.lauxlib;
        this.lualib = fengari.lualib;

        this.L = this.lauxlib.luaL_newstate();
        this.lualib.luaL_openlibs(this.L);
        this.lauxlib.luaL_requiref(this.L, fengari.to_luastring("js"), fengari.interop.luaopen_js, 1);

        //this.L = fengari.L;
        this.dofile('engine/p5.lua');
        this.dostring('setupLua("' + this.sketchName + '")');
    }

    init() {
        pushParameter(this.L);

        this.setProperties();

        this.dofile('sketches.lua/' + this.sketchName + '.lua');
        this.dostring('setup()');
    }

    setProperties() {
        pushGlobal(this.L, 'W', W);
        pushGlobal(this.L, 'H', H);
        pushGlobal(this.L, 'WIDTH', W);
        pushGlobal(this.L, 'HEIGHT', H);
        pushGlobal(this.L, 'gray', colors.gray);
        pushGlobal(this.L, 'red', colors.red);
        pushGlobal(this.L, 'white', colors.white);
        pushGlobal(this.L, 'elapsedTime', elapsedTime);
    }

    update(dt) {
        this.setProperties();
        this.dostring('update(' + dt + ')');
    }

    render() {
        this.setProperties();
        this.dostring('draw()');
    }
}
