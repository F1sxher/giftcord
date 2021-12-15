import {
  ButtonInteraction,
  Client,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  SelectMenuInteraction,
} from "discord.js";
import {
  CommandConfig,
  CommandList,
  Database,
  ResponseArgs,
  XpLevelRequirement,
} from "../../types.bot";
import Command from "../../resources/classes/command.class";
import BotConfig from "../../config.bot";

const Config: CommandConfig = {
  name: "profile",
  description: "View your profile, or setup a profile.",
  usage: "profile",
  ucategory: "Users",
  devOnly: false,
  guildOnly: false,
};
export default abstract class ProfileCommand extends Command {
  constructor() {
    super(Config);
  }

  async execute(
    client: Client,
    message: CommandInteraction,
    args: ResponseArgs,
    commandlist: CommandList,
    db: Database
  ): Promise<void> {
    let findUser = await db.users.findOne({ userId: message.user.id });

    if (!findUser) {
      const noProfile = new MessageEmbed()
        .setAuthor(message.user.tag, message.user?.avatarURL()?.toString())
        .setColor(BotConfig.colors.Red)
        .setDescription("Oh no! It seems as if you don't have a profile.");

      const promptCreate = new MessageEmbed()
        .setAuthor(message.user.tag, message.user?.avatarURL()?.toString())
        .setTitle("What does a giftcord profile do?")
        .setTimestamp()
        .setColor(BotConfig.colors.Main)
        .setDescription(
          'A giftcord profile allows you to participate with the bot to win xp and level up to win "Chistmas Cookies" and as well participate in community giveaways in our support server. It encourages and rewards chat activity and makes trading virtual christmas gifts fun!'
        );

      const promptButtons = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Create a Profile")
          .setStyle("PRIMARY")
          .setCustomId(`profile_create:${message.user.id}`),
        new MessageButton()
          .setLabel("Cancel")
          .setStyle("SECONDARY")
          .setCustomId(`profile_deny:${message.user.id}`)
      );

      return message.reply({
        embeds: [noProfile, promptCreate],
        components: [promptButtons],
      });
    } else if (findUser) {
      const profile = new MessageEmbed()
        .setAuthor(message.user.tag, message.user?.avatarURL()?.toString())
        .setColor(BotConfig.colors.Main)
        .setDescription("profile go here ahaha");

      const deleteProfile = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Delete your profile")
          .setStyle("DANGER")
          .setCustomId(`profile_delete:${message.user.id}`)
      );

