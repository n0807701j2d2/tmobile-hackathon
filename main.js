rootDirectory = __dirname;

// listeners
ReadyListener = require('./listeners/ReadyListener.js');
MessageListener = require('./listeners/MessageListener.js');

// managers
BotManager = require('./managers/BotManager.js');

BotManager.initialize();