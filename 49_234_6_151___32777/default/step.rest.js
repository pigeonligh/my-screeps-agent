// Step: rest

var base = require('step.base');

module.exports.create = function(target) {
    var obj = new Object;

    obj.run = function(creep) {
        creep.moveTo(23, 25, {visualizePathStyle: {stroke: '#ffaa00'}});
    };

    obj.check = function(creep) {
        return false;
    };

    obj.hello = '🔄 rest';

    return obj;
}