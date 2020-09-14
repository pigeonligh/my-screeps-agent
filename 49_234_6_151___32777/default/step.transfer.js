// Step: transfer

var base = require('step.base');

module.exports.create = function(target) {
    var obj = new Object;

    obj.run = function(creep) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    };

    obj.check = function(creep) {
        if (creep.store.getFreeCapacity() == 0 || _.sum(target.store) == _.sum(target.storeCapacity())) {
            return true;
        }
        return false;
    };

    obj.hello = '🔄 transfer';

    return obj;
}