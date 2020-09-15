// Step: repair

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.target = target;
    obj.caller = 'step.repair';

    obj.hello = '🔄 repair';

    return obj;
};

module.exports.run = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

module.exports.check = function(step, creep) {
    var target = Game.getObjectById(step.target.id);
    if (target) {
        if (creep.store[RESOURCE_ENERGY] == 0 || target.hits == target.hitsMax) {
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
