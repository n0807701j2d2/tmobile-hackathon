const Listener = require('./Listener.js');

module.exports = class ReactionListener extends Listener
{
	constructor()
	{
		super('any');
	}

	onReaction(event)
	{
		if(event.t == 'MESSAGE_REACTION_ADD')
		{
			var user = event.d.user_id;
			var channel_id = event.d.channel_id;
			var message_id = event.d.message_id;
			var emoji = event.d.emoji;
		}
	}

	onUnreaction(event)
	{
		if(event.t == 'MESSAGE_REACTION_REMOVE')
		{
			var user = event.d.user_id;
			var channel_id = event.d.channel_id;
			var message_id = event.d.message_id;
			var emoji = event.d.emoji;
		}
	}
}