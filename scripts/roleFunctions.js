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
        let whatSource = _.random(0,100) % sources.length;
        return sources[whatSource].id;
    },

    getResource:function(creep, source){
        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

};
