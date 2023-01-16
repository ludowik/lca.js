let __log = console.log;
let __error = console.error;
let __warn  = console.warn;
let __trace  = console.trace;

console.log = function (...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    __log.apply(console, args);
}

console.error = function (...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    __error.apply(console, args);
}

console.warn = function (...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    __warn.apply(console, args);
}

console.trace = function (...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    __trace.apply(console, args);
}
