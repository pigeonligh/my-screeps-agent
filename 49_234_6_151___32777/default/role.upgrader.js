var constantType = require('constant.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != constantType.Upgrader.name) {
        return;
    }
    if (!creep.memory.task) {
        creep.memory.task = taskMaker.makeUpgrade(creep.room.controller);
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}