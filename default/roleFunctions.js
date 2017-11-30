module.exports = {

    mine:function(creep){
        let source = Game.getObjectById(creep.memory.source);
        if(!source || source.energy == 0){
            //console.log(source.id);
            creep.memory.source = module.exports.getMineSource(creep);
        }
        if(creep.harvest(source) == ERR_NOT_IN_RANGE){

            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    getMineSource:function(creep){
        if(!creep.room.memory.sources){
            creep.room.memory.sources = creep.room.find(FIND_SOURCES_ACTIVE);
        }
        let sources = creep.room.memory.sources;
        //randomly choose a source to mine.
        let whatSource = _.random(0,100) % sources.length;
        return sources[whatSource].id;
    },

    numCreepsAroundTarget:function(target){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){

            }
        }
    },

    getOptionalSources:function(creep){

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if(targets.length == 0){
            module.exports.mine(creep);
        } else {
            module.exports.getResource(creep, targets[0]);
        }


    },

    getDroppedResource:function(creep){
        if(!creep.memory.droppedEnergyID){
            module.exports.giveDroppedEnergyIDToCreep(creep);
        } else{
            var resource = Game.getObjectById(creep.memory.droppedEnergyID);
            if(!resource || resource.energy == 0){
                module.exports.giveDroppedEnergyIDToCreep(creep);
            }
        }
        if(creep.pickup(resource) == ERR_NOT_IN_RANGE){
            creep.moveTo(resource,
                {visualizePathStyle: {stroke: '#ffaa00'}});
        }

        return 1;
    },

    giveDroppedEnergyIDToCreep:function(creep){
        let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        if(droppedEnergy.length == 0){
            return 0;
        }
        creep.memory.droppedEnergyID = droppedEnergy[0].id;
    },

    getResource:function(creep, source){
        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    buildRoad:function(creep){
        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
    }

};
