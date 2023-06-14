import Jahky from "../Base/Jahky.Client.js";
import { Message, EmbedBuilder, TextChannel, User, Guild } from "discord.js";

export default {
    name: "market",
    aliases: ["shop"],

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

    execute(client, message, args, embed, channel, author, guild) {
        channel.send({
            embeds: [
                embed.setDescription(
                    `**${
                        guild.name
                    }** sunucusunun market bilgilerine hoş geldiniz\n\n${client.ranks
                        .map(
                            (rate) =>
                                `Rol: ${guild.roles.cache
                                    .get(rate.role)
                                    .toString()}\n Fiyat: **${rate.coin}**`
                        )
                        .join("\n\n")}`
                ),
            ],
        });
    },
};
