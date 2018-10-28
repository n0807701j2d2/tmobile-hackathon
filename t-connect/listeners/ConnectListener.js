const Listener = require('./Listener.js');

module.exports = class ConnectListener extends Listener
{
	constructor()
	{
		super('presence');
	}

	onConnect(user, userID, status, game, event)
	{
	}

	onDisconnect(user, userID, status, game, event)
	{
	}
}