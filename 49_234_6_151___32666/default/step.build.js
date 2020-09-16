// Step: build

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.target = target;
    obj.targetId = target.id;
    obj.caller = 'step.build';

    obj.hello = '🚧 build';

    return obj;
};

module.exports.run = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
};

module.exports.check = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (target) {
        if (creep.store[RESOURCE_ENERGY] == 0 || target.progress == target.progressTotal) {
            return true;
        }
        return false;
    }
    return true;
};

module.exports.start = function(step, creep) {
    base.start(step, creep);
};

module.exports.end = function(step, creep) {
    base.end(step, creep);
};
