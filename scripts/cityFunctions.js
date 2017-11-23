/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('cityFunctions');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    constructRoad:function(creep){
        let sources = creep.room.find(FIND_SOURCES_ACTIVE);
        let ctrler = creep.room.controller;

        let spawns = creep.room.find(FIND_STRUCTURES, {
            filter: function(object){
                return object.structureType == STRUCTURE_SPAWN;
            }
        });
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            for(let x = 0; x < spawns.length; x++){
                let spawn = spawns[x];
                let ret = PathFinder.search(spawn.pos, source.pos);
                for (let j = 0; j < ret.path.length; j++) {
                    let pos = ret.path[j];
                    creep.room.createConstructionSite(pos, STRUCTURE_ROAD);
                    //console.log(pos.x + ', ' + pos.y);
                }
                ret = PathFinder.search(spawn.pos, ctrler.pos);
                for (let j = 0; j < ret.path.length; j++) {
                    let pos = ret.path[j];
                    creep.room.createConstructionSite(pos, STRUCTURE_ROAD);
                    //console.log(pos.x + ', ' + pos.y);
                }
            }
        }


    }
};
