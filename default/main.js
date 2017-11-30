var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransporter = require('role.transporter');

var spawnFunctions = require('spawnFunctions');
var cityFunctions = require('cityFunctions');
var roleFunctions = require('roleFunctions');

var roleError = false;

module.exports.loop = function () {

    if(Game.time % 20 == 0){
        spawnFunctions.buildUnits();
    }
    if(Game.time % 5 == 0){
        cityFunctions.constructExtensions(Game.spawns['Spawn1']);
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(roleError){
            let role = name.replace(/[0-9]/g, '');
            creep.memory.role = role;
        }

        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        } else if(creep.memory.role === 'builder'){
            roleBuilder.run(creep);
        } else if(creep.memory.role === 'repairer'){
            roleRepairer.run(creep);
        } else if(creep.memory.role === 'transporter'){
            roleTransporter.run(creep);
        }
        //roleFunctions.buildRoad(creep);
    }
}
