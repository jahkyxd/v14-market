import {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    InteractionType,
} from "discord.js";
import logger from "./logger.js";
import config from "../../config.js";
import db from "ceki.db";

class Jahky extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
            ],
        });
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = global.config = config;
        global.system = this;
        this.logger = logger;
        this.db = global.db = db;
        this.ranks = [
            { role: "1042430970403504178", coin: 1000, number: 1 },
            { role: "1042430971598880798", coin: 2000, number: 2 },
            { role: "1042430972752302150", coin: 3000, number: 3 },
            { role: "1042430973771513907", coin: 4000, number: 4 },
            { role: "1042430974652317706", coin: 5000, number: 5 },
        ];
    }
}

export default Jahky;
