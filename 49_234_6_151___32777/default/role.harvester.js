var constantType = require('constant.type');

function calc(structure) {
    if (structure.structureType == STRUCTURE_SPAWN) {
        return 100;
    }
    if (structure.structureType == STRUCTURE_EXTENSION) {
        return 50;
    }
    if (structure.structureType == STRUCTURE_CONTAINER) {
        return 10;
    }
    return 1;
}

function cmp(a, b) {
    return calc(b) - calc(a);
}

module.exports.run = function(creep) {
    if (creep.memory.role != constantType.Harvester.name) {
        return
    }

    if (creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } else {
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > structure.store.getCapacity(RESOURCE_ENERGY) * 0.2;
                }
        });
        if (targets.length > 0) {
            targets = targets.sort(cmp);
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
        }
    }
}