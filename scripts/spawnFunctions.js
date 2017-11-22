/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.buildUnit');
 * mod.thing == 'a thing'; // true
 */

var spawnFunctions = {

    buildUnits:function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var roles = ['harvester', 'builder', 'upgrader'];
        var numUnitsToSpawn = 2;
        for(var i = 0; i < roles.length; i++){
            var name = roles[i];
            var numUnits = _.filter(Game.creeps, (creep) => creep.memory.role == name);
            if(name == 'builder'){
                numUnitsToSpawn = 4;
            }
            if(numUnits.length < numUnitsToSpawn){
                var newName = name + Game.time;
                console.log('Spawning new' + name + ': ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: name}});
            }

        }
    }

};


module.exports = spawnFunctions;
