const Discord = require('discord.js')
const { prefix,channelIDs,color} = require('./config.json')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Discord.Collection()
const scaleImage = require("./scale")
const sharp = require("sharp")
const request = require("request").defaults({ encoding: null })
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}


client.once('ready', () => {
	console.log('CraftYourWorld Bot is Online!');
	client.user.setActivity("Crafting Your World...",{type:"CUSTOM_STATUS"})
})



client.on("message", message => {
	
	if (
		!message.content.startsWith(`<@${client.user.id}>`) &&
		!message.content.startsWith(`<@!${client.user.id}>`)
	) return

	if (message.author.bot) return
	
	if (message.reference) scaleAndSend ( message.referencedMessage.attachments.first(), message.channel )
	else inputAttachment = scaleAndSend (message.attachments.first(), message.channel )
	

})

const scaleAndSend = (inputAttachment, channel) => {

	if (inputAttachment==undefined) {
		
		channel.send("There was no attachment on that message.\nPing me in a message with an image, or ping the bot in a reply to an image to scale it.")
		return
	}

	const inputAttachmentURL = inputAttachment.url

	request.get(inputAttachmentURL, (err, res, body) => {
		scaleImage(body)
			.then(buffer => {
				const outputAttachment = new Discord.MessageAttachment(buffer, "response.png")
				channel.send(outputAttachment)
			})
			.catch(error => {
				channel.send(`There was an error trying to do that:\n\`${error}\``)
				// console.error(error)
			})
	})
}










client.on('message', message => {
	if (message.content === `${prefix}creators`) {
		message.channel.send('This Server was created and maintained by Nigelrex And TheOtherAnxxity.');
	}  else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}  else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}; 
})	
		
	
client.on('message', message => {
	if (message.content === `${prefix}craftyourworld`){
const CraftYourWorldEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('CraftYourWorld')
	.setURL('https://discord.js.org/')
	.setAuthor('CraftYourWorld Bot', 'https://imgur.com/i8UVoJq.png')
	.setDescription('CraftYourWorld Website (Click Here)')
	.setThumbnail('https://imgur.com/i8UVoJq.png')
	.addFields(
		{ name: 'Resourcepacks', value: 'Link' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Datapacks', value: 'Link', inline: true },
	)
	.setTimestamp()
    .setFooter(`@${message.author.username}`)

message.channel.send(CraftYourWorldEmbed);
	};
})


client.on("message", message => {

	if (
		message.channel.id!=channelIDs.communityCreations || // the message is not in community creations
		message.author.id==client.user.id || // the message was sent my the bot
		message.attachments.array().length>0 || // there is an attachment
		message.content.includes("http://") || // there is a link
		message.content.includes("https://") || // there is a link
		message.author.id=="634776327299399721" // beatso sent the message

	) return
	
	message.delete()
	message.reply("your message was deleted because it didn't have an attachment, image or link. Please use <#756241898439704618> for talking about creations posted in this channel.").then(response=>response.delete({timeout:15000}))

	if (message.member.nickname==null) name = message.author.username
	else name = message.member.nickname

	creationsWebhook.send(message.content, { username: name, avatarURL: message.author.avatarURL({dynamic:true}) } )

})




client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if  (!reaction.message.guild) return

	if (reaction.message.channel.id == channelIDs.getRoles) {

		const name = reactionRoleData.map(x=>x.name).indexOf(reaction.emoji.name)
		const id = reactionRoleData.map(x=>x.id).indexOf(reaction.emoji.id)

		if ( name != -1 || id != -1 ) {
			if ( name != -1 ) var data = reactionRoleData[name]
			else var data = reactionRoleData[id]
			if ( reaction.message.id == data.messageID ) await reaction.message.guild.members.cache.get(user.id).roles.add(data.role)
		}

	}

	if (reaction.emoji.name=="⭐") {
		const message = reaction.message
		const reactionData = message.reactions.cache.get("⭐")
		if (reactionData.count==5 && !reactionData.users.cache.has(client.user.id)) {
			message.react("⭐")
			const embed = {
				color: 15844367,
				author: {
					name: message.author.username,
					icon_url: message.author.avatarURL(),
					url: message.url
				},
				description: message.content,
				footer: { text: "#"+message.channel.name }
			}
			if (message.attachments.size!=0) embed.image = { url: message.attachments.entries().next().value[1].attachment }
			client.channels.cache.get("791635796431601715").send({embed:embed})
		}
	}
})

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch()
	if (reaction.partial) await reaction.fetch()
	if  (!reaction.message.guild) return

	if (reaction.message.channel.id == channelIDs.getRoles) {

		const name = reactionRoleData.map(x=>x.name).indexOf(reaction.emoji.name)
		const id = reactionRoleData.map(x=>x.id).indexOf(reaction.emoji.id)

		if ( name != -1 || id != -1 ) {
			if ( name != -1 ) var data = reactionRoleData[name]
			else var data = reactionRoleData[id]
			if ( reaction.message.id == data.messageID ) await reaction.message.guild.members.cache.get(user.id).roles.remove(data.role)
		}

	}

})



client.on("message", message => {

	if (
		message.channel.id!=channelIDs.communityCreations || // the message is not in community creations
		message.author.id==client.user.id || // the message was sent my the bot
		message.attachments.array().length>0 || // there is an attachment
		message.content.includes("http://") || // there is a link
		message.content.includes("https://") || // there is a link
		message.author.id=="738032578820309072" // Nigelrex sent the message

	) return
	
	message.delete()
	message.reply("your message was deleted because it didn't have an attachment, image or link. Please use <#789838168308318219> for talking about creations posted in this channel.").then(response=>response.delete({timeout:15000}))

	if (message.member.nickname===null) name = message.author.username
	else name = message.member.nickname

	creationsWebhook.send(message.content, { username: name, avatarURL: message.author.avatarURL({dynamic:true}) } )

})

client.on('guildMemberAdd', member => 
    client.channels.cache.get('789830758331318273').send(`<@${member.id}> joined the server. There Are Now \`${member.guild.memberCount}\` In The Server`))
client.on('guildMemberRemove', member => 
    client.channels.cache.get('789830758331318273').send(`<@${member.id}> left the server. There Are Now \`${member.guild.memberCount}\` In The Server`))




client.login('Token');

