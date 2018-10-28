const Listener = require('./Listener.js');

const questionCommand = '?question';
const privateQuestionCommand = '?private-question';
const answeredCommand = '!answered';

module.exports = class MessageListener extends Listener
{
	constructor()
	{
		super('message');
	}

	onMessage(user, userID, channelID, message, event)
	{
		// checks if question
		if(message.indexOf(questionCommand) == 0 && ChannelManager.isAsking(channelID))
		{
			ChannelManager.createQuestionChannel("What is this?", userID);
		}
		if(message.indexOf(privateQuestionCommand) == 0 && ChannelManager.isAsking(channelID))
		{
			ChannelManager.createPrivateQuestionChannel("What is this?", userID);
		}
		else if(message.indexOf(answeredCommand) == 0 
			&& (ChannelManager.isQuestionChannel(channelID)
				|| ChannelManager.isPrivateQuestionChannel(channelID)))
		{
			ChannelManager.answerQuestion(channelID);
		}
		else
		{

		}
	}
}