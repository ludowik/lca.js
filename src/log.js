function overload(f, ...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    f.apply(console, args);
}

let __log = console.log;
console.log = function (...args) {
    overload(__log, args);
}

let __assert = console.assert;
console.assert = function (...args) {
    overload(__assert, args);
}

let __error = console.error;
console.error = function (...args) {
    overload(__error, args);
}

let __warn = console.warn;
console.warn = function (...args) {
    overload(__warn, args);
}

let __clear = console.clear;
console.clear = function(...args) {
    let log = document.getElementById('log');
    log.innerHTML = '';
    __clear.apply(console, args);
}

var log = console.log;
