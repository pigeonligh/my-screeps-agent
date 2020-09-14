var constantType = require('constant.type');

function cmp(a, b) {
    var limit = 0.4;
    if (a.hits / a.hitsMax < limit && b.hits / b.hitsMax < limit) {
        return a.hits - b.hits;
    }
    return a.hits / a.hitsMax - b.hits / b.hitsMax;
}

module.exports.run = function(creep) {
    if (creep.memory.role != constantType.Repairer.name) {
        return
    }

    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.repairing = false;
        creep.memory.target = null;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.repairing && creep.store.getFreeCapacity() < 30) {
        creep.memory.repairing = true;
        creep.say('🚧 repair');

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax,
        });
        targets = targets.sort(cmp);
        creep.memory.target = targets[0].id;
    }

    if (creep.memory.repairing) {
        var target = Game.getObjectById(creep.memory.target);
        if (target) {
            var err = creep.repair(target);
            if (err == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (target.hits == target.hitsMax) {
                creep.memory.repairing = false;
            }
        } else {
            creep.memory.repairing = false;
        }
    } else {
        var sources = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.id == '7c527e06fb89334'});
        if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        /*
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        */
    }
}