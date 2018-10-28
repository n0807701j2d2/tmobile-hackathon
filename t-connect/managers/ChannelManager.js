const Channel = require(rootDirectory + '/objects/Channel.js');

const askingChannelID = '505814307569795073';
const questionChannelsCategoryID = '505857674647306260';
const privateQuestionChannelsCategoryID = '505866041952305180';

const customer_role_id = '505807798232154123';

const others_public_voice_channel = 116800; // allow
const user_public_voice_channel = 36701184; // allow

const user_private_text_channel = 117824; // allow
const user_private_voice_channel = 36701184; // allow

module.exports = class ChannelManager
{
	static initialize()
	{
		//console.log(ChannelManager.getQuestionChannels());
		ChannelManager.getPrivateQuestionChannels();
	}

	static createQuestionChannel(question, user)
	{
		var prev_count = 0;

		for(var channel of ChannelManager.getPrivateQuestionChannels().concat(ChannelManager.getQuestionChannels()))
		{
			if(channel.name.includes('-vc-' + user))
				prev_count ++;
		}

		prev_count ++;

		// creates the message chat and voice channel
		BotManager.getBot().createChannel({
			serverID: BotManager.getServerID(),
			name: 'question-' + prev_count + '-' + user,
			type: "text",
			parentID: questionChannelsCategoryID
		}, function() {
			BotManager.getBot().createChannel({
				serverID: BotManager.getServerID(),
				name: 'question-' + prev_count + '-vc-' + user,
				type: "voice",
				parentID: questionChannelsCategoryID
			}, function() {
				var textChannel = null;
				var voiceChannel = null;

				for(var channel of ChannelManager.getQuestionChannels())
				{
					if(channel.name == 'question-' + prev_count + '-' + user)
					{
						textChannel = channel;
					}
					if(channel.name == 'question-' + prev_count + '-vc-' + user)
					{
						voiceChannel = channel;
					}
				}

				if(textChannel == null || voiceChannel == null)
					return;

				// deny other users access to public voice
				BotManager.getBot().editChannelPermissions({
					channelID: voiceChannel.id,
					roleID: customer_role_id,
					allow: 0,
					deny: 1024,
					default: 0
				}, function() {
					// allow user access to public voice channel
					BotManager.getBot().editChannelPermissions({
						channelID: voiceChannel.id,
						userID: user,
						allow: 36701184,
						deny: 0,
						default: 0
					}, function() {
						BotManager.getBot().editChannelInfo({
							channelID: textChannel.id,
							topic: question,
						}, function() {
							BotManager.getBot().moveUserTo({
								serverID: BotManager.getServerID(),
								userID: user,
								channelID: voiceChannel.id,
							});
						});
					});
				});
			});
		});		
	}

	static createPrivateQuestionChannel(question, user)
	{
		var prev_count = 0;

		for(var channel of ChannelManager.getPrivateQuestionChannels().concat(ChannelManager.getQuestionChannels()))
		{
			if(channel.name.includes('-vc-' + user))
				prev_count ++;
		}

		prev_count ++;

		// creates the message chat and voice channel
		BotManager.getBot().createChannel({
			serverID: BotManager.getServerID(),
			name: 'question-' + prev_count + '-' + user,
			type: "text",
			parentID: privateQuestionChannelsCategoryID
		}, function() {
			BotManager.getBot().createChannel({
				serverID: BotManager.getServerID(),
				name: 'question-' + prev_count + '-vc-' + user,
				type: "voice",
				parentID: privateQuestionChannelsCategoryID
			}, function() {
				var textChannel = null;
				var voiceChannel = null;

				for(var channel of ChannelManager.getPrivateQuestionChannels())
				{
					if(channel.name == 'question-' + prev_count + '-' + user)
					{
						textChannel = channel;
					}
					if(channel.name == 'question-' + prev_count + '-vc-' + user)
					{
						voiceChannel = channel;
					}
				}

				if(textChannel == null || voiceChannel == null)
					return;

				// deny other users access to public voice
				BotManager.getBot().editChannelPermissions({
					channelID: textChannel.id,
					userID: user,
					allow: 117824,
					deny: 0,
					default: 0
				}, function() {
					// allow user access to public voice channel
					BotManager.getBot().editChannelPermissions({
						channelID: voiceChannel.id,
						userID: user,
						allow: 36701184,
						deny: 0,
						default: 0
					}, function() {
						BotManager.getBot().editChannelInfo({
							channelID: textChannel.id,
							topic: question,
						}, function() {
							BotManager.getBot().moveUserTo({
								serverID: BotManager.getServerID(),
								userID: user,
								channelID: voiceChannel.id,
							});
						});
					});
				});
			});
		});	
	}

	static deleteChannel()
	{

	}

	static isAsking(id)
	{
		if(ChannelManager.getAskingChannel().id == id)
		{
			return true;
		}
		return false;
	}

	static isQuestion(id)
	{
		for(var channel of ChannelManager.getQuestionChannels())
		{
			if(channel.id == id)
				return true;
		}
		return false;
	}

	static isPrivateQuestion(id)
	{
		for(var channel of ChannelManager.getPrivateQuestionChannels())
		{
			if(channel.id == id)
				return true;
		}
		return false;
	}

	static getAskingChannel()
	{
		var askingChannel;

		var channels = BotManager.getBot().channels;

		for(var channelID in channels)
		{
			if(channels[channelID].id == askingChannelID)
			{
				askingChannel = new Channel(channels[channelID]);
			}
		}
		return askingChannel;
	}

	static getQuestionChannels()
	{
		var questionChannels = [];

		var channels = BotManager.getBot().channels;

		for(var channelID in channels)
		{
			if(channels[channelID].parent_id == questionChannelsCategoryID)
			{
				questionChannels.push(new Channel(channels[channelID]));
			}
		}
		return questionChannels;
	}

	static getPrivateQuestionChannels()
	{
		var privateQuestionChannels = [];

		var channels = BotManager.getBot().channels;

		for(var channelID in channels)
		{
			if(channels[channelID].parent_id == privateQuestionChannelsCategoryID)
			{
				privateQuestionChannels.push(new Channel(channels[channelID]));
			}
		}
		return privateQuestionChannels;
	}
}