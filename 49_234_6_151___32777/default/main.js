var Spawn = require('structure.spawn');
var Tower = require('structure.tower');

module.exports.loop = function() {
    for (var index in Memory.creeps) {
        if (!Game.creeps[index]) {
            delete Memory.creeps[index];
            console.log('Release memory ', index);
        }
    }

    var spawn = Game.spawns['MainSpawn'];
    if (spawn) {
        Spawn.run(spawn);
    }

    var towers = spawn.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_TOWER,
    })
    for (var index in towers) {
        Tower.run(towers[index]);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var roles = spawn.memory.roles;
        for (var index in roles) {
            require(roles[index]).run(creep);
        }
    }
}
