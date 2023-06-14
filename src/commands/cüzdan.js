import Jahky from "../Base/Jahky.Client.js";
import { Message, EmbedBuilder, TextChannel, User, Guild } from "discord.js";

export default {
    name: "cüzdan",
    aliases: [],

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
                    `Şuan **${
                        client.db.get(`ranks_${message.author.id}`) || 0
                    }** franga sahipsiniz daha fazla kazanmak için yazı kanallarında aktif kalabilirsin!`
                ),
            ],
        });
    },
};
