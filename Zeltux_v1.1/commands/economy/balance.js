const discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    message.delete()

    let balance = db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if (balance === null) balance = 0;

    const Embed = new discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 	    
		.setDescription(`${message.author} Your balance is ` + balance + `$`)
        .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
		.setColor(client.config.colour)
	message.channel.send(Embed);
}