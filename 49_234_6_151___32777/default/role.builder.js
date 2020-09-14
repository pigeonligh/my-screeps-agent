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
            creep.memory.task = taskMaker.makeBuild(targets[0]);
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}
