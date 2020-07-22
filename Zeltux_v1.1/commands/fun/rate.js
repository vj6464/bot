const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    const invalidRate = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please Enter A Valid Item To Rate!")
        .setDescription(`Usage - \`${client.config.prefix}rate <item>\``)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)  
    
    const item = args.join(" ")
    if (!item) {const fail = await message.channel.send(invalidRate); wait(3000); fail.delete(); return}

    var rand = [1,2,3,4,5,6,7,8,9,10]

    var rate = rand[Math.floor(Math.random()*rand.length)]

    message.channel.send(new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setDescription(`⭐ **${item}** gets a **${rate}** from me!`)
        .setFooter(`Sent by ${message.author.username}`)
        )

}