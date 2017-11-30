var roleFunctions = require('roleFunctions');
var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = [];

            //Prioritize order, first is highest priority.
            let structureTypes = [STRUCTURE_SPAWN,
                            STRUCTURE_EXTENSION,
                            STRUCTURE_CONTAINER];
            for(let i = 0; i < structureTypes.length; i++){
                if(targets.length == 0){
                    targets = module.exports.getConstructionSiteByStructureType(
                                                        structureTypes[i],
                                                        creep);
                } else{
                    break;
                }
            }

            //If no other construction site was found, find rest.
            if(targets.length == 0){
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            }

            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else{
                roleHarvester.run(creep);
            }
        }
        else {
            roleFunctions.getOptionalSources(creep);
        }
    },

    getConstructionSiteByStructureType:function(type, creep){
        return targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (site) => {
                return site.structureType == type
            }
        });
    }




};

module.exports = roleBuilder;
