let __log = console.log;
let __assert = console.assert;
let __error = console.error;
let __warn = console.warn;

function overload(f, ...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    f.apply(console, args);
}

console.log = function (...args) {
    overload(__log, args);
}

console.assert = function (...args) {
    overload(__assert, args);
}

console.error = function (...args) {
    overload(__error, args);
}

console.warn = function (...args) {
    overload(__warn, args);
}

var log = console.log;
