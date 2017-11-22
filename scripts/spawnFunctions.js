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
        if(Game.time % 20 == 0){
            module.exports.clearMemory();
        }

        var roles = ['harvester', 'builder', 'upgrader'];
        var numUnitsToSpawn = 2;

        module.exports.spawnCreeps(roles, numUnitsToSpawn);


        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

    },

    spawnCreeps:function(roles, numUnitsToSpawn){

        for(var i = 0; i < roles.length; i++){
            var name = roles[i];
            var numUnits = _.filter(Game.creeps, (creep) => creep.memory.role == name);
            if(name == 'builder'){
                numUnitsToSpawn = 3;
            }
            if(numUnits.length < numUnitsToSpawn){
                var newName = name + Game.time;

                var body = module.exports.getBodyFromName(name);
                Game.spawns['Spawn1'].spawnCreep(body, newName,
                    {memory: {role: name, source:Game.spawns['Spawn1']}});
                if(Game.spawns['Spawn1'].spawning){
                    console.log('Spawning new' + name + ': ' + newName);
                }
            }

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
            break;
        }
        return body;
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