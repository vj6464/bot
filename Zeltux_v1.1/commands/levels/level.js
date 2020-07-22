const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if(client.config.levelSystem === "off") return;
    message.delete()

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) {
        score = client.getScore.get(message.author.id, message.guild.id)
        let level = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setAuthor(`${client.config.serverName}`,client.user.avatarURL)
            .setTitle(`🎉 Level Info For **${message.author.username}**`)
            .addField(`➡️ Current Level`, `**${score.level}**`, true)
            .addField(`🔢 Total Points`, `**${score.points}**`, true)
            .setFooter(`${message.guild.name} Leveling ➤ Command ran by ${message.author.username}`)
        message.channel.send(level)
    }
    else{
        username = client.users.get(`${user.id}`)
        score = client.getScore.get(user.id, message.guild.id)
        let level = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setAuthor(`${message.guild.name}`,client.user.avatarURL)
            .setTitle(`🎉 Level Info For **${username.username}**`)
            .addField(`➡️ Current Level`, `**${score.level}**`, true)
            .addField(`🔢 Total Points`, `**${score.points}**`, true)
            .setFooter(`${message.guild.name} Leveling ➤ Command ran by ${message.author.username}`)
        message.channel.send(level)
    }
}