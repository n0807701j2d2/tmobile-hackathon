const Discord = require('discord.io');
const auth = require(rootDirectory + '/auth.json');

var bot;

module.exports = class BotManager
{
	static initialize()
	{
		bot = new Discord.Client({
			token: auth.token
		});

		bot.connect();
	}

	static addListener(event, callback)
	{
		bot.on(event, callback);
	}

	static getBot()
	{
		return bot;
	}

	static deinitialize()
	{
		bot.disconnect();
	}
}