var definationType = require('defination.type');

module.exports.run = function(spawner) {
    var config = [
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
            type: definationType.Builder,
            tag: "builder",
            number: 0,
            param: {},
        },
        {
            type: definationType.Upgrader,
            tag: "upgrader",
            number: 4,
            param: {},
        },
        {
            type: definationType.Repairer,
            tag: "repairer",
            number: 5,
            param: {},
        }
    ];

    for (var index in config) {
        var object = config[index];
        var obj = _.filter(Game.creeps, (creep) => creep.memory.tag == object.tag);
        if (!obj || obj.length < object.number) {
            spawner.spawnCreep(object.type.body, object.type.name + Game.time, {
                memory: {
                    role: object.type.name,
                    tag: object.tag,
                    param: object.param,
                },
            });
            break;
        }
    }
};