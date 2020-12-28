module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '789811806817878038';
        const MembersRole = message.guild.roles.cache.find(role => role.name === "Members");
        const messageId = '792641649092198410';
        const Members = '✅';
 
        let embed = new Discord.MessageEmbed()
            .setColor('colour')
            .setTitle('React To This Message!')
            .setDescription('React To This MEssage To Gain Access To The Rest of The Server'
                + `${Members} For Access`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(Members);
 
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
    }
 
}