var roleFunctions = require('roleFunctions');

var roleConstructor = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var extensions = creep.room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_EXTENSION }
        });

        if(extensions.length < 4){
            var spawn = Game.spawns['Spawn1'];
            for(var i = -3; i < 3; i++){
                for(var j = -3; j < 3; j++){

                    if(creep.room.createConstructionSite(spawn.pos.x + i, spawn.pos.y + j, STRUCTURE_EXTENSION) != ERR_INVALID_TARGET){
                        break;
                    }
                }
            }
        }
    }




};

module.exports = roleConstructor;
