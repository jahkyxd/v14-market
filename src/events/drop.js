import Jahky from "../Base/Jahky.Client.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("ready", async () => {
        setInterval(() => {
            client.guilds.cache
                .get(client.config.Guild.GuildID)
                .channels.cache.get(client.config.channels.chat)
                .DropCheck();
        }, 1000 * 60 * 60 * 3);
    });
};
