var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Transfer.name) {
        return
    }
    if (!creep.memory.task) {
        var from;
        var to = Game.getObjectById(creep.memory.param.toId);
        if (!to) {
            to = creep.room.storage;
        }
        if (to.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            to = creep.room.storage;
        }
        if (creep.memory.param.fromId) {
            from = Game.getObjectById(creep.memory.param.fromId);
        } else if (to) {
            var from = to.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1500
            });
        }
        if (from && to) {
            creep.memory.task = taskMaker.makeTransfer(from, to);
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}
