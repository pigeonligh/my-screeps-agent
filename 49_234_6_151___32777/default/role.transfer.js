var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Transfer.name) {
        return
    }
    
    if (!creep.memory.task) {
        var from = Game.getObjectById(creep.memory.param.fromId);
        var to = Game.getObjectById(creep.memory.param.toId);
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
