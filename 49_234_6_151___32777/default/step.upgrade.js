// Step: upgrade

var base = require('step.base');

module.exports.create = function() {
    var obj = base.create();

    obj.caller = 'step.upgrade';

    obj.hello = '⚡ upgrade';

    return obj;
}

module.exports.run = function(step, creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
    }
};

module.exports.check = function(step, creep) {
    if (creep.store[RESOURCE_ENERGY] == 0) {
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
