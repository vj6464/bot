const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

function getID (role) {
    if (!role.includes('<@&') && !role.includes('>')) return undefined
    role = role.replace('<@&', '')
    role = role.replace('>', '')
    return role
  }

exports.run = async (client, message, args) => {
    message.delete()
    
    if(!client.checkPermissions(client.config.permissions.removerole)) return

    const invalidRole = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid role!")
        .setDescription(`Usage - \`${client.config.prefix}removerole <user> <role>\``)
        .setFooter(`${message.guild.name} Utilities ➤ Command ran by ${message.author.username}`)

    const invalidUser = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid user!")
        .setDescription(`Usage - \`${client.config.prefix}removerole <user> <role>\``)
        .setFooter(`${message.guild.name} Utilities ➤ Command ran by ${message.author.username}`)

    if (!args[1]){const fail = await message.channel.send(invalidRole); wait(3000); fail.delete(); return}

    let role = args[1]

    try{role = getID(role)}
    catch{const fail = await message.channel.send(invalidRole); wait(3000); fail.delete(); return}
    if (role === undefined) {const fail = await message.channel.send(invalidRole); wait(3000); fail.delete(); return}
    role = message.guild.roles.find(r=>r.id===role)
    if (role === undefined){const fail = await message.channel.send(invalidRole); wait(3000); fail.delete(); return}
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    if(!member) return message.channel.send(invalidUser)

    try{
        member.removeRole(role)
    }
    catch{
        const noPerms = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle("🚫 Missing Permission!")
            .setDescription(`My role is below the role your trying to add ${member} to. Move my role higher to use this.`)
            .setFooter(`${message.guild.name} Utilities ➤ Command ran by ${message.author.username}`)
        const fail = await message.channel.send(noPerms); wait(3000); fail.delete(); return        
    }

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Add Role`)
        .setDescription(`**User** - ${member} (${member.id})\n**Staff Member** - - ${message.author} (${message.author.id})\n**Channel** - ${message.channel}\n**Role** - ${role}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)


}