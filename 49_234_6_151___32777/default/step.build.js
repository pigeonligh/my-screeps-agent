// Step: build

var base = require('step.base');

module.exports.create = function(target) {
    var obj = base.create();

    obj.run = function(creep) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    };

    obj.check = function(creep) {
        if (creep.store[RESOURCE_ENERGY] == 0 || target.progress == target.progressTotal) {
            return true;
        }
        return false;
    };

    obj.hello = '🚧 build';

    return obj;
}
