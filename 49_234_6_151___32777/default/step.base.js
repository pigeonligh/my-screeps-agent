// Step: base

var State = require('constant.state');

module.exports.create = function(target) {
    var obj = new Object;

    obj.run = function(creep) {
    };

    obj.check = function(creep) {
        return false;
    };

    obj.start = function(creep) {
        creep.say(obj.hello);
        obj.state = State.StepRunning;
    };

    obj.end = function(creep) {
        obj.state = State.StepDone;
    };

    obj.state = State.StepPending;
    obj.hello = 'hello world!';

    return obj;
}