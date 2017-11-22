module.exports = {

    mine:function(creep){
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        var source = sources[0];
        if(creep.harvest(source) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    getResource:function(creep, source){
        console.log(creep.withdraw(source, RESOURCE_ENERGY));
        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    findBestResource:function(creep){
        var source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
        var soruces = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(object){
                return object.energy > 0 && object.structureType != STRUCTURE_SPAWN;
            }
        });
        if(sources.length > 0 ){
            return sources[0];
        } else{
            return undefined;
        }
    },

    findStorageWithMostEnergy:function(containers){
      var mostEnergy = 0;
      var index = 0;
      var bestIndex = 0;
      for (var container in containers) {
        index++;
        if (container.energy > 0 && container.energy > mostEnergy) {
            mostEnergy = container.energy;
            bestIndex = index;
        }
      }
      return containers[bestIndex];
    }

};
