var roleFunctions = require('roleFunctions');
var roleHarvester = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            //creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            //creep.say('🚧 build');
        }

        if(creep.memory.building) {
            //let target = Game.getObjectById()
            if(!creep.memory.targetID || !Game.getObjectById(creep.memory.targetID)){
                let targets = module.exports.getConstructionSites(creep);
                if(targets.length > 0){
                    creep.memory.targetID = targets[0].id;
                }
            }
            let target = Game.getObjectById(creep.memory.targetID);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else{
                roleHarvester.run(creep);
            }
        }
        else {
            roleFunctions.getOptionalSources(creep);
        }
    },

    getConstructionSites:function(creep){
        //Prioritize order, first is highest priority.
        var targets = [];

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
        return targets;
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
