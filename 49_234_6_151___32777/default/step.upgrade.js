// Step: upgrade

var base = require('step.base');

module.exports.create = function() {
    var obj = new Object;

    obj.run = function(creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    };

    obj.check = function(creep) {
        return false;
    };

    obj.hello = '⚡ upgrade';

    return obj;
}