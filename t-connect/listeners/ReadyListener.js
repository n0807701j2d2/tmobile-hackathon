const Listener = require('./Listener.js');

module.exports = class MessageListener extends Listener
{
	constructor()
	{
		super('ready');
	}

	onReady(evt)
	{
		
	}
}