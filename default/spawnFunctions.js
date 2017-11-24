/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.buildUnit');
 * mod.thing == 'a thing'; // true
 */

module.exports = {



    buildUnits:function(){
        module.exports.clearMemory();
        var roles = ['harvester', 'builder', 'upgrader', 'repairer'];
        var numUnitsToSpawn = 2;

        if(Game.spawns['Spawn1'].energy >= 300){
            module.exports.spawnCreeps(roles, numUnitsToSpawn);
        }

    },


    getBodyFromName:function(name){
        var body;
        switch(name){
          case 'harvester':
            body = [WORK,WORK,CARRY,MOVE];
            break;
          case 'builder':
            body = [WORK,CARRY,MOVE];
            break;
          case 'upgrader':
            body = [WORK,CARRY,MOVE,MOVE];
            break;
          default:
            body = [WORK,CARRY,MOVE];
            break;
        }
        return body;
    },

    spawnCreeps:function(roles, numUnitsToSpawn){
        for(var i = 0; i < roles.length; i++){
            var name = roles[i];
            var numUnits = _.filter(Game.creeps, (creep) => creep.memory.role == name);
            if(name == 'builder'){
                numUnitsToSpawn = 3;
            }
            if(name == 'harvester'){
                numUnitsToSpawn = 4;
            }
            if(name == 'upgrader'){
                numUnitsToSpawn = 1;
            }
            if(name == 'repairer'){
                numUnitsToSpawn = 2;
            }
            if(numUnits.length < numUnitsToSpawn){
                var newName = name + Game.time;

                var body = module.exports.getBodyFromName(name);
                Game.spawns['Spawn1'].spawnCreep(body, newName,
                    {memory: {role: name}});

                console.log('Spawning new' + name + ': ' + newName);
                break;
            }
        }
    },

    clearMemory:function(){
        //console.log('Spawning new');
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

};
