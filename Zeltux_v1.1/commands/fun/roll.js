const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    var roll = new Discord.RichEmbed()

    roll.setColor(client.config.colour)
    roll.setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)  
    roll.setDescription(`🎲 :one: Rolling die...`)

    var rollMessage = await message.channel.send(roll);

    async function change(num, rollMessage){
        roll.setDescription(`🎲 ${num} Rolling die...`)
        var rollMessage = await rollMessage.edit(roll); wait(1);
    }
    change(":two:", rollMessage)
    change(":three:", rollMessage)
    change(":four:", rollMessage)
    change(":five:", rollMessage)
    change(":six:", rollMessage)

    var rand = [1,2,3,4,5,6]

    var rollNumber = rand[Math.floor(Math.random()*rand.length)]

    roll.setColor(client.config.colour)
    roll.setDescription(`🎲 ${message.author.username} rolled a **${rollNumber}**!`)

    rollMessage.edit(roll)

}