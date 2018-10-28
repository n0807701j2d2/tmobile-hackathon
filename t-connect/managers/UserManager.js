const customerRole = '505807798232154123';

module.exports = class UserManager
{
	static initialize()
	{

	}

	static giveCustomer(userID)
	{
		BotManager.getBot().addToRole({
			serverID: BotManager.getServerID(),
			roleID: customerRole,
			userID: userID
		});
	}

	static isCustomer(userID)
	{
		return BotManager.getBot().servers['505194659602235402'].members[userID].roles.includes(customerRole);
	}

	static getRoles(userID)
	{
		return BotManager.getBot().servers['505194659602235402'].members[userID].roles;
	}
}