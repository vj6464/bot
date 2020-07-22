const ms = require('ms');
const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
  message.delete()
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock', 'lift', 'off'];
  
  if(!client.checkPermissions(client.config.permissions.lockdown)) return

  const noTimeframe = new Discord.RichEmbed()
    .setColor(client.config.colour)
    .setTitle(`🚫 You must set a duration for the lockdown in either hours, minutes or seconds!`)
    .setDescription(`Usage - \`${client.config.prefix}lockdown <time h/m/s> \``)
    .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 

  const lockDownReleased = new Discord.RichEmbed()
    .setColor(client.config.colour)
    .setTitle(`✅ Lockdown lifted.`)  
    .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 

  if (!time) return message.channel.send(noTimeframe)

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send(lockDownReleased);
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {

        const locked = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`🔒 Channel locked down for ${ms(ms(time), { long:true })}`)  
            .setFooter(`${message.guild.name} Moderation ➤ Command ran by ${message.author.username}`) 

        message.channel.send(locked).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send(lockDownReleased)).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};