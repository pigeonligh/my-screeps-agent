// Task maker

var stepBuild = require('step.build');
var stepHarvest = require('step.harvest');
var stepRepair = require('step.repair');
var stepRest = require('step.rest');
var stepTransfer = require('step.transfer');
var stepUpgrade = require('step.upgrade');
var stepWithdraw = require('step.withdraw');
var stepMove = require('step.move');

var taskBase = require('task.base');

var maker = {
    makeRest: function() {
        flag = Game.flags['Rest'];
        tasks = [];
        cycle = [stepRest.create(flag)];
        return taskBase.create('Rest', tasks, cycle);
    },

    makeBuild: function(target) {
        var closestSource = target.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500
        });

        tasks = [
            stepWithdraw.create(closestSource),
            stepBuild.create(target),
        ];
        cycle = [];

        return taskBase.create('Build', tasks, cycle);
    },

    makeDig: function(pos, target) {
        tasks = [
            stepMove.create(pos),
        ];
        cycle = [
            stepHarvest.create(target),
        ];

        return taskBase.create('Dig', tasks, cycle);
    },

    makeUpgrade: function(target) {
        var closestSource = target.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500
        });
        tasks = [];
        cycle = [
            stepWithdraw.create(closestSource),
            stepUpgrade.create(),
        ];

        return taskBase.create('Upgrade', tasks, cycle);
    },

    makeTransfer: function(from, to) {
        tasks = [];
        cycle = [
            stepWithdraw.create(from),
            stepTransfer.create(to),
        ];

        return taskBase.create('Transfer', tasks, cycle);
    },

    makeHarvest: function(from, to) {
        tasks = [
            stepHarvest.create(from),
            stepTransfer.create(to),
        ];
        cycle = [];

        return taskBase.create('Harvest', tasks, cycle);
    },

    makeRepair: function(target) {
        var closestSource = target.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500
        });
        
        tasks = [
            stepWithdraw.create(closestSource),
            stepRepair.create(target),
        ];
        cycle = [];

        return taskBase.create('Repair', tasks, cycle);
    }
};

module.exports = maker;
