const Discord = require("discord.js");
const ms = require("ms")

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    const giveaways = require(client.dir + '/custom_modules/giveaways.js')
    message.delete()

    let argsEmb = new Discord.RichEmbed()
    .setTitle('🚫 Please enter valid arguments!')
    .setColor(client.config.colour)
    .setDescription(`Usage - \`${client.config.prefix}gcreate <time> <winners amount> <prize>\``)
    .setFooter(`${message.guild.name} Giveaways ➤ Command ran by ${message.author.username}`)
    
    if (args.length < 3)  {const fail = await message.channel.send(argsEmb); wait(3000); fail.delete(); return}

    else {

    giveaways.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnersCount: parseInt(args[1])
        })

    }
} 