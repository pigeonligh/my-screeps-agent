var definationType = require('defination.type');

var taskBase = require('task.base');
var taskMaker = require('task.maker');

module.exports.run = function(creep) {
    if (creep.memory.role != definationType.Claimer.name) {
        return
    }

    const room = Game.rooms['W2N7'];
    if (!room) {
        creep.moveTo(new RoomPosition(25, 25, 'W2N7'), {visualizePathStyle: {stroke: '#ffaa00'}})
    } else 
    {
        creep.moveTo(new RoomPosition(8, 24, 'W2N7'), {visualizePathStyle: {stroke: '#ffaa00'}})
        return
    }
    if (creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
        var err = creep.moveTo(room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
        // var path = PathFinder.search(creep.pos, room.controller)
        // console.log('move ', err, path.path);
    }
}
