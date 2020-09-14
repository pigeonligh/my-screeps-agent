var constantType = require('constant.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != constantType.Digger.name) {
        return;
    }
    if (!creep.memory.task) {
        var container = Game.getObjectById(creep.memory.param.containerId);
        var source = Game.getObjectById(creep.memory.param.sourceId);
        if (container && source) {
            creep.memory.task = taskMaker.makeDig(container, source);
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}
