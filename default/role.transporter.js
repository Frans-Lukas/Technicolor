var roleFunctions = require('roleFunctions');
/*Transporting role
* That takes resources from harvesters and gives them to extensions
* and containers.
*/

module.exports = {
    run:function(creep){

        if(creep.carry.energy < creep.carryCapacity){
            roleFunctions.getDroppedResource(creep);
        } else{

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity) || (
                        structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });
            //console.log(containers[0].store);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

    }
}
