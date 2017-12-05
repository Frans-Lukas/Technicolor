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

        let totalEnergy = Game.spawns['Spawn1'].room.energyAvailable;

        let body = module.exports.getBodyFromName('harvester',
                            Game.spawns['Spawn1'].room.energyAvailable);

        let harvesterCost = module.exports.getBodyCost( body );
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

    getBodyFromName:function(name, maxResource){
        var body = [];
        switch(name){
          case 'harvester':
            maxResource = maxResource - 50;
            body.push(MOVE);
            while(maxResource >= 100){
                body.push(WORK);
                maxResource = maxResource - 100;
            }
            break;
          case 'builder':
            body = [WORK,CARRY,MOVE];
            break;
          case 'upgrader':
            maxResource = maxResource - 150;
            body = [WORK, CARRY, MOVE];
            while(maxResource >= 150){
                body.push(WORK);
                body.push(CARRY);
                maxResource = maxResource - 150;
            }

            break;
          case 'transporter':
            maxResource = maxResource - 50;
            body = [MOVE];
            while(maxResource >= 50){
                body.push(CARRY);
                maxResource = maxResource - 50;
            }
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
                numUnitsToSpawn = 3;
            }
            if(name == 'repairer'){
                numUnitsToSpawn = 2;
            }
            if(name === 'transporter'){
                numUnitsToSpawn = 4;
            }
            if(numUnits.length < numUnitsToSpawn){
                var newName = name + Game.time;
                let body = module.exports.getBodyFromName(name,
                                   Game.spawns['Spawn1'].room.energyAvailable);
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
    },

    updateCreeps:function(){
        //TODO: upgrade creeps that have low body stats.
    }

};
