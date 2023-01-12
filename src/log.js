let cl = console.log
console.log = function (...args) {
    let log = document.getElementById('log');
    log.innerHTML = args + "<br>" + log.innerHTML;
    cl.apply(console, args);
}
