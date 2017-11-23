var roleFunctions = require('roleFunctions');
var cityFunctions = require('cityFunctions');

var roleUpgrader = {
    source:undefined,
    /** @param {Creep} creep **/
    run: function(creep) {

        cityFunctions.constructRoad(creep);

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER) && structure.energy > 0;
                }
            });
            if(targets.length == 0){
                roleFunctions.mine(creep);
            } else {
            //console.log(creep.memory.source.name);
                roleFunctions.getResource(creep, targets[0]);
            }

        }
    }
};

module.exports = roleUpgrader;
