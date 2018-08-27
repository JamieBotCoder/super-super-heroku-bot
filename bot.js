const Discord = require('discord.js')
const fs = require('fs')
const Embeds = require('./embed')

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

var client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}...`)
    client.user.setActivity("mit Version 0.0.16 Alpha")
})

var cmdmap = {
    say: cmd_say,
    test: cmd_test,
    credits: cmd_cre,
    thelp: cmd_thelp,
    code: generatePassword,
    ping: cmd_ping,
    hallo: cmd_hallo,
}

function cmd_say(msg, args) {
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    msg.channel.send(args.join(' '))
  }
    else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

    }

}
function cmd_ping(msg,args) {
    msg.channel.send("Pong")

}
function cmd_ping(msg,args) {
    msg.channel.send("Hallo")

}

function cmd_test(msg, args)     {
    var hallo = config.hallo
    console.log(hallo)
    
}

function cmd_cre(msg, args) {
    Embeds.info(msg.channel, 'Creator: hallo1142#2847', 'Credits')
    
}

function cmd_thelp(msg, args) {

msg.channel.send('', new Discord.RichEmbed().setColor(0x3498db).setTitle("Hilfe").setDescription("Alle Befehle in der Übersicht!").addField("", "**test**",true))

}

function generatePassword(msg, args) {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
        
    }
    msg.channel.send('', new Discord.RichEmbed().setColor(0xBDBDBD).setDescription(retVal).setTitle("Tägliches Passwort").setFooter("für " + msg.author.username)).then(msg => {
        msg.delete(3000)
    })} 


    


client.on('message', (msg) => {

    var cont = msg.content.toLowerCase(),
        author = msg.member,
        chan = msg.channel,
        guild = msg.guild
    
    
    if(author) {
        if (author.id != client.user.id && cont.startsWith(config.prefix)) {

        // :say hello world!
        var invoke = cont.split(' ')[0].substr(config.prefix.length)
            args   = cont.split(' ').slice(1)
        
        if (invoke in cmdmap) {
            cmdmap[invoke](msg, args)
        }

    }  
//kick
    }
    if (msg.content.startsWith(config.prefix + "kick")) {
        if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
        msg.author.lastMessage.delete()
        if(msg.member.hasPermission("KICK_MEMBERS")) {
            var member= msg.mentions.members.first();
            if (member) {
                if (member.hasPermission("KICK_MEMBERS")) return msg.channel.send(":x: Dieser Spieler darf nicht gekickt werden!")
                member.kick().then((member) => {
                    // Successmessage
                    msg.channel.send(":white_check_mark: " + member.displayName + " wurde gekickt!").then(msg => {
                        msg.delete(4000)
                    }).catch(console.error)
                    client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer:").addField("Art: ", "Kick").addField("Von: ", msg.author.username))                                      
                }).catch(() => {
                     // Failmessage
                    msg.channel.send(":x: Dieser Spieler darf nicht gekickt werden!");
                })
            
                

        }
    }
    else {
        msg.channel.send(":x: Keine Rechte :x:").then(np => {
            np.delete("4000")
        })

    }

    }
//ban
    if (msg.content.startsWith(config.prefix + "ban")) {
        if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
        msg.author.lastMessage.delete()
        if(msg.member.hasPermission("BAN_MEMBERS")) {
            var member= msg.mentions.members.first();
            if (member) {
                if (member.hasPermission("BAN_MEMBERS")) return msg.channel.send(":x: Dieser Spieler darf nicht gebannt werden!")
                member.ban().then((member) => {
                    // Successmessage
                    msg.channel.send(":white_check_mark: " + member.displayName + " wurde gebannt!!").then(msg => {
                        msg.delete(4000)
                    }).catch(console.error)
                    client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer:").addField("Art: ", "Ban").addField("Von: ", msg.author.username))
                }).catch(() => {
                     // Failmessage
                    msg.channel.send(":x: Dieser Spieler darf nicht gebannt werden!");
                });

        }

    }
    else {
        msg.channel.send(":x: Keine Rechte :x:").then(np => {
            np.delete("4000")
        })

    }

    }
//mute
    if (msg.content.startsWith(config.prefix + "mute")) {
        if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
        msg.author.lastMessage.delete()
        var mrole = guild.roles.find(r => r.id == MROLE)
        if(msg.member.hasPermission("MANAGE_MESSAGES")) {
            var member= msg.mentions.members.first();
            if (member) {
                if (member.hasPermission("KICK_MEMBERS")) return msg.channel.send(":x: Dieser Spieler darf nicht gemuted werden!")
                member.addRole(mrole, "Mute").then((member) => {
                    // Successmessage
                    msg.channel.send(":white_check_mark: " + member.displayName + " wurde gemuted!").then(msg => {
                        msg.delete(4000)
                    }).catch(console.error)
                    client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer:").addField("Art: ", "Mute").addField("Von: ", msg.author.username))
                }).catch(() => {
                     // Failmessage
                    msg.channel.send(":x: Dieser Spieler darf nicht gemuted werden!");
                });


        }
    }
    else {
        msg.channel.send(":x: Keine Rechte :x:").then(np => {
            np.delete("4000")
        })

    }

    }

//unmute
if (msg.content.startsWith(config.prefix + "unmute")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    var mrole = guild.roles.find(r => r.id == MROLE)
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
        var member= msg.mentions.members.first();
        if (member) {
            member.addRole(mrole, "Mute").then((member) => {
                // Successmessage
                msg.channel.send(":white_check_mark: " + member.displayName + " wurde entmuted!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)
                client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer:").addField("Art: ", "Un-Mute").addField("Von: ", msg.author.username))
            }).catch(() => {
                 // Failmessage
                msg.channel.send(":x: Dieser Spieler darf nicht gemuted werden!");
            });


    }
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}

}

if (msg.content.startsWith(config.prefix + "help")) {
    msg.channel.send("", new Discord.RichEmbed().setColor(0x3498db).setTitle("Hilfe").addField("kick", "Kicke jemanden", true).addField("ban", "Banne jemanden", true).addField("mute/unmute", "Mute/Unmute jemanden", true).addField("say", "Sage etwas", true).addField("credits", "Siehe die Credits", true).addField("clear", "Löscht den Chat-Verlauf", true).addField("pin", "Pinne eine Nachricht an!", true).addField("an", "Erstelle eine Ankündigung", true).addField("vote", "Erstelle eine Umfrage", true).addField("cmute/unmute", "Channel-Mute(Nutzer muss im Channel sein)", true).addField("warn", "Verwarne einen Nutzer", true).addField("hallo", "Der Bot sagt hallo", true).addField("ping", "Pong",true)).catch(console.error)
    msg.author.lastMessage.delete()

}


if (msg.content.startsWith(config.prefix + "clear")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.fetchMessages().then((list) => {
                // Successmessage
                msg.channel.bulkDelete(list, true)
                msg.channel.send(":white_check_mark: Nachrichten gelöscht!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)
                client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(msg.channel.name).setTitle("Channel: ").addField("Aktion:" , "Nachrichten gelöscht!").addField("Von: ", msg.author.username))
            }).catch(() => {
                 // Failmessage
                msg.channel.send("Fehler");
            });


    
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}

if (msg.content.startsWith(config.prefix + "an")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("ADMINISTRATOR")) {
            var texta = args
                // Successmessage
                msg.channel.send(":white_check_mark: Erfolgreich!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)
                client.channels.get("481573508795596821").send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(texta.join(" ")).setTitle("Ankündigung ").setFooter("von " + msg.author.username))
                
            
            
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}



if (msg.content.startsWith(config.prefix + "sinfo")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("MANAGE_GUILD")) {
        let memb = msg.mentions.members.first()
        if (memb) {
            msg.channel.overwritePermissions(msg.author,{
                SEND_MESSAGES: false
              })
        }
        

    
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}


if (msg.content.startsWith(config.prefix + "pin")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
        let pin = args
        if (pin) {
            msg.channel.send(pin.join(" ")).then(mesg => {
                mesg.pin()

            })


        }

    
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}

if (msg.content.startsWith(config.prefix + "vote")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("ADMINISTRATOR")) {
            let texta = args
            if (texta) {
                // Successmessage
                msg.channel.send(":white_check_mark: Erfolgreich!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)
                client.channels.get("481573508795596821").send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(texta.join(" ")).setTitle("Ankündigung ")).then(vote => {
                    vote.react("👍")
                    vote.react("👎")
                })
            }
            
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}

if (msg.content.toLowerCase().startsWith(config.prefix + "cmute")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("MUTE_MEMBERS")) {
        var member= msg.mentions.members.first();
        if (!member) return msg.channel.send("Nutzer nicht gefunden!"); { 
            member.setMute(true).then((member) => {
                // Successmessage
                msg.channel.send(":white_check_mark: " + member.displayName + " ist nun Stumm!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)
                client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer").addField("Art: ", "Channel-Mute").addField("Von: ", msg.author.username))
            }).catch(() => {
                 // Failmessage
                msg.channel.send("Fehler");
                
            });


    }
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}

if (msg.content.startsWith(config.prefix + "cunmute")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.hasPermission("MUTE_MEMBERS")) {
        var member = msg.mentions.members.first();
        if (!member) return msg.channel.send("Nutzer nicht gefunden!"); { 
            member.setMute(false).then((member) => {
                // Successmessage
                msg.channel.send(":white_check_mark: " + member.displayName + " ist nun nicht mehr Stumm!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)
                client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer").addField("Art: ", "Channel-Unmute").addField("Von: ", msg.author.username))
            }).catch(() => {
                 // Failmessage
                msg.channel.send("Fehler");
                
            });


    }
}
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}


if (msg.content.startsWith(config.prefix + "leave")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    if(msg.member.id === "436808258850914305"){
        guild.leave()

            }
    else {
    
    msg.channel.send(":x: Keine Rechte :x:")
    
    }

         
}



const w1 = "483644517489311754"
const w2 = "483644520135917598"

if (msg.content.startsWith(config.prefix + "warn")) {
    if(msg.guild === null) return msg.channel.send(":x: Dieser Befehl kann hier nicht ausgeführt werden").catch(console.error)
    msg.author.lastMessage.delete()
    var wa1 = guild.roles.find(r => r.id == w1)
    var wa2 = guild.roles.find(r => r.id == w2)
    if(msg.member.hasPermission("KICK_MEMBERS")) {
        var member= msg.mentions.members.first();
        if (member.hasPermission("KICK_MEMBERS") || member.roles.find("name", "Test-Supporter")) return msg.channel.send(":x: Dieser Nutzer darf nicht verwarnt werden!").then(msg => {
            msg.delete(4000)
        }).catch(console.error)
        if (!member) return msg.channel.send("Nutzer nicht gefunden!"); { 
                // Successmessage
                msg.channel.send(":white_check_mark: " + member.displayName + " wurde verwarnt!").then(msg => {
                    msg.delete(4000)
                }).catch(console.error)


    if (member.roles.find("name", "Warnung I")) {
        member.removeRole(wa1)
        member.addRole(wa2, "Warnung II")
        client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer").addField("Art: ", "Warnung II").addField("Von: ", msg.author.username))



    }
    else {
        if (member.roles.find("name", "Warnung II")) {
            client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer").addField("Art: ", "Warnung III/Kick").addField("Von: ", msg.author.username))
            member.send('', new Discord.RichEmbed().setColor(0x558B2F).setDescription("Du wurdest gekickt da du 3 mal verwarnt wurdest!").setTitle("Bestrafung")).then(kick => {
            member.kick("Warnung III")
            })

            
        }
        else {
            member.addRole(wa1, "Warnung I")
            client.channels.get(config.logs).send('', new Discord.RichEmbed().setColor(0x3498db).setDescription(member.displayName).setTitle("Nutzer").addField("Art: ", "Warnung I").addField("Von: ", msg.author.username))


        }
    }

}
    }
else {
    msg.channel.send(":x: Keine Rechte :x:").then(np => {
        np.delete("4000")
    })

}


}



})

const MROLE = "481494473415852043"


client.on('guildMemberAdd', (memb) => {


    memb.send('', new Discord.RichEmbed().setColor(0x558B2F).setDescription("Willkommen auf dem IchHeisseJamie Communtiy Discord Discord Server :tada::hugging: ! Wenn du fragen hast wende dich an das Serverteam oder die Serverleitung.").setTitle("Herzlich Willkommen " + memb.displayName))
    client.channels.get("483645236984152085").send('', new Discord.RichEmbed().setColor(0x558B2F).setDescription("Willkommen auf dem IchHeisseJamie Communtiy Discord Discord Server :tada::hugging: ! Wenn du fragen hast wende dich an das Serverteam oder die Serverleitung.").setTitle("Herzlich Willkommen " + memb.displayName))        

        
    
})

client.on('guildMemberRemove', (memb) => {

    client.channels.get("483645236984152085").send('', new Discord.RichEmbed().setColor(0xef5350).setDescription("Der Nutzer " + memb.displayName + " hat den Server verlassen!").setTitle("Auf Wiedersehen"))  
})









client.login(config.token)


