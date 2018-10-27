rootDirectory = __dirname;
closing = false;

// listeners
readyListener = new (require('./listeners/ReadyListener.js'))();
messageListener = new (require('./listeners/MessageListener.js'))();

// managers
HTTPManager = require('./managers/HTTPManager.js');
BotManager = require('./managers/BotManager.js');

BotManager.initialize();
BotManager.addListener(readyListener.event, readyListener.onReady);
BotManager.addListener(messageListener.event, messageListener.onMessage);

function exit()
{
	if(!closing)
	{
		closing = true;
		BotManager.deinitialize();
	}
}

process.on('exit', exit);
process.on('SIGINT', exit);
process.on('SIGUSR1', exit);
process.on('SIGUSR2', exit);
process.on('uncaughtException', exit);