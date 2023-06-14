import Jahky from "../Base/Jahky.Client.js";
import { Message, EmbedBuilder, TextChannel, User, Guild } from "discord.js";

export default {
    name: "top",
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

    async execute(client, message, args, embed, channel, author, guild) {
        await guild.members.fetch();

        const top = Array.from(
            guild.members.cache
                .filter((member) => client.db.get(`ranks_${member.id}`))
                .keys()
        )
            .sort(
                (a, b) =>
                    client.db.get(`ranks_${b}`) - client.db.get(`ranks_${a}`)
            )
            .slice(0, 15)
            .map(
                (id, index) =>
                    index +
                    1 +
                    ". " +
                    guild.members.cache.get(id).toString() +
                    " `" +
                    client.db.get(`ranks_${id}`) +
                    "` frangı var."
            )
            .join("\n");

        channel.send({
            embeds: [
                embed.setDescription(
                    `**${guild.name}** sunucumuzun toplam frang verileri\n\n${
                        top || "Frang verisi bulunmamaktadır!"
                    }`
                ),
            ],
        });
    },
};
