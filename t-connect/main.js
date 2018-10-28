rootDirectory = __dirname;
closing = false;



// managers
HTTPManager = require('./managers/HTTPManager.js');
BotManager = require('./managers/BotManager.js');
ChannelManager = require('./managers/ChannelManager.js');
UserManager = require('./managers/UserManager.js');
MessageManager = require('./managers/MessageManager.js');

// listeners
messageListener = new (require('./listeners/MessageListener.js'))();
connectListener = new (require('./listeners/ConnectListener.js'))();
reactionListener = new (require('./listeners/ReactionListener.js'))();

HTTPManager.initialize(function() {
	BotManager.initialize(function() {	
		ChannelManager.initialize();
		UserManager.initialize();
		//MessageManager.initialize();

		BotManager.addListener(connectListener.event, connectListener.onConnect);
		BotManager.addListener(connectListener.event, connectListener.onDisconnect);
		BotManager.addListener(messageListener.event, messageListener.onMessage);
		BotManager.addListener(reactionListener.event, reactionListener.onReaction);
		BotManager.addListener(reactionListener.event, reactionListener.onUnreaction);

		function exit()
		{
			if(!closing)
			{
				closing = true;
				//HTTPManager.deinitialize();
				BotManager.deinitialize();
			}
		}

		process.on('exit', exit);
		process.on('SIGINT', exit);
		process.on('SIGUSR1', exit);
		process.on('SIGUSR2', exit);
	});
});