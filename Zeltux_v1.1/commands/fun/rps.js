const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

exports.run = async (client, message, args) => {
    message.delete()

    function embed (title,msg) {
        let emb = new Discord.RichEmbed()
        .setTitle(title)
        .setDescription(msg)
        .setColor(client.config.colour)
        .setFooter(`${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)
        return emb
    }

    let pos = ["rock", "paper", "scissors"]
    let o
    let win
    let n = getRandomInt(3);
    let result = undefined
    result = pos[n]
    const filter = (reaction, user) => {
        return ['🌕', '📄', '✂'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(embed("Rock - Paper - Scissors","Choose an option below")).then((m) => {
    m.react("🌕").then(() => m.react("📄").then(() => m.react("✂")))
    .then(() => {
    m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first()
            n = getRandomInt(3);
            result = undefined
            result = pos[n]
    
            if (reaction.emoji.name === '🌕') {
                //message.reply('you reacted with a rock.');
              o = "rock"
            }
            else if (reaction.emoji.name === '📄'){
                //message.reply('you reacted with paper.');
              o = "paper"
            }
             else if (reaction.emoji.name === '✂'){
                //message.reply('you reacted with scissors.');
               o = "scissors"
             }
               
               if (result === o) win = "draw"
      else if (result === "rock" && o === "paper") win = "win"
      else if (result === "rock" && o === "scissors") win = "loss"
      else if (result === "paper" && o === "rock") win = "loss"
      else if (result === "paper" && o === "scissors") win = "win"
      else if (result === "scissors" && o === "rock") win = "win"
      else if (result === "scissors" && o === "paper") win = "loss"
      m.clearReactions()
      m.edit(embed("Rock - Paper - Scissors","The result is **" + win + "**\nYou chose: **" + o + "**\nThe bot chose: **" + result + "**"))
    }).catch(() => {message.channel.send(embed("Rock - Paper - Scissors","Too Slow!"))} )
    })
    })
    
}