      return message.reply({
        embeds: [profile],
        components: [deleteProfile],
      });
    }
  }

  async button(
    client: Client,
    button: ButtonInteraction,
    id: string,
    commandlist: CommandList,
    db: Database
  ): Promise<void> {
    if (!id.endsWith(button.user.id)) {
      return button.reply({
        embeds: [
          BotConfig.embedTemplates.err(
            "Nice try! But, this button isn't for you bro :("
          ),
        ],
        ephemeral: true,
      });
    }

    if (id.split(":")[0] === "create") {
      await db.users.create({
        userId: button.user.id,
        currentLevel: 1,
        xpRequired: XpLevelRequirement["lv1"].toString(),
        currentXp: 0,
        chatCooldown: new Date(),
      });

      const creationEmbed = new MessageEmbed()
        .setAuthor(button.user.tag, button.user?.avatarURL()?.toString())
        .setColor(BotConfig.colors.Green)
        .setDescription(
          "Your user profile was made! Run `/profile` again to view it!"
        );

      const promptButtonsD = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Create a Profile")
          .setStyle("PRIMARY")
          .setCustomId(`profile_create:${button.user.id}`)
          .setDisabled(true),
        new MessageButton()
          .setLabel("Cancel")
          .setStyle("SECONDARY")
          .setCustomId(`profile_deny:${button.user.id}`)
          .setDisabled(true)
      );

      button.update({
        embeds: [button.message.embeds[1], creationEmbed],
        components: [promptButtonsD],
      });
    } else if (id.split(":")[0] === "deny") {
      const promptButtonsD = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Create a Profile")
          .setStyle("PRIMARY")
          .setCustomId(`profile_create:${button.user.id}`)
          .setDisabled(true),
        new MessageButton()
          .setLabel("Cancel")
          .setStyle("SECONDARY")
          .setCustomId(`profile_deny:${button.user.id}`)
          .setDisabled(true)
      );

      button.update({
        content:
          ":snowflake: No Profile was made, you may still make a profile at a later time.",
        embeds: [],
        components: [promptButtonsD],
      });
    } else if (id.split(":")[0] === "delete") {
      const promptButtons = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Delete my Profile")
          .setStyle("DANGER")
          .setCustomId(`profile_delete-conf:${button.user.id}`),
        new MessageButton()
          .setLabel("Cancel")
          .setStyle("SECONDARY")
          .setCustomId(`profile_delete-cancel:${button.user.id}`)
      );

      button.update({
        embeds: [
          BotConfig.embedTemplates.info(
            "Are you sure you want to continue and delete your profile? **ALL DATA WILL BE LOST!!**"
          ),
        ],
        components: [promptButtons],
      });
    } else if (id.split(":")[0] === "delete-conf") {
      let options1 = [
        {
          name: "snowflake",
          emoji: "❄️",
        },
        {
          name: "cloud_snow",
          emoji: "🌨️",
        },
        {
          name: "snowboarder",
          emoji: "🏂",
        },
        {
          name: "snowman",
          emoji: "⛄",
        },
      ];
      let options2 = [
        {
          name: "santa",
          emoji: "🎅",
        },
        {
          name: "mrs_claus",
          emoji: "🤶",
        },
        {
          name: "christmas_tree",
          emoji: "🎄",
        },
        {
          name: "evergreen_tree",
          emoji: "🌲",
        },
      ];
      let options3 = [
        {
          name: "cook",
          emoji: "🧑‍🍳",
        },
        {
          name: "cookie",
          emoji: "🍪",
        },
        {
          name: "fortune_cookie",
          emoji: "🥠",
        },
        {
          name: "pancakes",
          emoji: "🥞",
        },
      ];
      let options4 = [
        {
          name: "deer",
          emoji: "🦌",
        },
        {
          name: "elf",
          emoji: "🧝",
        },
        {
          name: "polar_bear",
          emoji: "🐻‍❄️",
        },
        {
          name: "penguin",
          emoji: "🐧",
        },
      ];
      let options5 = [
        {
          name: "snowman2",
          emoji: "☃️",
        },
        {
          name: "angel",
          emoji: "👼",
        },
        {
          name: "chocolate_bar",
          emoji: "🍫",
        },
        {
          name: "fox",
          emoji: "🦊",
        },
      ];

      let chosen1 = options1[Math.floor(Math.random() * options1.length)];
      let chosen2 = options2[Math.floor(Math.random() * options2.length)];
      let chosen3 = options3[Math.floor(Math.random() * options3.length)];
      let chosen4 = options4[Math.floor(Math.random() * options4.length)];
      let chosen5 = options5[Math.floor(Math.random() * options5.length)];

      const verificationMenu = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId(`profile_delete-verified:${button.user.id}`)
          .setPlaceholder("You are required to select some options")
          .setMinValues(2)
          .setMaxValues(4)
          .addOptions([
            {
              label:
                chosen1.name.charAt(0).toUpperCase() +
                chosen1.name.replaceAll("_", " ").slice(1),
              value: chosen1.name,
              emoji: chosen1.emoji,
            },
            {
              label:
                chosen2.name.charAt(0).toUpperCase() +
                chosen2.name.replaceAll("_", " ").slice(1),
              value: chosen2.name,
              emoji: chosen2.emoji,
            },
            {
              label:
                chosen3.name.charAt(0).toUpperCase() +
                chosen3.name.replaceAll("_", " ").slice(1),
              value: chosen3.name,
              emoji: chosen3.emoji,
            },
            {
              label:
                chosen4.name.charAt(0).toUpperCase() +
                chosen4.name.replaceAll("_", " ").slice(1),
              value: chosen4.name,
              emoji: chosen4.emoji,
            },
            {
              label:
                chosen5.name.charAt(0).toUpperCase() +
                chosen5.name.replaceAll("_", " ").slice(1),
              value: chosen5.name,
              emoji: chosen5.emoji,
            },
          ])
      );

      let amount = Math.floor(Math.random() * 4);
      if (amount < 2) amount = 2;
      if (amount > 4) amount = 4;

      const verificationEmbed = new MessageEmbed()
        .setAuthor(button.user.tag, button.user?.avatarURL()?.toString())
        .setColor(BotConfig.colors.Main)
        .setDescription(
          `Please verify by choosing **\`${amount}\`** options in the menu below. Please view below to see which items to click on before submitting your verification.\n \n**Please do not select anymore or anyless than the ones you are told to select below.**\n***Reminder, you will be unable to make a new profile for 24 hours.***`
        )
        .addField("No. of Choices to select", amount.toString());

      if (amount <= 2) {
        if (Math.floor(Math.random()) === 1) {
          verificationEmbed.addField(
            "Selection A",
            `**Please select :${chosen2.name}:**`
          );

          verificationEmbed.addField(
            "Selection B",
            `**Please select :${chosen5.name}:**`
          );
        } else {
          verificationEmbed.addField(
            "Selection A",
            `**Please select :${chosen1.name}:**`
          );

          verificationEmbed.addField(
            "Selection B",
            `**Please select :${chosen4.name}:**`
          );
        }
      } else if (amount === 3) {
        if (Math.floor(Math.random()) === 1) {
          verificationEmbed.addField(
            "Selection A",
            `**Please select :${chosen1.name}:**`
          );

          verificationEmbed.addField(
            "Selection B",
            `**Please select :${chosen3.name}:**`
          );

          verificationEmbed.addField(
            "Selection C",
            `**Please select :${chosen4.name}:**`
          );
        } else {
          verificationEmbed.addField(
            "Selection A",
            `**Please select :${chosen2.name}:**`
          );

          verificationEmbed.addField(
            "Selection B",
            `**Please select :${chosen4.name}:**`
          );

          verificationEmbed.addField(
            "Selection C",
            `**Please select :${chosen5.name}:**`
          );
        }
      } else if (amount >= 4) {
        if (Math.floor(Math.random()) === 1) {
          verificationEmbed.addField(
            "Selection A",
            `**Please select :${chosen1.name}:**`
          );

          verificationEmbed.addField(
            "Selection B",
            `**Please select :${chosen2.name}:**`
          );

          verificationEmbed.addField(
            "Selection C",
            `**Please select :${chosen4.name}:**`
          );

          verificationEmbed.addField(
            "Selection D",
            `**Please select :${chosen5.name}:**`
          );
        } else {
          verificationEmbed.addField(
            "Selection A",
            `**Please select :${chosen1.name}:**`
          );

          verificationEmbed.addField(
            "Selection B",
            `**Please select :${chosen2.name}:**`
          );

          verificationEmbed.addField(
            "Selection C",
            `**Please select :${chosen3.name}:**`
          );

          verificationEmbed.addField(
            "Selection D",
            `**Please select :${chosen5.name}:**`
          );
        }
      }

      button.update({
        embeds: [verificationEmbed],
        components: [verificationMenu],
      });
    }
  }

  async select(
    client: Client,
    select: SelectMenuInteraction,
    id: string,
    commandlist: CommandList,
    db: Database
  ): Promise<void> {
    if (!id.endsWith(select.user.id)) {
      return select.reply({
        embeds: [
          BotConfig.embedTemplates.err(
            "Nice try! But, this menu isn't for you bro :("
          ),
        ],
        ephemeral: true,
      });
    }

    if (id.split(":")[0] === "delete-verified") {
      let verified = true;
      let embed = select.message.embeds[0];

      select.values.forEach((val) => {
        let found = embed.fields?.find(
          (field) => field.value.split(":")[1] === val
        );

        if (!found) verified = false;
      });

      if (!verified) {
        return select.update({
          embeds: [
            BotConfig.embedTemplates.err(
              "Your selection could not be verified :("
            ),
          ],
          components: [],
        });
      } else if (verified) {
        await db.users.deleteOne({ userId: select.user.id }, true);

        return select.update({
          embeds: [
            BotConfig.embedTemplates.success(
              "Your selection was verified and your profile has been wiped.\n \n***Reminder, you will be unable to make a new profile for 24 hours.***"
            ),
          ],
          components: [],
        });
      }
    }
  }
}
