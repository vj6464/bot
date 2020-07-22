const db = require('quick.db')
const Discord = require('discord.js')

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

const talkedRecently = new Set();

exports.run = async (client, message, args,) => {
    message.delete()

    let temp = `${args[0]}`
    let type = temp.toLowerCase()

    let types = ['engineer', 'constructor', 'cook', 'technician', 'police', 'doctor']

    if (args[0] == null) {
        let Embed = new Discord.RichEmbed()
            .setTitle('⚒️ Work command help')
            .setDescription(`Please mention a job to do! You can choose from: \n• Engineer \n• Constructor \n• Cook \n• Technician \n• Police \n• Doctor\n\nUsage - \`${client.config.prefix}work <jobType>\``)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        const fail = await message.channel.send(Embed); wait(6000); fail.delete(); return
    }        
    
    if (talkedRecently.has(message.author.id)) {
        let Embed = new Discord.RichEmbed()
            .setTitle('🚫 Please wait')
            .setDescription(`You can only use this command once every **${client.config.workCooldown/60000} mins**.`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        const fail = await message.channel.send(Embed); wait(6000); fail.delete(); return
    } else {

    if (type == 'engineer') {
        let amount = Math.floor(Math.random() * 400) + 1; 
        let Embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
            .setDescription(`${message.author} worked as an engineer and got payed ${amount}$`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if(type == 'constructor') {
        let amount = Math.floor(Math.random() * 400) + 1; 
        let Embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
            .setDescription(`${message.author} worked as a constructor and got payed ${amount}$`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if(type == 'cook') {
        let amount = Math.floor(Math.random() * 400) + 1; 
        let Embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
            .setDescription(`${message.author} worked as a cook and got payed ${amount}$`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if(type == 'technician') {
        let amount = Math.floor(Math.random() * 400) + 1; 
        let Embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
            .setDescription(`${message.author} worked as a technician and got payed ${amount}$`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if(type == 'police') {
        let amount = Math.floor(Math.random() * 400) + 1; 
        let Embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
            .setDescription(`${message.author} worked as a police officer and got payed ${amount}$`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if(type == 'doctor') {
        let amount = Math.floor(Math.random() * 400) + 1; 
        let Embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
            .setDescription(`${message.author} worked as a doctor and got payed ${amount}$`)
            .setColor(client.config.colour)
            .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)
        message.channel.send(Embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }

    if(types.includes(type)){
    talkedRecently.add(message.author.id)
    setTimeout(() => {
      talkedRecently.delete(message.author.id)
    }, client.config.workCooldown)}

    }

}

