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

function isSource(source) {
    return source.room.find(FIND_SOURCES, {filter: (obj) => obj.id == source.id}).length > 0;
}

var maker = {
    makeRest: function() {
        flag = Game.flags['Rest'];
        tasks = [];
        cycle = [stepRest.create(flag)];
        return taskBase.create('Rest', tasks, cycle);
    },

    makeBuild: function(source, target) {
        var taskGet;
        if (isSource(source)) {
            taskGet = stepHarvest.create(source);
        } else {
            taskGet = stepWithdraw.create(source);
        }

        tasks = [
            taskGet,
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

    makeUpgrade: function(source) {
        var taskGet;
        if (isSource(source)) {
            taskGet = stepHarvest.create(source);
        } else {
            taskGet = stepWithdraw.create(source);
        }

        tasks = [
            taskGet,
            stepUpgrade.create(),
        ];
        cycle = [];

        return taskBase.create('Upgrade', tasks, cycle);
    },

    makeTransfer: function(from, to) {
        tasks = [
            stepWithdraw.create(from),
            stepTransfer.create(to),
        ];
        cycle = [];

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

    makeRepair: function(source, target) {
        var taskGet;
        if (isSource(source)) {
            taskGet = stepHarvest.create(source);
        } else {
            taskGet = stepWithdraw.create(source);
        }

        tasks = [
            taskGet,
            stepRepair.create(target),
        ];
        cycle = [];

        return taskBase.create('Repair', tasks, cycle);
    }
};

module.exports = maker;
