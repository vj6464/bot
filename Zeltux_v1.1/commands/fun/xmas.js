const Discord = require("discord.js");

exports.run = (client, message, args) => {

    let today = new Date();
    let xmas = new Date(today.getFullYear(), 11, 24);
    if (today.getMonth() == 11 && today.getDate() > 24) {
    xmas.setFullYear(xmas.getFullYear() + 1);
    }
    let one_day = 1000 * 60 * 60 * 24;
    let daysleft = Math.ceil((xmas.getTime() - today.getTime()) / (one_day));
    let days = daysleft+1

    let embed = new Discord.RichEmbed()
        .setTitle(`🎅  **${days}** days left till Christmas!`)
        .setColor(client.config.colour)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)
    message.channel.send(embed)
}