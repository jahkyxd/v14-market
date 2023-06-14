import Jahky from "../Base/Jahky.Client.js";
import { Message, EmbedBuilder, TextChannel, User, Guild } from "discord.js";

export default {
    name: "günlük",
    aliases: ["sandık", "daily"],

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
        const Dailyhours = 86400000;
        const timeout = client.db.get(`daily_${author.id}`);

        if (
            timeout !== null &&
            timeout !== undefined &&
            Dailyhours - (Date.now() - timeout) > 0
        ) {
            let time = await dateReplace(Dailyhours - (Date.now() - timeout));
            channel.error(
                message,
                `Tekrar günlük paranı almak için ${
                    time.hours ? `**${dateReplace(time.hours)} saat**,` : ""
                } **${dateReplace(time.minutes)} dakika**, **${dateReplace(
                    time.seconds
                )} saniye**  Daha beklemelisin!`
            );
        } else {
            client.db.set(`daily_${message.member.id}`, Date.now());
            function getRandomFloat(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            const frang = getRandomFloat(400, 1000);
            client.db.add(`ranks_${message.member.id}`, frang);
            channel.send({
                embeds: [
                    embed.setDescription(
                        `Günlük bakiyenizi topladınız ve **${frang}** frang kazandınız. Bu sandık ile **${client.db.get(
                            `ranks_${message.member.id}`
                        )}** franga ulaştınız.`
                    ),
                ],
            });
        }
    },
};

async function dateReplace(milliseconds) {
    return {
        days: Math.trunc(milliseconds / 86400000),
        hours: Math.trunc(milliseconds / 3600000) % 24,
        minutes: Math.trunc(milliseconds / 60000) % 60,
        seconds: Math.trunc(milliseconds / 1000) % 60,
        milliseconds: Math.trunc(milliseconds) % 1000,
        microseconds: Math.trunc(milliseconds * 1000) % 1000,
        nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
    };
}
