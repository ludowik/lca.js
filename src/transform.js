let __projectionMatrix = glMatrix.mat4.create();
function projectionMatrix() {
    return __projectionMatrix;
}

function ortho(left, right, top, bottom, near = -1000, far = 1000) {
    left = left || 0;
    right = right || W;
    top = top || 0;
    bottom = bottom || H;

    glMatrix.mat4.ortho(__projectionMatrix, left, right, top, bottom, near, far);
}

function perspective(fovy = 45, aspect, near = -1000, far = 1000) {
    aspect = aspect || (W / H);

    glMatrix.mat4.perspective(__projectionMatrix, fovy, aspect, near, far);
}

let __viewMatrix = glMatrix.mat4.create();
function viewMatrix() {
    return __viewMatrix;
}

function camera(xe, ye, ze, xc = 0, yc = 0, zc = 0) {
    var eye = glMatrix.vec3.set(glMatrix.vec3.create(), xe, ye, ze);
    var center = glMatrix.vec3.set(glMatrix.vec3.create(), xc, yc, zc);
    var up = glMatrix.vec3.set(glMatrix.vec3.create(), 0, 1, 0);
    glMatrix.mat4.lookAt(__viewMatrix, eye, center, up);
}

let __modelMatrix = glMatrix.mat4.create();
function modelMatrix() {
    return __modelMatrix;
}

function translate(x, y, z = 0) {
    var origin = glMatrix.vec3.set(glMatrix.vec3.create(), x, y, z);
    glMatrix.mat4.translate(__modelMatrix, __modelMatrix, origin);
}

function rotate(angle) {
    var axis = glMatrix.vec3.set(glMatrix.vec3.create(), 0, 0, 1);
    glMatrix.mat4.rotate(__modelMatrix, __modelMatrix, angle, axis);
}

function scale(x, y, z = 1) {
    var factor = glMatrix.vec3.set(glMatrix.vec3.create(), x, y, z);
    glMatrix.mat4.scale(__modelMatrix, __modelMatrix, factor);
}

function resetMatrix() {
    glMatrix.mat4.identity(__projectionMatrix);
    glMatrix.mat4.identity(__viewMatrix);
    glMatrix.mat4.identity(__modelMatrix);
}

var stacks = {};
function push(stackName, item) {
    stacks[stackName] = stacks[stackName] || new Array();
    stacks[stackName].push(item);
}

function pop(stackName) {
    return stacks[stackName].pop();
}

function pushMatrix() {
    push('__projectionMatrix', glMatrix.mat4.clone(__projectionMatrix));
    push('__viewMatrix', glMatrix.mat4.clone(__viewMatrix));
    push('__modelMatrix', glMatrix.mat4.clone(__modelMatrix));
}

function popMatrix() {
    __projectionMatrix = pop('__projectionMatrix');
    __viewMatrix = pop('__viewMatrix');
    __modelMatrix = pop('__modelMatrix');
}
