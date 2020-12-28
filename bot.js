const fs = require('fs')
const Discord = require('discord.js')
const { prefix,channelIDs,color} = require('./config.json')
const reactionRoleData = require("./reactionroles.json")
require("dotenv").config({ path: '../.env' })
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Discord.Collection()
module.exports.client = client
module.exports.githubtoken=process.env.githubtoken
module.exports.beatsoghtoken=process.env.beatsoghtoken
const creationsWebhook = new Discord.WebhookClient(process.env.creationswebhookid,process.env.creationswebhooktoken)
const scaleImage = require("./scale")
const sharp = require("sharp")
const request = require("request").defaults({ encoding: null })
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
}




// Bot Turned on Notification
client.once('ready', () => {
	console.log('CraftYourWorld Bot is Online!');
	client.user.setActivity("Crafting Your World...",{type:"CUSTOM_STATUS"})
})


// Image Resizer (AKA) Picasso!
client.on("message", message => {
	
	if (
		!message.content.startsWith(`scale`) &&
		!message.content.startsWith(`image`)
	) return

	if (message.author.bot) return
	
	if (message.reference) scaleAndSend ( message.referencedMessage.attachments.first(), message.channel )
	else inputAttachment = scaleAndSend (message.attachments.first(), message.channel )
	

})

const scaleAndSend = (inputAttachment, channel) => {

	if (inputAttachment==undefined) {
		
		channel.send("There was no attachment on that message.\nUse The Command in the message with an image, or ping the bot in a reply to an image to scale it.")
		return
	}

	const inputAttachmentURL = inputAttachment.url

	request.get(inputAttachmentURL, (_err, _res, body) => {
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
		message.channel.send(`This Server was created and maintained by Nigelrex And TheOtherAnxxity.`);
	}  else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}  
})	
		
// Embedded!	
client.on('message', message => {
	if (message.content === `rules`){
		message.delete()
		
const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**CraftYourWorld Rules**')
	.setAuthor('CraftYourWorld', 'https://imgur.com/i8UVoJq.png')
	.setDescription('Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server')
	.setThumbnail('https://imgur.com/i8UVoJq.png')
	.addFields(
		{ name: '**Rule 1**', value: '\n**Common Sense :** Try Now To Post Your Personal Info Anywhere On This Server! \nThis Might Lead You To Hackers Taking Over Your Personal Information And Threaten You!', inline: false },
		{ name: '**Rule 2**', value: '\n**Language :** Please stick to English so we can understand you.', inline: false },
		{ name: '**Rule 3**', value: '\n**Staff :** Do Not DM Or Friend Request The Staff Members At Any Cost, Unless And Untill We Tell You.\nWhat The Moderators Say The Rules Mean, The Rules Mean.', inline: false },
		{ name: '**Rule 4**', value: '\n**Chat :** No spamming. This Includes Starting Or Continuing Emoji Trains, Message Trains, etc.\nNo Loopholes. These rules Are Not Comprehensive And Are Subject To Common Sense.', inline: false },
		{ name: '**Rule 5**', value: '\n**Social :** Be respectful. This includes no swearing.', inline: false },
		{ name: '**Rule 6**', value: '\n**Channels :** Keep Chat In The Correct Channels, To Avoid Any Misunderstanding Or Frustration/Anger Of Other people On You.', inline: false },
		{ name: '**Rule 7**', value: '\n**NSFW :** NSFW Is Not Allowed. This Includes Messages, Images,Avatars, Usernames, And Custom Status Texts.', inline: false },
		{ name: '**Rule 8**', value: '\n**Advertising :** Advertising On This Server is Strictly Not Allowed, Do Not Advertise Your Youtube Channel And Other Social Media Lead You To A Warn At First And Then Ban, So To Avoid It.', inline: false },
		{ name: '**Rule 9**', value: '\n**Access :** Now once You Read All The Rules You Have To React ✅ To Gain Access To The Rest Of This Server So You Could Explore The possibilities Of Everyone\'s Work!', inline: false }
		)
	.setTimestamp()
    .setFooter(`@CraftYourWorld`)

	message.channel.send({embed}).then(reactionMessage=>{
		reactionMessage.react("✅")
		
	})
	
        const channel = '789811806817878038';
		const messageId = '792641649092198410';
		const MembersRole = messageId.message.member.cache.find(role => role.name === "Members");
		const Members = '✅';
		client.on('messageReactionAdd', async (reaction, user) => {
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;
	
			if (reaction.message.channel.id == channel) {
				if (reaction.message.id ===messageId)
				if (reaction.emoji.name === Members) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(MembersRole);
				}
			} else {
				return;
			}
	
		});
	
		client.on('messageReactionRemove', async (reaction, user) => {
	
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;
	
	
			if (reaction.message.channel.id == channel) {
				if (reaction.message.id ===messageId)
				if (reaction.emoji.name === Members) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(MembersRole);
				}
			} else {
				return;
			}
		});
	}; 
	})
	
	





