const Listener = require('./Listener.js');

module.exports = class MessageListener extends Listener
{
	constructor()
	{
		super('message');
	}

	onMessage(user, userID, channelID, message, evt)
	{
		
	}
}