var roleFunctions = require('roleFunctions');

/*Transporting role
* That takes resources from harvesters and gives them to extensions
* and containers.
*/

module.exports = {
    run:function(creep){
        if(creep.carry.energy < creep.carryCapacity){
            let harvesters = creep.room.find(FIND_MY_CREEPS, {
                filter: (s) => s.memory.role === 'harvester';
            });
            if(harvesters.length == 0){
                roleFunctions.mine(creep);
            } else{
                harvesters.sort(function(a,b){
                    return (a.carry.energy < b.carry.energy ? 1 : -1)
                });
                if(creep.withdraw(harvesters[0], RESOURCE_ENERGY) ==
                                                ERR_NOT_IN_RANGE){
                    creep.moveTo(harvesters[0],
                        {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

    }
}
