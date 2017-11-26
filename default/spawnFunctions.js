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
        var roles = ['harvester',
                    'transporter',
                    'builder',
                    'upgrader',
                    'repairer'];
        var numUnitsToSpawn = 2;

        let totalEnergy = module.exports.getTotalEnergy(Game.spawns['Spawn1']);
        let harvesterCost = module.exports.getBodyCost(
            module.exports.getBodyFromName('harvester')
        );
        if(totalEnergy >= harvesterCost){
            module.exports.spawnCreeps(roles, numUnitsToSpawn);
        }

    },

    getTotalEnergy:function(spawn){
        let extensions = spawn.room.find(FIND_STRUCTURES, {
            filter: (s) =>{ return s.structureType === STRUCTURE_EXTENSION }
        });
        let totalEnergy = 0;
        for(let i = 0; i < extensions.length; i++){
            totalEnergy += extensions[i].energy;
        }
        totalEnergy += spawn.energy;
        return totalEnergy;
    },

    getBodyCost:function(body){
        let cost = 0;
        for (var i = 0; i < body.length; i++) {
            cost += BODYPART_COST[body[i]];
        }
        return cost;
    },

    getBodyFromName:function(name){
        var body;
        switch(name){
          case 'harvester':
            body = [WORK,WORK,WORK,MOVE];
            break;
          case 'builder':
            body = [WORK,CARRY,MOVE];
            break;
          case 'upgrader':
            body = [WORK,CARRY,MOVE,MOVE];
            break;
          case 'transporter':
            body = [CARRY,CARRY,CARRY,MOVE,MOVE];
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
                numUnitsToSpawn = 2;
            }
            if(name == 'upgrader'){
                numUnitsToSpawn = 1;
            }
            if(name == 'repairer'){
                numUnitsToSpawn = 2;
            }
            if(name === 'transporter'){
                numUnitsToSpawn = 4;
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
