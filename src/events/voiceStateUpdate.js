import Jahky from "../Base/Jahky.Client.js";
import config from "../../config.js";
import { ChannelType } from "discord.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        if (oldState.member.user.bot || newState.member.user.bot) return;
        if (oldState.channel.type === ChannelType.GuildStageVoice) return;

        config.channels.publicParents.some(async (parents) => {
            if (oldState.channel.parentId === parents) {
                if (!oldState.channelId && newState.channelId)
                    await client.db.set(
                        `voiceJoinedAt_${newState.member.id}`,
                        Date.now()
                    );

                let joinedAtData = await client.db.get(
                    `voiceJoinedAt_${newState.member.id}`
                );
                if (!joinedAtData)
                    client.db.set(
                        `voiceJoinedAt_${newState.member.id}`,
                        Date.now()
                    );

                const data = Date.now() - joinedAtData;

                const xpPerLevel = config.ranks.xpToAdd.includes("-")
                    ? config.ranks.xpToAdd.split("-")
                    : config.ranks.xpToAdd;
                const min = parseInt(xpPerLevel[0]);
                const max = parseInt(xpPerLevel[1]);
                const xpToAdd = Array.isArray(xpPerLevel)
                    ? min + Math.floor((max - min) * Math.random())
                    : xpPerLevel;
                client.db.add(`ranks_${newState.member.id}`, (data / 1000 / 60 / config.ranks.voiceCount) * xpToAdd);
            }
        });
    });
};
