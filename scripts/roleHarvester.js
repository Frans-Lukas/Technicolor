var roleFunctions = require('roleFunctions');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy <= 0) {
	        console.log('test');
	        roleFunctions.mine(creep);
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1']) == ERR_NOT_IN_RANGE){
                creep.moveTO(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleHarvester;
