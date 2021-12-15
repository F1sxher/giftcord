import { MessageEmbed as DEmbed } from "discord.js";
import { config } from "dotenv";
config();

export default {
  emoji: {
    success: "<:Success:862393710687158348>",
    error: "<:Error:862393762068168704>",
    loading: "<a:Loading:862393992099266570>",
    info: "<:Info:863059836434776095>",
  },

  colors: {
    //======ReleaseColors======\\
    Main: 0x33e9ff,
    //=======OtherColors=======\\
    Red: 0xff4848,
    Orange: 0xffa500,
    Green: 0x9acd32,
    Blue: 0x3c78d8,
  },

  embedTemplates: {
    info: (msg: string) =>
      new DEmbed()
        .setColor(0x3c78d8)
        .setDescription(`<:Info:863059836434776095> ${msg}`),
    loading: (msg: string) =>
      new DEmbed()
        .setColor(0xffffff)
        .setDescription(`<a:Loading:862393992099266570> ${msg}`),
    success: (msg: string) =>
      new DEmbed()
        .setColor(0x9acd32)
        .setDescription(`<:Success:862393710687158348> ${msg}`),
    err: (msg: string) =>
      new DEmbed()
        .setColor(0xff4848)
        .setDescription(`<:Error:862393762068168704> ${msg}`),
  },

  giftcordGuild: "916739480545812491",
};
