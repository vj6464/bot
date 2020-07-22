const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    const invalidBall = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid future to tell!")
        .setDescription(`Usage - \`${client.config.prefix}8ball <future>\``)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)

    const future = args.join(" ");
    if (!future) {const fail = await message.channel.send(invalidBall); wait(3000); fail.delete(); return}

    var rand = ["is not going to","is not likely to","might","probably will","will definitely"]
    var response = rand[Math.floor(Math.random()*rand.length)]

    message.channel.send(new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setDescription(`🔮 **${future}** ${response} happen.`)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)
        )

}