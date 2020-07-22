const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    var number = new Discord.RichEmbed()

    number.setColor(client.config.colour)
    number.setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)  
    number.setDescription(`:one: Generating number...`)

    var numberMessage = await message.channel.send(number);

    async function change(num, numberMessage){
        number.setDescription(`${num} Generating number...`)
        var numberMessage = await numberMessage.edit(number); wait(1);
    }
    change(":two:", numberMessage)
    change(":three:", numberMessage)
    change(":four:", numberMessage)
    change(":five:", numberMessage)

    var random = Math.floor(Math.random() * 101); 
    
    number.setColor(client.config.colour)
    number.setDescription(`🔢 Random Number... **${random}**!`)
    number.setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)        

    numberMessage.edit(number)
    

}