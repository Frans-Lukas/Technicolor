var roleFunctions = require('roleFunctions');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0){
            creep.memory.harvesting = true;
        }
        if(creep.carry.energy == creep.carryCapacity){
            creep.memory.harvesting = false;
        }

	    if(creep.memory.harvesting) {
	        roleFunctions.mine(creep);
        } else {
            structs = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(object){
                    return object.energy < object.energyCapacity;
                }
            });
            if(creep.transfer(structs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            } else if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_FULL){

            }
        }
	}


};

module.exports = roleHarvester;
