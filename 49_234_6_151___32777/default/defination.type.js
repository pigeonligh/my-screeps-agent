var definationBody = require('defination.body');

var definationType = {
    Harvester: {
        name: 'Harvester',
        body: definationBody.Default,
    },
    Builder: {
        name: 'Builder',
        body: definationBody.Default,
    },
    Upgrader: {
        name: 'Upgrader',
        body: definationBody.Default,
    },
    Repairer: {
        name: 'Repairer',
        body: definationBody.Default,
    },
    Digger: {
        name: 'Digger',
        body: definationBody.Digger,
    },
    Transfer: {
        name: 'Transfer',
        body: definationBody.Transfer,
    },
};

module.exports = definationType;