import Jahky from "../Base/Jahky.Client.js";
import {
    Message,
    EmbedBuilder,
    TextChannel,
    User,
    Guild,
    ActionRowBuilder,
} from "discord.js";
import config from "../../config.js";
import { StringSelectMenuBuilder } from "@discordjs/builders";

export default {
    name: "satın-al",
    aliases: ["buy"],

    /**
     *
     * @param {Jahky} client
     * @param {Message} message
     * @param {Array<String>} args
     * @param {EmbedBuilder} embed
     * @param {TextChannel} channel
     * @param {User} author
     * @param {Guild} guild
     */

    async execute(client, message, args, embed, channel, author, guild) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId("buy")
            .setMaxValues(1)
            .setPlaceholder(
                "Satın alabilceğiniz rolleri görmek için tıklayın!"
            );

        client.ranks.forEach(async (rate) => {
            const role = guild.roles.cache.get(rate.role);

            menu.addOptions({
                label: role.name,
                description: `${rate.coin} frang karşılığı alabileceğiniz rol!`,
                value: String(rate.number),
            });
        });

        const row = new ActionRowBuilder().addComponents(menu);

        channel.send({
            embeds: [
                embed.setDescription(
                    "Lütfen satın almak istediğiniz rolü aşşağıdan seçiniz!"
                ),
            ],
            components: [row],
        });

        const filter = (interaction) =>
            interaction.customId === "buy" &&
            interaction.member.id === author.id;

        const collector = channel.createMessageComponentCollector({
            filter,
            time: 1000 * 30,
        });

        collector.on("collect", async (interaction) => {
            interaction.values.forEach(async (value) => {
                const currency = client.ranks.find(
                    (x) => String(x.number) === value
                );
                const role = guild.roles.cache.get(currency.role);

                if (interaction.member.roles.cache.has(role.id))
                    return interaction.reply({
                        content: `${role.toString()} rolüne zaten sahipsiniz başka rolleri almayı deneyin!`,
                        ephemeral: true,
                    });

                const ranks =
                    client.db.get(`ranks_${interaction.user.id}`) || 0;

                if (currency.coin > ranks)
                    return interaction.reply({
                        content: `Maalesef ${role.toString()} rolünü almak için **${
                            currency.coin - ranks
                        }** franga daha ihtiyacınız var`,
                        ephemeral: true,
                    });

                client.db.subtrack(
                    `ranks_${interaction.member.id}`,
                    currency.coin
                );

                interaction.reply({
                    ephemeral: true,
                    content: `Tebrikler :tada::tada:\n\n${role.toString()} rolünü **${
                        currency.coin
                    }** frang karşılığı satın aldınız diğer roller için chat kanalında aktif kalmayı unutmayın!`,
                });

                guild.channels.cache.get(config.channels.log).send({
                    content: `${interaction.member.toString()}, kişisi **${
                        currency.coin
                    }** frang karşılı \`\`${role.name}\`\` rolünü aldı!`,
                });
            });
        });
    },
};
