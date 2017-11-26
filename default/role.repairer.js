var roleFunctions = require('roleFunctions');
var roleBuilder = require('role.builder');

/*
* Role repairer module for finding weak structures that needs repairing.
* As of now it only repairs structures not a wall.
*
*/
module.exports = {
    run: function(creep){
        //Set boolean to harvesting if out of energy. 
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🚧 repairing');
        }

        if(creep.memory.repairing) {
            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: (s) =>{ return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL}
            });
            let structure = structures[0];

            //console.log('repairing: ' + structure.structureType);
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        } else{
            roleFunctions.getOptionalSources(creep);
        }
    }
};
