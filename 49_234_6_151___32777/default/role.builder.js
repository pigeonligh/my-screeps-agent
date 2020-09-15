var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Builder.name) {
        return
    }

    if (!creep.memory.task) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            var target = targets[0];
            var source = target.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500
            });
            if (source) {
                creep.memory.task = taskMaker.makeBuild(source, target);
            }
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}
