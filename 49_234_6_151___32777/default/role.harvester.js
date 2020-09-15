var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

function calc(structure) {
    if (structure.structureType == STRUCTURE_SPAWN) {
        return 50;
    }
    if (structure.structureType == STRUCTURE_EXTENSION) {
        return 100;
    }
    if (structure.structureType == STRUCTURE_CONTAINER) {
        return 10;
    }
    return 1;
}

function cmp(a, b) {
    var ca = calc(a);
    var cb = calc(b);
    if (ca == cb) {
        return a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY];
    }
    return cb - ca;
}

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Harvester.name) {
        return
    }

    if (!creep.memory.task) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > structure.store.getCapacity(RESOURCE_ENERGY) * 0.1;
                }
        });
        var from = Game.getObjectById(creep.memory.param.fromId);
        if (from && targets.length) {
            targets = targets.sort(cmp);
            creep.memory.task = taskMaker.makeHarvest(from, targets[0]);
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}
