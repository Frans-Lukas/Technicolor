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
    },

    constructExtensions:function(spawn){
        let width = 3;
        let height = 3;
        for(let k = 0; k < 12; k++){
            for(let i = k; i < width; i++){
                for(let j = k; j < height; j++){
                    let x = spawn.pos.x + i;
                    let y = spawn.pos.y + j;
                    let errCode = spawn.room.createConstructionSite(
                                                    x,
                                                    y,
                                                    STRUCTURE_EXTENSION);
                    if(errCode === ERR_FULL ||
                        errCode === ERR_RCL_NOT_ENOUGH){

                        break;
                    }
                }
            }
        }
    },

    constructContainers:function(spawn){
        let pathToController = spawn.room.findPath(spawn.pos,
                                        spawn.room.controller.pos);
        for(let i = 0; i < pathToController.length; i++){
            let errCode = spawn.room.createConstructionSite(
                                            pathToController[i].x,
                                            pathToController[i].y,
                                            STRUCTURE_CONTAINER);

            if(errCode === ERR_FULL ||
                errCode === ERR_RCL_NOT_ENOUGH){

                break;
            }
        }
    }
};
