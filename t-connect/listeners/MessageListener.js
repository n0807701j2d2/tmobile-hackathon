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
		var messageID = event.d.id;

		// checks if question
		if(message.indexOf(questionCommand) == 0 && ChannelManager.isAsking(channelID))
		{
			var question = message.substr(questionCommand.length + 1);

			MessageManager.deleteMessage(channelID, messageID);
			if(question.length > 1)
			{
				ChannelManager.createQuestionChannel(question, userID);
			}
			else
			{
				//send error message
			}
		}
		if(message.indexOf(privateQuestionCommand) == 0 && ChannelManager.isAsking(channelID))
		{
			var question = message.substr(privateQuestionCommand.length + 1);

			MessageManager.deleteMessage(channelID, messageID);
			if(question.length > 1)
			{
				ChannelManager.createPrivateQuestionChannel(question, userID);
			}
			else
			{

			}
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