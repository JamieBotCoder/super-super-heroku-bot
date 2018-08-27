const { RichEmbed } = require('discord.js')

const COLORS = {
    red: 0xe74c3c,
    green : 0x2ecc71,
    blue : 0x3498db,
}


module.exports = {

    /**
     * 
     * @param {Discord.Channel} chan Channel where message!
     * @param {string} cont
     * @param {string} title
     * 
     */


    error(chan, cont, title) {
        var message
        var emb = new RichEmbed()
            .setColor(COLORS.red)
            .setDescription(cont)
        if (title) {
            emb.setTitle(title)
        }
        chan.send('', emb).then((m) => {
            message = m
        } )
        return message
    },

    roleinfo(chan, cont, title) {
        var message
        var emb = new RichEmbed()
            .setColor(COLORS.green)
            .setDescription(cont)
        if (title) {
            emb.setTitle(title)
        }
        chan.send('', emb).then((m) => {
            message = m
        } )
        return message
    },


    info(chan, cont, title) {
        var message
        var emb = new RichEmbed()
            .setColor(COLORS.blue)
            .setDescription(cont)
        if (title) {
            emb.setTitle(title)
        }
        chan.send('', emb).then((m) => {
            message = m
        } )
        return message
    }
}