client.on('message', message => {
	if (message.content === `termsandusage`){
		message.delete()
const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**CraftYourWorld Terms and Usage**')
	.setAuthor('CraftYourWorld', 'https://imgur.com/i8UVoJq.png')
	.setDescription('It is perfectly fine for anyone to use, modify and share our packs within their projects for the betterment of the community.\nHowever, you may only do so if it does not infringe on the following terms and conditions:')
	.setThumbnail('https://imgur.com/i8UVoJq.png')
	.addFields(
		{ name: '**Section 1 - TermsAndUsage**', value: '\n────────────\n\n\n', inline: false },
		{ name: '\n\n**1.1**', value: '\n**You cannot redistribute our packs as they are, without proper modification and/or additions.**', inline: false },
		{ name: '\n**1.2**', value: '\n** You cannot restrict access or sell any pack that includes our packs through donations and/or a paywall.** ', inline: false },
		{ name: '\n**1.3**', value: '\n**You cannot distribute our packs without appropriate credit (refer to Section 2).**', inline: false },
		{ name: '\n**1.4**', value: '\n**You can distribute your pack, as long as your pack includes proper modification and/or additions.**', inline: false },
		{ name: '\n**1.5**', value: '\n**You can distribute your pack with our packs, as long as you have appropriately credited CraftYourWorld (refer to Section 2).** ', inline: false },
		{ name: '\n**1.6**', value: '\n**You can distribute your pack, as long as it is free to use for the community.**\n\n\n', inline: false },
		{ name: '\n\n\n**Section 2 - Credits**', value: '\n────────────', inline: false },
		{ name: '\n\n**2.1**', value: '\n**You must include the below text on all main publishing platforms that you may use. (Minecraft Forum, Planet Minecraft, Minecraft Maps, Curseforge, etc.).**', inline: false },
		{ name: '\n**2.2**', value: '\n**You must create a `credits.txt` within your project that includes the below text.**', inline: false },
		{ name: '\n\n**Credit.txt Format**', value: '```Credits:\n[website Yet To Come]```', inline: false}
		)
	.setTimestamp()
	.setFooter(`@CraftYourWorld`)
	message.channel.send({embed})
};
})






// Community-Creations To Community-Discussion!
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

	if (message.member.nickname==null) name = message.author.username
	else name = message.member.nickname

	creationsWebhook.send(message.content, { username: name, avatarURL: message.author.avatarURL({dynamic:true}) } )

})



// Community Impression!
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.emoji.name=="⭐") {
		const message = reaction.message
		const reactionData = message.reactions.cache.get("⭐")
		if (reactionData.count==5 && !reactionData.users.cache.has(client.user.id)) {
			if (message.member.nickname==null) name = message.author.username
			else name = `${message.member.nickname} (${message.author.username})`
			message.react("⭐")
			const embed = {
				color: 15844367,
				author: {
					name: name,
					icon_url: message.author.avatarURL()
				},
				description: message.content,
				fields: [{
					"name": "Original",
					"value": `[Jump](${message.url})`
				}],
				footer: { text: "#"+message.channel.name }
			}
			if (message.attachments.size!=0) embed.image = { url: message.attachments.entries().next().value[1].attachment }
			client.channels.cache.get("791635796431601715").send({embed:embed})
		}
	}
})






// Join-Leave
client.on('guildMemberAdd', member => 
	client.channels.cache.get('789830758331318273').send(`\n<@${member.id}> joined the server. There Are Now \`${member.guild.memberCount}\` In The Server \nWelcome <@${member.id}> :wave:`))
	
	
client.on('guildMemberRemove', member => 
    client.channels.cache.get('789830758331318273').send(`\n<@${member.id}> left the server. There Are Now \`${member.guild.memberCount}\` In The Server \nWhat Made Them leave? :thinking:`))
			


	client.on("message", message => {
		if (
			message.content.includes("discord.gg") ||
			message.content.includes("discord.com/invite")
		) {
			message.delete().then(message => message.reply("**Don't Send Invite Links!**")).then(response=>response.delete({timeout:15000}))
		}
	})

	client.on("message", message => {
		if (
			message.content.includes("fuck") ||
			message.content.includes("Fuck") ||
			message.content.includes("bitch") ||
			message.content.includes("Bitch") ||
			message.content.includes("Bitching") ||
			message.content.includes("bitching") ||
			message.content.includes("shit") ||
			message.content.includes("Shit") ||
			message.content.includes("ass") ||
			message.content.includes("Ass") ||
			message.content.includes("asshole")||
			message.content.includes("Asshole")||
			message.content.includes("fucking")||
			message.content.includes("Fucking")||
			message.content.includes("f")||
			message.content.includes("F") ||
			message.content.includes("Stinky") ||		
			message.content.includes("stinky")
			) 
			message.delete().then(message => message.reply("**Psst Don't Use Cursed Words!**")).then(response=>response.delete({timeout:5000}))
		
	})










			

client.login('NzgzMjQ2NjUwODg5NDY5OTUz.X8X9SQ.Uz7dPjkEVVV_q00OUJBVv--crOw')
