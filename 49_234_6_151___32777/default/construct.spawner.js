var constantType = require('constant.type');

module.exports.run = function(spawner) {
    var config = [
        {
            type: constantType.Harvester,
            number: 4,
        },
        {
            type: constantType.Builder,
            number: 1,
        },
        {
            type: constantType.Upgrader,
            number: 4,
        },
        {
            type: constantType.Repairer,
            number: 5,
        }
    ];

    for (var index in config) {
        var object = config[index];
        var obj = _.filter(Game.creeps, (creep) => creep.memory.role == object.type.tag);
        if (!obj || obj.length < object.number) {
            spawner.spawnCreep(object.type.body, object.type.tag + Game.time, {
                memory: {role: object.type.tag},
            });
            break;
        }
    }
};