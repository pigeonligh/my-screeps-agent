// Step: rest

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.target = target;
    obj.caller = 'step.rest';

    obj.hello = '🔄 rest';

    return obj;
};

module.exports.run = function(step, creep) {
    var target = Game.getObjectById(step.target);
    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
};

module.exports.check = function(step, creep) {
    return false;
};

module.exports.start = function(step, creep) {
    base.start(step, creep);
};

module.exports.end = function(step, creep) {
    base.end(step, creep);
};
