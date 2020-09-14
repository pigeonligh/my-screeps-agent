var Spawner = require('structure.spawner');
var Tower = require('structure.tower');

module.exports.loop = function() {
    var spawn = Game.spawns['MainSpawn'];
    if (spawn) {
        Spawner.run(spawn);
    }

    var tower = Game.getObjectById('585883e670ef980');
    if (tower) {
        Tower.run(tower);
    }

    roles = [
        'role.harvester',
        'role.builder',
        'role.upgrader',
        'role.repairer',
        'role.digger',
        'role.transfer',
    ];

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        for (var index in roles) {
            require(roles[index]).run(creep);
        }
    }
}
