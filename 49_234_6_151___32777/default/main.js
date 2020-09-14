var constructSpawner = require('construct.spawner');

var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');

module.exports.loop = function() {

    if (typeof(Memory.state) == "undefined") {
        Memory.state = {};
        Memory.state.count = 0;
    } else {
        Memory.state.count++;
        // console.log(Memory.state.count);
    }

    var spawn = Game.spawns['MainSpawn'];
    if (spawn) {
        constructSpawner.run(spawn);
    }

    var tower = Game.getObjectById('585883e670ef980');
    if (tower) {
        console.log("tower");
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.hits * 2 < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
        roleBuilder.run(creep);
        roleUpgrader.run(creep);
        roleRepairer.run(creep);
    }
}