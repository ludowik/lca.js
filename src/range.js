function range() {
    return __index(arguments, 1);
}

function index() {
    return __index(arguments, 0);
}

function* __index(args, first = 0) {
    let start = 0, end = 0, reverse = false;
    switch (args.length) {
        case 1: {
            end = args[0];
            break;
        }
        case 2: {
            if (typeof args[1] === 'boolean') {
                end = args[0];
                reverse = args[1];

            } else {
                start = args[0];
                end = args[1];
                reverse = false;
            }
            break;
        }
        case 3: {
            start = args[0];
            end = args[1];
            reverse = args[2];
            break;
        }
    }

    if (reverse === false) {
        for (let i = start; i < end; i++) {
            yield i + first;
        }

    } else {
        for (let i = end - 1; i >= start; i--) {
            yield i + first;
        }
    }
}

function iterate(iterator, f) {
    for (const iteration of iterator) {
        f(iteration);
    }
}
