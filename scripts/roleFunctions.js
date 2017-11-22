module.exports = {

    mine:function(creep){
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);

        module.exports.getResource(creep, sources[0]);
    },

    getResource:function(creep, source){
      if(creep.harvest(source) == ERR_NOT_IN_RANGE){
          creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    },

    findBestResource:function(creep){
      var spawn = Game.spawns['Spawn1'];
      var extensions = module.exports.roomFindSpecificStructure(STRUCTURE_EXTENSION);
      var containers = module.exports.roomFindSpecificStructure(STRUCTURE_STORAGE);
      if(containers.length > 0){
        return module.exports.findStorageWithMostEnergy(creep, containers);
      } else if(extensions.length > 0){
        return module.exports.findStorageWithMostEnergy(creep, extensions);
      } else{
        return spawn;
      }
    },

    roomFindSpecificStructure:function(creep, structure){
      return creep.room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: structure}
      });
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
      return containers.get(bestIndex);
    }

};
