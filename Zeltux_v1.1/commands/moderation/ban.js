const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    if(!client.checkPermissions(client.config.permissions.ban)) return  

    const cantFindUser = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid user")
      .setDescription(`Usage - \`${client.config.prefix}ban <user> <reason>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)  

    const includeReason = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid reason")
      .setDescription(`Usage - \`${client.config.prefix}ban <user> <reason>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)  

    const staffMember = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 You can't ban another staff member!")
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)  

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var reason = args.join(" ").slice(22);

    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
    if(!reason) {const fail = await message.channel.send(includeReason); wait(3000); fail.delete(); return}
    if(user.roles.has(client.staffRole.id)) {const fail = await message.channel.send(staffMember); wait(3000); fail.delete(); return}
    
    const banned = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`😮 User has been banned! 😮`)
      .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}\n**Reason** - ${reason}`)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)      

    const DM = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`**${message.guild.name}** - 😮 You have been banned! 😮`)
      .setDescription(`**Staff Member** - ${message.author}\n**Reason** - ${reason}`)

    message.channel.send(banned)

    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Ban`)
      .setDescription(`**User** - ${user} (${user.id})\n**Staff Member** - ${message.author} (${message.author.id})\n**Reason** - ${reason}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)

    const test = await user.send(DM)
    wait(3000)

    message.guild.member(user).ban(reason)

}
