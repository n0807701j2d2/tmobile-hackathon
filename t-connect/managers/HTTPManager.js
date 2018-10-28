const request = require('request');

const url = "https://dw86fwjspk.execute-api.us-west-2.amazonaws.com/dev/vmjytdmkux-dev/myapi/myapi"; // your url

var session;

module.exports = class HTTPManager
{
	static initialize(callback)
	{
		//sets up a variable to store the session
		session = request.jar();

		callback();

		// in order to call the static get method, use
		// HTTPManager.get("/path", function() { 
		// 	//callback 
		// });

		// same thing with post, except use HTTPManager.post
	}

	/*
	*	Here create static functions that can be called by the program
	*	to send data to the server. e.g. If you want to send online users,
	*	create a function like this:
	*	static sendOnlineUsers(onlineUsers, callback)
	*	{
	*		HTTPManager.post("/users/sendusers", function(body) {
	*			callback(body);
	*		});		
	*	}
	*/


	// path is something like: /users/get
	static get(path, callback)
	{
		if(!timeout)
		{
			request.get({
				url: url + path,
				json: true,
				jar: session
			}, function(error, response, body) {
				if(error)
				{
					//throw error;
					console.log("Connection Refused, Main Server Down");
					timeout = true;
					process.exit();
				}
				if(body == "NOT LOGGED IN")
				{
					console.log("Login Failed");
					timeout = true;
					process.exit();
				}
				callback(response);
			});
		}
	}

	// path is something like: /users/write
	static post(path, body, callback)
	{
		request.post({
			url: url + path,
			json: true,
			jar: session,
			body: body
		}, function(error, response, body) {
			if(error)
			{
				throw error;
			}
			callback(response);
		});
	}

	static getURL()
	{
		return url;
	}
}