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

    getOptionalSources:function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.energy > 0;
            }
        });

        if(targets.length == 0){
            module.exports.mine(creep);
        } else {
            module.exports.getResource(creep, targets[0]);
        }

    },

    getResource:function(creep, source){
        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

};
