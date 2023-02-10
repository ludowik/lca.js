
var stacks = {};

function pushItem(stackName, item) {
    stacks[stackName] = stacks[stackName] || new Array();
    stacks[stackName].push(item);
}

function popItem(stackName) {
    return stacks[stackName].pop();
}
