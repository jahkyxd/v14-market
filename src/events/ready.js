import Jahky from "../Base/Jahky.Client.js";
import { joinVoiceChannel } from "@discordjs/voice";
import { ActivityType } from "discord.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("ready", async () => {
        client.user.setPresence({
            activities: [
                {
                    name: `Made With Jahky. ❤️`,
                    type: ActivityType.Listening,
                },
            ],
            status: "idle",
        });

        const channel = client.guilds.cache
            .get(client.config.Guild.GuildID)
            .channels.cache.get(client.config.channels.voiceChannel);

        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: true,
        });
    });
};
