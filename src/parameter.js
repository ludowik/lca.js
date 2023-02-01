function ifundef(v, def) {
    if (v === undefined)
        return def;
    return v;
}

class Parameter {
    number(name, min, max, value) {
        globalThis[name] = ifundef(globalThis[name], ifundef(value, min));
    }

    integer(name, min, max, value) {
        globalThis[name] = ifundef(globalThis[name], ifundef(value, min));
    }

    action() { }

    link() { }
}

parameter = new Parameter();
