const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {

    var embedColor = client.config.colour
    
    if(!client.checkPermissions(client.config.permissions.warn)) return

    const cantFindUser = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid user")
      .setDescription(`Usage - \`${client.config.prefix}warn <user> <reason>\``)
      .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`)
    const includeReason = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid reason")
      .setDescription(`Usage - \`${client.config.prefix}warn <user> <reason>\``)
      .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`)
    
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ') 

    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
    if(!reason) {const fail = await message.channel.send(includeReason); wait(3000); fail.delete(); return}

    var DM = new Discord.RichEmbed()
        .setColor(embedColor)
        .setTitle(`**${client.config.serverName}** - 📢 You have been warned! 📢`)
        .setDescription(`**Staff Member** - ${message.author}\n**Reason** - ${reason}`)  
    user.send(DM);

    var warnSuccessfulEmbed = new Discord.RichEmbed() 
        .setColor(embedColor)
        .setTitle('📢 User Has Been Warned Warned! 📢')
        .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}\n**Reason** - ${reason}`) 
        .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`) 

    message.channel.send(warnSuccessfulEmbed); 
    message.delete(); 

    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Warn`)
      .setDescription(`**User** - ${user} (${user.id})\n**Staff Member** - ${message.author} (${message.author.id})\n**Reason** - ${reason}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)

}