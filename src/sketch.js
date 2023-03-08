class Sketch extends Entity {
    constructor() {
        super();

        this.params = {
            topLeft: true
        };

        this.fb = new FrameBuffer();

        this.loop = true;
    }
}

class SketchLua extends Sketch {
    constructor(script) {
        super();
        this.script = script;
    }

    dofile(filename) {
        let rc = this.lauxlib.luaL_dofile(this.L, fengari.to_luastring(filename));
        if (rc) {
            this.state = 'error';
            console.log(fengari.to_jsstring(this.lua.lua_tostring(this.L, -1)));
        };
    }

    dostring(code) {
        let rc = this.lauxlib.luaL_dostring(this.L, fengari.to_luastring(code));
        if (rc) {
            this.state = 'error';
            if (this.lua.lua_tostring(this.L, -1)) {
                console.log(fengari.to_jsstring(this.lua.lua_tostring(this.L, -1)));
            } else {
                console.log(this.script + ' error in ' + code);
                throw this.script + ' error in ' + code;
            }
        };
    }

    setup() {
        this.luaconf = fengari.luaconf;
        this.lua = fengari.lua;
        this.lauxlib = fengari.lauxlib;
        this.lualib = fengari.lualib;

        this.L = this.lauxlib.luaL_newstate();
        this.lualib.luaL_openlibs(this.L);
        this.lauxlib.luaL_requiref(this.L, fengari.to_luastring("js"), fengari.interop.luaopen_js, 1);

        this.dofile('src/lua/init.lua');
        this.dofile(this.script);

        this.dostring('setup_proc()');
    }

    update(dt) {
        if (this.state === 'error') return;
        this.dostring('update_proc(' + dt + ')');
    }

    draw() {
        if (this.state === 'error') return;
        this.dostring('draw_proc()');
    }
}

class SketchPython extends Sketch {
    constructor() {
        super();
    }

    draw() {
        //drawPython();
    }
}
