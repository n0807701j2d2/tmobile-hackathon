const Discord = require('discord.io');
const auth = require(rootDirectory + '/auth.json');

var bot;

module.exports = class BotManager
{
	static initialize(resolve)
	{
		bot = new Discord.Client({
			token: auth.token
		});

		bot.connect();

		bot.on('ready', function() {
			console.log("Discord Bot Connected");
			resolve();
		});
	}

	static getServerID()
	{
		for(var id in bot.servers)
		{
			return id;
		}
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
		console.log("Discord Bot Disconnected");
	}
}