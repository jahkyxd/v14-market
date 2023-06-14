import {
    TextChannel,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} from "discord.js";

//! prototype functions \\

TextChannel.prototype.error = async function (message, text) {
    const owner = global.client.users.cache.get("618444525727383592");
    const embed = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({
            name: message.member.displayName,
            iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }),
        })
        .setFooter({
            text: "Developed By Jahky.",
            iconURL: owner.avatarURL({ dynamic: true }),
        });
    this.send({
        embeds: [embed.setDescription(text)],
    }).then((x) => {
        if (x.deletable)
            setTimeout(() => {
                x.delete();
            }, 10000);
    });
};

TextChannel.prototype.DropCheck = async function () {
    const buton = new ButtonBuilder()
        .setCustomId("drop")
        .setLabel("Tıkla!")
        .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(buton);

    const newButon = new ButtonBuilder()
        .setCustomId("drop2")
        .setLabel("Tıkla!")
        .setStyle(ButtonStyle.Success)
        .setDisabled(true);

    const newRow = new ActionRowBuilder().addComponents(newButon);

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Drop!" })
        .setFooter({ text: "Made With Jahky." });

    const messages = await this.send({
        embeds: [
            embed
                .setDescription(
                    "5 dakika içinde butona basan ilk kullanıcı 700 frangın sahibi olucaktır"
                )
                .setColor("Random"),
        ],

        components: [row],
    });
    const filter = (interaction) => interaction.customId === "drop";

    const collector = this.createMessageComponentCollector({
        filter,
        time: 1000 * 60 * 5,
    });

    collector.on("collect", async (interaction) => {
        messages.edit({
            embeds: [
                embed
                    .setDescription(
                        `${interaction.member.toString()} Tebrikler 700 frangın sahibi oldunuz!`
                    )
                    .setColor("Green"),
            ],
            components: [newRow],
        });

        interaction.reply({content: "Tebrikler 7000 frang kazandınız", ephemeral: true})

        client.db.add(`ranks_${interaction.member.id}`, 700);
    });

    collector.on("end", async (collected) => {
        messages.edit({
            embeds: [
                embed
                    .setDescription(
                        `5 dakika içinde kimse tıklamadığı için drop check iptal edildi!`
                    )
                    .setColor("Red"),
            ],
            components: [newRow],
        });
    });
};

Array.prototype.random = async function () {
    return this[Math.floor(Math.random() * this.length)];
};
