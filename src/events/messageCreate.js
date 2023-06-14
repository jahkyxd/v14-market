import Jahky from "../Base/Jahky.Client.js";
import config from "../../config.js";
const num = new Map();

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return
        const GetNum = num.get(message.author.id);
        if (GetNum && GetNum === config.ranks.messageCount) {
            num.set(message.author.id, 0);

            const xpPerLevel = config.ranks.xpToAdd.includes("-")
                ? config.ranks.xpToAdd.split("-")
                : config.ranks.xpToAdd;
            const min = parseInt(xpPerLevel[0]);
            const max = parseInt(xpPerLevel[1]);
            const xpToAdd = Array.isArray(xpPerLevel)
                ? min + Math.floor((max - min) * Math.random())
                : xpPerLevel;

            client.db.add(`ranks_${message.author.id}`, xpToAdd);
        } else {
            if (GetNum) num.set(message.author.id, GetNum + 1);
            else num.set(message.author.id, 1);
        }
    });
};
