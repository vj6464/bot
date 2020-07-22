const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    if(!client.checkPermissions(client.config.permissions.unmute)) return

    const cantFindUser = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid user")
      .setDescription(`Usage - \`${client.config.prefix}unmute <user>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)
    const staffMember = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 You can't unmute another staff member!")
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
    if(user.roles.has(client.staffRole.id)) {const fail = await message.channel.send(staffMember); wait(3000); fail.delete(); return}

    const unmuted = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🔊 User Has been un-muted! 🔊`)
      .setDescription(`**User** - ${user}\n$**Staff Member** - ${message.author}`)    
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 

    const DM = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`**${message.guild.name}** - 🔊 You have been un-muted! 🔊`)
      .setDescription(`**Staff Member** - ${message.author}`)  

    user.send(DM)

    message.channel.send(unmuted)
    
    user.addRole(client.defaultRole)
    user.removeRole(client.mutedRole)  

    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Un-Mute`)
      .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)


}