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
		MessageManager.initialize();

		BotManager.addListener(connectListener.event, connectListener.onConnect);
		BotManager.addListener(connectListener.event, connectListener.onDisconnect);
		BotManager.addListener(messageListener.event, messageListener.onMessage);
		BotManager.addListener(reactionListener.event, reactionListener.onReaction);
		BotManager.addListener(reactionListener.event, reactionListener.onUnreaction);

		var body = JSON.stringify(BotManager.getBot().servers['505194659602235402'].members);
		HTTPManager.post('/', body, function alert(data) {
			result = JSON.parse(data.body.input);
			for(var n in result){
				console.log({
					Id_no: result[n].id,
					Name: result[n].nick,
					Number: result[n].color,
					Frustration: "50"
				});
			}
		});

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