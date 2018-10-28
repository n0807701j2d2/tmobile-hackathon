module.exports = class MessageManager
{
	static initialize()
	{
		BotManager.getBot().getMessages({
			channelID: ChannelManager.getAskingChannel().id,
			limit: 1000
		}, function(err, messages) {
			for(var message of messages)
			{
				var messageID = message.id;
				MessageManager.deleteMessage(ChannelManager.getAskingChannel().id, messageID);
			}
			MessageManager.sendAskingMessage();
		});
	}

	static sendFinishingMessage(channelID)
	{
		var message = "**This discussion has been marked complete by the Customer Care Representative!**\n"
		message += "Please indicate how your experience was and how helpful the discussion was using the reactions.";

		BotManager.getBot().sendMessage({
			to: channelID,
			message: message
		}, function() {
			BotManager.getBot().getMessages({
				channelID: channelID,
				limit: 3
			}, function(err, message) {
				var messageID = message[0].id;
				//onsole.log(message[2].reactions[0].emoji);

/*
				BotManager.getBot().addReaction({
					channelID: channelID,
					messageID: messageID,
					reaction: '1⃣'
				}, function(err, res) {
					//if(err) throw err;
					BotManager.getBot().addReaction({
						channelID: channelID,
						messageID: messageID,
						reaction: '2⃣'
					}, function(err, res) {
						//if(err) throw err;
						BotManager.getBot().addReaction({
							channelID: channelID,
							messageID: messageID,
							reaction: '3⃣'
						}, function(err, res) {/*
							//if(err) throw err;
							BotManager.getBot().addReaction({
								channelID: channelID,
								messageID: messageID,
								reaction: '4️⃣'
							}, function(err, res) {
								if(err) throw err;
								BotManager.getBot().addReaction({
									channelID: channelID,
									messageID: messageID,
									reaction: '5️⃣'
								}, function(err, res) {
									if(err) throw err;
								});
							});
						});
					});*
				});*/
			});
		});
	}

	static sendAskingMessage()
	{
		var message = "**Greetings T-Mobile Customer!**\n";
		message += "Ask any general questions you have here using this format:\n```";
		message += "?question < your question here >```\n";
		message += "Any confidential questions you have should be asked using this format:\n```";
		message += "?private-question < your question here >```";
		message += "You will be linked to a different channel and a Customer Care Representative will assist you.";

		BotManager.getBot().sendMessage({
			to: ChannelManager.getAskingChannel().id,
			message: message
		});
	}

	static deleteMessage(channelID, messageID)
	{
		BotManager.getBot().deleteMessage({
			channelID: channelID,
			messageID: messageID
		});
	}

	static sendCreationMessage(channel, user, question)
	{
		var message = "<@&" + '505614996689125377' + "> \n";
		message += "<@" + user + "> has asked a question:\n```";
		message += question + " ```";
		message += "More info on the user: " + HTTPManager.getURL() + "/?user=" + user;

		BotManager.getBot().sendMessage({
			to: channel,
			message: message
		});
	}

	static sendIntroductionMessage(channel, user)
	{
		var message = "<@" + user + ">\n";
		message += "Your Question has been forwarded to this channel: <#" + channel + ">\n";
		message += "A Customer Care Representative will help you soon.\n";
		message += "Click the link, it will delete in 10 seconds...";

		BotManager.getBot().sendMessage({
			to: ChannelManager.getAskingChannel().id,
			message: message
		}, function() {
			BotManager.getBot().getMessages({
				channelID: ChannelManager.getAskingChannel().id,
				limit: 1
			}, function(err, message) {
				setTimeout(function() {
					MessageManager.deleteMessage(ChannelManager.getAskingChannel().id, message[0].id);
				}, 10 * 1000);
			});
		});
/*
		var messageID = '0';

		setTimeout(function() {
			MessageManager.deleteMessage(channel, '0');
		});*/
	}
}