guildm = Discord.Guild.
client.channels.get("473599345128636448").edit({
    name: 'tt'
})



if (!ver === "test1234") return msg.reply("Nope!")
members.addRole(vrole,"Verified").then((member) => {
    // Successmessage
    msg.channel.send(":white_check_mark: " + member.displayName + " Erfolgreich verifiziert!").then(msg => {
        msg.delete(4000)
    }).catch(console.error)
    client.channels.get("440537536809402368").send('', new Discord.RichEmbed().setColor(0x3498db).setDescription("Der Nutzer " + member.displayName + " ist jetzt ein Admin.").addBlankField().addField("Von:", msg.author.username).setTitle("Nutzer befördert!"))
}).catch(() => {
     // Failmessage
    msg.channel.send("Fehler");
});