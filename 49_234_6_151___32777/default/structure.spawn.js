var definationType = require('defination.type');

module.exports.run = function(spawn) {
    var config = [
        {
            type: definationType.Harvester,
            tag: "harvester1",
            number: 2,
            param: {
                fromId: 'ba3c0774d80c3a8',
            },
        },
        {
            type: definationType.Harvester,
            tag: "harvester2",
            number: 2,
            param: {
                fromId: 'ef990774d80108c',
            },
        },
        {
            type: definationType.Digger,
            tag: "digger1",
            number: 1,
            param: {
                containerId: '7c527e06fb89334',
                sourceId: 'ba3c0774d80c3a8',
            },
        },
        {
            type: definationType.Digger,
            tag: "digger2",
            number: 1,
            param: {
                containerId: 'c1c885073f10d3f',
                sourceId: 'ef990774d80108c',
            },
        },
        {
            type: definationType.Transfer,
            tag: "transfer-upgrade",
            number: 1,
            param: {
                fromId: 'c1c885073f10d3f',
                toId: '7879bb9eba4d0db',
            }
        },
        {
            type: definationType.Builder,
            tag: "builder",
            number: 2,
            param: {},
        },
        {
            type: definationType.Upgrader,
            tag: "upgrader",
            number: 2,
            param: {},
        },
        {
            type: definationType.Repairer,
            tag: "repairer",
            number: 2,
            param: {},
        },
        {
            type: definationType.Transfer,
            tag: "transfer-tower",
            number: 1,
            param: {
                toId: '585883e670ef980',
            }
        },
        {
            type: definationType.Transfer,
            tag: "transfer-storage",
            number: 1,
            param: {
                toId: spawn.room.storage.id,
            }
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
        console.log('MainSpawn: IDLE');
    }

    spawn.memory.roles = [
        'role.harvester',
        'role.builder',
        'role.upgrader',
        'role.repairer',
        'role.digger',
        'role.transfer',
    ];
};