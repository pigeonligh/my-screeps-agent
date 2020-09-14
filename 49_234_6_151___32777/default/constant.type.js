var constantBody = require('constant.body');

var constantType = {
    Harvester: {
        name: 'Harvester',
        body: constantBody.Default,
    },
    Builder: {
        name: 'Builder',
        body: constantBody.Default,
    },
    Upgrader: {
        name: 'Upgrader',
        body: constantBody.Default,
    },
    Repairer: {
        name: 'Repairer',
        body: constantBody.Default,
    },
    Digger: {
        name: 'Digger',
        body: constantBody.Digger,
    },
    Transfer: {
        name: 'Transfer',
        body: constantBody.Transfer,
    },
};

module.exports = constantType;