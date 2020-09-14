// Step: transfer

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.target = target;
    obj.caller = 'step.transfer';

    obj.hello = '🔄 transfer';

    return obj;
};

module.exports.run = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

module.exports.check = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (creep.store[RESOURCE_ENERGY] == 0 || target.store[RESOURCE_ENERGY] == target.storeCapacity(RESOURCE_ENERGY)) {
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
