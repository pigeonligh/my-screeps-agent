var constantBody = require('constant.body');

var constantType = {
    Harvester: {
        tag: 'Harvester',
        body: constantBody.Default,
    },
    Builder: {
        tag: 'Builder',
        body: constantBody.Default,
    },
    Upgrader: {
        tag: 'Upgrader',
        body: constantBody.Default,
    },
    Repairer: {
        tag: 'Repairer',
        body: constantBody.Default,
    },
};

module.exports = constantType;