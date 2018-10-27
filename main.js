rootDirectory = __dirname;

// listeners
readyListener = new (require('./listeners/ReadyListener.js'))();
messageListener = new (require('./listeners/MessageListener.js'))();

// managers
HTTPManager = require('./managers/HTTPManager.js');
BotManager = require('./managers/BotManager.js');

BotManager.initialize();
BotManager.addListener(readyListener.event, readyListener.onReady);
BotManager.addListener(messageListener.event, messageListener.onMessage);