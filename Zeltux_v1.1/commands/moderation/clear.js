const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    wait(10)

    if(!client.checkPermissions(client.config.permissions.clear)) return

    var user = message.mentions.users.first(); 

    var amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])

    const noAmount = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please specify an amount of messages to clear")
        .setDescription(`Usage - \`${client.config.prefix}clear <amount> [user]\``)
        .setFooter(`Due to limitations by Discord, this must be below 100\n${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)

    if (!amount){const fail = await message.channel.send(noAmount); wait(3000); fail.delete(); return} 
    if (amount > 99){const fail = await message.channel.send(noAmount); wait(3000); fail.delete(); return} 
    
    let tempAmount = amount
    
    message.channel.fetchMessages({limit: tempAmount,
    }).then((messages) => {if (user) {const filterBy = user ? user.id : bot.user.id
        messages = messages.filter(m => m.author.id === filterBy)
        .array().slice(0, tempAmount);}
        
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack))})
        
        const m = await message.channel.send(new Discord.RichEmbed()
            .setDescription(`♻ Cleared **${amount}** messages.`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)  )
        wait(3000)
        m.delete()

        const log = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`🗒 Clear`)
            .setDescription(`**User** - ${message.author}\n**Channel** - ${message.channel}\n**Amount** - ${tempAmount}\n**Sent By** - ${user}`)
            .setTimestamp(message.createdAt)
        client.logChannel.send(log) 

}
