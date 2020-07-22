const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    var cantFindUser = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid user")
        .setDescription(`Usage - \`${client.config.prefix}hug <user>\``)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) {var fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}

    var gif = client.config.hug[Math.floor(Math.random()*client.config.hug.length)]

    let slap = new Discord.RichEmbed()
        .setDescription(`🤗 **${message.author} hugged ${user}**`)
        .setImage(gif)
        .setColor(client.config.colour)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)

    message.channel.send(slap)
}
