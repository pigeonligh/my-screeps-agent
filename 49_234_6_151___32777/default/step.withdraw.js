// Step: withdraw

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.run = function(creep) {
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    };

    obj.check = function(creep) {
        if (creep.store.getFreeCapacity() == 0) {
            return true;
        }
        return false;
    };

    obj.hello = '🔄 withdraw';

    return obj;
}
