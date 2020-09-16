var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

function cmp(a, b) {
    var limit = 0.4;
    if (a.hits / a.hitsMax < limit && b.hits / b.hitsMax < limit) {
        return a.hits - b.hits;
    }
    return a.hits / a.hitsMax - b.hits / b.hitsMax;
}

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Repairer.name) {
        return
    }

    if (!creep.memory.task) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax,
        });
        if (targets.length) {
            targets = targets.sort(cmp);
            var target = targets[0];
            var source = target.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500
            });
            if (!source) {
                source = target.pos.findClosestByRange(FIND_SOURCES);
            }
            if (source) {
                creep.memory.task = taskMaker.makeRepair(source, target);
            }
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}
