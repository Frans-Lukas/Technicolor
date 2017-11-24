var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var spawnFunctions = require('spawnFunctions');
var cityFunctions = require('cityFunctions');
var roleError = false;

module.exports.loop = function () {

    if(Game.time % 20 == 0){
        spawnFunctions.buildUnits();
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(roleError){
            let role = name.replace(/[0-9]/g, '');
            creep.memory.role = role;
        }

        if(Game.time % 500 == 0){
            cityFunctions.constructRoad(creep);
        }

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
    }
}