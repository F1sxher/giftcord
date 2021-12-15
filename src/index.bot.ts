// DEPENDANCIES
import Discord, {
  ActivitiesOptions,
  CommandInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { config as env } from "dotenv";

// MODULES
import SysLog from "./resources/modules/sysLog";
import loadCommands from "./resources/modules/loadCommands";
import eventHandler from "./resources/events/handler";
import initDB from "./resources/modules/db/index.db";
import BotConfig from "./config.bot";
import { Database, XpLevelRequirement } from "./types.bot";
// import { GuildData } from "./resources/schemas.bot";

// INITIALIZE
env();
let client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ["GUILD_MEMBER", "USER"],
});
let { commandlist, ctxmenulist } = loadCommands();
let db: Database;
let botReady = false;
const activities: ActivitiesOptions[] = [
  { type: "COMPETING", name: "snowball fights" },
  { type: "LISTENING", name: "christmas music" },
  { type: "PLAYING", name: "Giftcord | /help" },
  {type: "PLAYING", name: "with the elves"},
  { type: "WATCHING", name: "christmas movies" },
];

let pickRandom = () => {
  setInterval(() => {
    client.user?.setPresence({
      activities: [
        activities[Math.floor(Math.random() * (activities.length - 0) + 0)],
      ],
      status: "online",
    });
  }, 650000);
};

// LOAD CLIENT
client.on("ready", async () => {
  client.user?.setPresence({
    activities: [{ name: "Gathering Gifts..." }],
    status: "idle",
  });

  db = await initDB();

  SysLog.success({
    content: `Client is ready - ${client.user?.username} (${client.user?.id})`,
    type: 1,
  });

  let chosenActivity =
    activities[Math.floor(Math.random() * (activities.length - 0) + 0)];

  setTimeout(() => {
    client.user?.setPresence({
      activities: [chosenActivity],
      status: "online",
    });
  }, 6500);
  botReady = true;

  pickRandom();
});

// HANDLE INTERACTIONS
client.on("interactionCreate", async (interaction) => {
  if (
    !botReady &&
    (interaction.isApplicationCommand() || interaction.isMessageComponent())
  ) {
    let ctx = interaction as CommandInteraction;

    ctx.reply({
      content:
        "One Moment! We are gathering gifts and starting up the bot right now, please try again later ):",
    });
  }
  eventHandler(client, commandlist, interaction, db);
});

// MESSAGES
client.on("messageCreate", async (message) => {
  let dateCheck = new Date();
  let dbUser = await db.users.findOne({ userId: message.author.id });

  if (dbUser && dbUser.chatCooldown.toISOString() <= dateCheck.toISOString()) {
    let newCooldown = new Date();
    newCooldown.setSeconds(newCooldown.getSeconds() + 45);

    let newXp = dbUser.currentXp + Math.floor(Math.random() * 4 + 1);
    let newLevel;
    let newRequired;

    if (newXp >= Number.parseInt(dbUser.xpRequired)) {
      newLevel = dbUser.currentLevel + 1;
      newXp = 0;
      newRequired = XpLevelRequirement[`lv${newLevel}`];

      const rewards = new MessageEmbed()
        .setTitle("Level Rewards")
        .setTimestamp()
        .setColor(BotConfig.colors.Main)
        .setAuthor(message.author.tag, message.author.avatarURL()!);

      message.channel.send({
        content: `<@${message.author.id}> Congrats on reaching level **${newLevel}!!**`,
        embeds: [rewards],
      });
    }

    console.log(newXp + "/" + (newRequired || dbUser.xpRequired));

    await db.users.updateOne(
      { userId: message.author.id },
      {
        currentLevel: newLevel,
        xpRequired: newRequired || dbUser.xpRequired,
        currentXp: newXp,
        chatCooldown: newCooldown,
      },
      true
    );
  }
});

// MEMBER ADDS
client.on("guildMemberAdd", async (member) => {
  if (member.guild.id === BotConfig.giftcordGuild) {
    let channel = (await member.guild.channels.fetch(
      "916739891012968479"
    )) as TextChannel;
    if (!channel)
      SysLog.warn({
        content: `Unable to send welcome message for user ${member.user.tag}`,
        type: 1,
      });

    let welcomeEmbed = new MessageEmbed()
      .setTitle("Welcome to Giftcord!")
      .setTimestamp()
      .setColor(BotConfig.colors.Main)
      .setAuthor(member.user.tag, member.user.avatarURL()!)
      .setDescription(
        "**__Hey there! :wave:__\n \nWelcome to the Giftcord Support server, where you can ask questions about our bot, give suggestions, or just have a jolly old time! Enjoy your stay! \n \n- Giftcord Team**"
      )
      .addField(
        ":closed_book: Make sure to read the rules!",
        "<#916739608090406972>",
        true
      )
      .addField(
        ":vertical_traffic_light: Check the bot status",
        "<#916739717201035284>",
        true
      )
      .addField(
        ":arrow_up_small: Look at the bot updates",
        "<#916739702223142974>",
        true
      )
      .addField(
        ":grey_question: Have a question? We have an answer!",
        "<#916739481040728076>",
        true
      );

    channel?.send({ content: `<@${member.user.id}>`, embeds: [welcomeEmbed] });
  }
});

client.on("guildMemberUpdate", async (om, newMember) => {
  if (newMember.guild.id === BotConfig.giftcordGuild) {
    if (!newMember.pending)
      newMember.roles.add(
        "916740833024278559",
        "AUTOROLE - Passed Member Gate"
      );
  }
});

// CLIENT LOGIN
client.login(process.env.TOKEN);
