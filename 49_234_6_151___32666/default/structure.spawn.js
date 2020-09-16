var definationType = require('defination.type');

module.exports.run = function(spawn) {
    var config = [
        {
            type: definationType.Harvester,
            tag: "harvester1",
            number: 1,
            param: {
                fromId: '5edf554058c1095',
            },
        },
        {
            type: definationType.Harvester,
            tag: "harvester2",
            number: 1,
            param: {
                fromId: '28ca554058c4469',
            },
        },
        {
            type: definationType.Digger,
            tag: "digger1",
            number: 1,
            param: {
                containerId: '7165584e79c3357',
                sourceId: '5edf554058c1095',
            },
        },
        {
            type: definationType.Digger,
            tag: "digger2",
            number: 1,
            param: {
                containerId: '1d325a340c6062c',
                sourceId: '3b6a554058cc105',
            },
        },
        {
            type: definationType.Transfer,
            tag: "transfer-upgrade",
            number: 0,
            param: {
                fromId: 'c1c885073f10d3f',
                toId: '7879bb9eba4d0db',
            }
        },
        {
            type: definationType.Builder,
            tag: "builder",
            number: 5,
            param: {},
        },
        {
            type: definationType.Upgrader,
            tag: "upgrader",
            number: 3,
            param: {},
        },
        {
            type: definationType.Repairer,
            tag: "repairer",
            number: 1,
            param: {},
        },
        {
            type: definationType.Transfer,
            tag: "transfer-tower",
            number: 0,
            param: {
                toId: '585883e670ef980',
            }
        },
        {
            type: definationType.Transfer,
            tag: "transfer-storage",
            number: 0,
            param: {
                // toId: spawn.room.storage.id,
            }
        },
        {
            type: definationType.Claimer,
            tag: "claimer-test",
            number: 0,
            param: {}
        },
    ];

    var idle = true;
    for (var index in config) {
        var object = config[index];
        var obj = _.filter(Game.creeps, (creep) => creep.memory.tag == object.tag);
        if (!obj || obj.length < object.number) {
            console.log('MainSpawn: spawning ' + object.tag);
            idle = false;
            spawn.spawnCreep(object.type.body, object.type.name + Game.time, {
                memory: {
                    role: object.type.name,
                    tag: object.tag,
                    param: object.param,
                    mamager: spawn.id,
                },
            });
            break;
        }
    }
    if (idle) {
        // console.log('MainSpawn: IDLE');
    }

    spawn.memory.roles = [
        'role.harvester',
        'role.builder',
        'role.upgrader',
        'role.repairer',
        'role.digger',
        'role.transfer',
        'role.claimer'
    ];
};