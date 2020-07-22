const Discord = require("discord.js");

function wait(ms){
  var start = new Date().getTime()
  var end = start
  while(end < start + ms) {end = new Date().getTime();}
}

exports.run = async (client, message, args) => {
    message.delete()

    if(!client.checkPermissions(client.config.permissions.mute)) return

    const cantFindUser = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid user")
      .setDescription(`Usage - \`${client.config.prefix}mute <user> <reason>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 
    const includeReason = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid reason")
      .setDescription(`Usage - \`${client.config.prefix}mute <user> <reason>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 
    const staffMember = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 You can't ban another staff member!")
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var reason = args.join(" ").slice(22);

    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
    if(!reason) {const fail = await message.channel.send(includeReason); wait(3000); fail.delete(); return}
    if(!message.member.roles.has(client.staffRole.id)) {const fail = await message.channel.send(noPerms); wait(3000); fail.delete(); return}    
    if(user.roles.has(client.staffRole.id)) {const fail = await message.channel.send(staffMember); wait(3000); fail.delete(); return}

    const muted = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🤐 User Has been muted! 🤐`)
      .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}\n**Reason** - ${reason}`) 
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)     

    const DM = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`**${message.guild.name}** - 🤐 You have been muted! 🤐`)
      .setDescription(`**Staff Member** - ${message.author}\n**Reason** - ${reason}`)  

    user.send(DM)

    message.channel.send(muted)
    
    user.addRole(client.mutedRole)
    user.removeRole(client.defaultRole) 

    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Mute`)
      .setDescription(`**User** - ${user} (${user.id})\n**Staff Member** - ${message.author} (${message.author.id})\n**Reason** - ${reason}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)


}