function cmp(a, b) {
    var limit = 0.4;
    if (a.hits / a.hitsMax < limit && b.hits / b.hitsMax < limit) {
        return a.hits - b.hits;
    }
    return a.hits / a.hitsMax - b.hits / b.hitsMax;
}

module.exports.run = function(tower) {
    var targets = tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits < structure.hitsMax * 0.1,
    });
    if (targets.length) {
        targets = targets.sort(cmp);
        tower.repair(targets[0]);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
        tower.attack(closestHostile);
    }
}
