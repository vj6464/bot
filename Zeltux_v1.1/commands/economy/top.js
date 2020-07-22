const Discord = require('discord.js')
const db = require('quick.db')
const sortby = require('lodash.sortby')

function startsWith(db, str, options = { sort: undefined }) {
    var arr = [];
    for (var el of db.all()) {
        if (el.ID === null || !el.ID.startsWith(str)) continue;
        var { ID, data } = el;
        arr.push({
            ID: el.ID,
            data: el.data
        });
    }
    if (typeof options.sort === 'string') {
        if (options.sort.startsWith('.')) options.sort = options.sort.slice(1);
        options.sort = options.sort.split('.');
        arr = sortby(arr, options.sort);
        arr = arr.reverse();
    }
    return arr;
}

exports.run = async (client, message, args) => {
    message.delete()

    let money = startsWith(db, `money_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = client.users.get(money[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${money[i].data}$\n`
    }

    const Embed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} - Balance Top`)
        .setDescription(content)
        .setColor(client.config.colour)
        .setFooter(`${message.guild.name} Economy System ➤ Command ran by ${message.author.username}`)

    message.channel.send(Embed)




}