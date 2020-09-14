// Step: repair

var base = require('step.base');

module.exports.create = function(target) {
    var obj = new Object;

    obj.run = function(creep) {
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    };

    obj.check = function(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0 || target.hits == target.hitsMax) {
            return true;
        }
        return false;
    };

    obj.hello = '🔄 repair';

    return obj;
}