const ms = require("ms");
const Discord = require("discord.js");
function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    if(!client.checkPermissions(client.config.permissions.tempmute)) return

    const cantFindUser = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid user")
      .setDescription(`Usage - \`${client.config.prefix}tempmute <user> <time> <reason>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 
    const includeValid = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid time and reason")
      .setDescription(`Usage - \`${client.config.prefix}tempmute <user> <time> <reason>\``)
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 
    const staffMember = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 You can't mute another staff member!")
      .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            
    let mutetime = args[1]
    if(!mutetime) return message.channel.send(includeValid)

    var reason = args.splice(2).join(' ')

    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
    if(!reason) {const fail = await message.channel.send(includeValid); wait(3000); fail.delete(); return}
    if(user.roles.has(client.staffRole.id)) {const fail = await message.channel.send(staffMember); wait(3000); fail.delete(); return}

    user.addRole(client.mutedRole)
    user.removeRole(client.defaultRole)
    
    const muted = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🤐 User Has been temp-muted! 🤐`)
        .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}\n**Time** - ${ms(ms(mutetime))}\n**Reason** -${reason}`)    
        .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`)  

    const DM = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`**${message.guild.name}** - 🤐 You have been temp-muted! 🤐`)
        .setDescription(`**Staff Member** - ${message.author}\n**Time** - ${ms(ms(mutetime))}\n**Reason** -${reason}`)  

    user.send(DM)

    message.channel.send(muted)

    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Temp-Mute`)
      .setDescription(`**User** - ${user} (${user.id})\n**Staff Member** - ${message.author} (${message.author.id})\n**Time** -${ms(ms(mutetime))}\n**Reason** -${reason}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)



    setTimeout(function(){
          user.addRole(client.defaultRole)
          user.removeRole(client.mutedRole)

        const DM = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`**${client.config.serverName}** - 🔊 You have been un-muted! 🔊`)
            .setDescription(`**Staff Member** - ${message.author}`)  
        user.send(DM)

        const log = new Discord.RichEmbed()
          .setColor(client.config.colour)
          .setTitle(`🗒 Un-Temp-Mute`)
          .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}`)
          .setTimestamp(message.createdAt)
        client.logChannel.send(log)

    }, ms(mutetime))

}