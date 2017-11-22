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
            console.log();
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            } else if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_FULL){

            }
        }
	},

	transferToTank:function(creep){
	    var extensions = creep.room.find(FIND_MY_STRUCTURES, {
	       filter: {structureType: STRUCTURE_EXTENSION}
	    });
	    var extensionsFull = false;
      for (var extension in extensions) {
        if (extension.carry.energy < extension.carryCapacity) {
            return extension;
        }
      }
      var containers = creep.room.find(FIND_MY_STRUCTURES, {
          filter: {structureType: STRUCTURE_STORAGE}
      });
      for (var container in containers) {
        if (container.carry.energy < extension.carryCapacity) {
            return container;
        }
      }
      return Game.spawns['Spawn1'];

	}
};

module.exports = roleHarvester;
