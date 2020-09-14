// Step: withdraw

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.target = target;
    obj.caller = 'step.withdraw';

    obj.hello = '🔄 withdraw';

    return obj;
};

module.exports.run = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

module.exports.check = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (target.store[RESOURCE_ENERGY] == 0 || creep.store.getFreeCapacity() == 0) {
        return true;
    }
    return false;
};

module.exports.start = function(step, creep) {
    base.start(step, creep);
};

module.exports.end = function(step, creep) {
    base.end(step, creep);
};
