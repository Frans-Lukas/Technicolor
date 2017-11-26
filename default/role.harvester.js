var roleFunctions = require('roleFunctions');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        roleFunctions.mine(creep);
	}


};

module.exports = roleHarvester;
