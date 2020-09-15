var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Upgrader.name) {
        return;
    }
    if (!creep.memory.task) {
        var target = creep.room.controller;
        var source = target.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500
        });
        if (source) {
            creep.memory.task = taskMaker.makeUpgrade(source, target);
        }
    }
    if (creep.memory.task) {
        if (taskBase.step(creep.memory.task, creep)) {
            creep.memory.task = null;
        }
    }
}