// Step: base

var State = require('defination.state');

module.exports.create = function() {
    var obj = new Object;

    obj.caller = 'step.base';

    obj.state = State.StepPending;
    obj.hello = 'hello world!';

    return obj;
};

module.exports.run = function(step, creep) {
    return;
};

module.exports.check = function(step, creep) {
    return false;
};

module.exports.start = function(step, creep) {
    creep.say(step.hello);
    step.state = State.StepRunning;
};

module.exports.end = function(step, creep) {
    step.state = State.StepDone;
};
