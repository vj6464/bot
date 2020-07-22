const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

exports.run = (client, message, args) => {
    if(client.config.levelSystem === "off") return;
    message.delete()

    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id)

    const embed = new Discord.RichEmbed()
        .setTitle(`📊 ${message.guild.name} Leaderboard`)
        .setAuthor(client.config.serverName, client.user.avatarURL)
        .setDescription("Top **10** highest scorers!")
        .setColor(client.config.colour)
        .setFooter(`${message.guild.name} Leveling ➤ Command ran by ${message.author.username}`)

    let numbers = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","1️⃣0️⃣"]
    let count = 0
    for(const data of top10) {
        try{
            embed.addField(`${numbers[count]} **${client.users.get(data.user).tag}**`, `Level ${data.level} (${data.points} points)`, true)
            count++
        }
        catch{
            let test = null
        }
    }

    message.channel.send(embed);

}