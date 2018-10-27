const Discord = require('discord.io');
const auth = require(rootDirectory + '/auth.json');

var bot;

module.exports = class BotManager
{
	static initialize()
	{
		bot = new Discord.Client({
			token: auth.token,
			autorun: true
		});
	}

	static addListener(event, callback)
	{
		bot.on(event, callback);
	}

	static sendMessage(channel, message)
	{
		bot.sendMessage({
			to: channel,
			message: message
		});
	}
}