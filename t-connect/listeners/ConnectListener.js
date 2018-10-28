const Listener = require('./Listener.js');

const customerRole = '505807798232154123';


module.exports = class ConnectListener extends Listener
{
	constructor()
	{
		super('presence');
	}

	onConnect(user, userID, status, game, event)
	{
		if(UserManager.getRoles(userID).length == 0)
		{
			UserManager.giveCustomer(userID);
		}
	}

	onDisconnect(user, userID, status, game, event)
	{
	}
}