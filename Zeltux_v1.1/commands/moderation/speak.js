const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    if(!client.checkPermissions(client.config.permissions.speak)) return

    var sayMessage = args.join(" ")
        
    message.channel.send(sayMessage)
      
    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Say`)
        .setDescription(`**User** - ${message.author} (${message.author.id})\n**Channel** - ${message.channel}\n**Message** - ${sayMessage}`)
        .setTimestamp(message.createdAt) 
    client.logChannel.send(log)

}