const Discord = require("discord.js");
const got = require('got');

exports.run = (client, message, args) => {
    message.delete()
    
    const embed = new Discord.RichEmbed();
    got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
        let content = JSON.parse(response.body)
        let permalink = content[0].data.children[0].data.permalink
        let memeUrl = `https://reddit.com${permalink}`
        let memeImage = content[0].data.children[0].data.url
        let memeTitle = content[0].data.children[0].data.title
        let memeUpvotes = content[0].data.children[0].data.ups
        let memeDownvotes = content[0].data.children[0].data.downs
        let memeNumComments = content[0].data.children[0].data.num_comments
        embed.setTitle(`${memeTitle}`)
        embed.setDescription(`[View thread](${memeUrl})`)
        embed.setImage(memeImage)
        embed.setColor(client.config.colour)
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}\n${message.guild.name} Fun & Games ➤ Command ran by ${message.author.username}`)
        message.channel.send(embed)
    }).catch(console.error);
}
