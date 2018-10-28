module.exports = class Channel
{
	constructor(channel)
	{
		this.id = channel.id;
		this.name = channel.name;
		this.type = channel.type; // 0 - text, 2 - voice

		for(var userID in channel.permissions.user)
		{
			this.user = userID;
		}
		this.question = channel.topic;

		this.permissions = channel.permissions;

		/*console.log(this.name);
		console.log(this.type);
		console.log(this.permissions);*/
	}
}