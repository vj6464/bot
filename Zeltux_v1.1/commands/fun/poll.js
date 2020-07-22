const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    const invalidPoll = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please Enter A Valid Poll Topic!")
        .setDescription(`Usage - \`${client.config.prefix}poll <topic>\``)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)  

    let poll = args.join(" ");
    if(!poll) {const fail = await message.channel.send(invalidPoll); wait(3000); fail.delete(); return}
    
    let pollEmbed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`📊 Community Poll`)
        .setDescription(`**${poll}**`)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)  
 
    message.channel.send(pollEmbed).then(function (message) {message.react(`👍`).then(() => {message.react(`👎`)})})

    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Poll`)
      .setDescription(`**User** - ${message.author} (${message.author.id})\n**Poll** - ${poll}\n**Time** - ${message.createdAt}`) 
    client.logChannel.send(log)


}