const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.delete()
    
    var rand = ["Heads","Tails"]

    var flip = rand[Math.floor(Math.random()*rand.length)]

    message.channel.send(new Discord.RichEmbed()
        .setDescription(`🔅 ${message.author.username}, You got **${flip}**!`)
        .setColor(client.config.colour)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)
    )

} 