import ModelClass from "./resources/classes/model.class";
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import {
  APIInteractionDataResolvedGuildMember,
  APIRole,
} from "discord-api-types/v9";
import {
  ApplicationCommandOptionType,
  CommandInteractionOption,
  GuildMember,
  PermissionResolvable,
  Role,
  User,
} from "discord.js";

export interface ContextCmd {
  name: string;
  type: number;
}

export interface CommandFile {
  name: string;
  cxtMenu?: "USER" | "MESSAGE";
  file: any;
  build?: SlashCommandBuilder | SlashCommandSubcommandBuilder;
  ctxBuild?: ContextCmd;
  parentCategory?: string;
  subCategory?: string;
}

export interface CommandList {
  [key: string]: CommandFile;
}

export interface CommandConfig {
  name: string;
  description: string;
  ucategory: string;
  category?: string;
  rootCategory?: string;
  usage: string;
  aliases?: string[];
  devOnly: boolean;
  guildOnly: boolean;
  userPermissions?: PermissionResolvable[];
  clientPermissions?: PermissionResolvable[];
}

export interface StringChoices {
  name: string;
  value: string | BigInt | number;
}

export enum ArgTypes {
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
}

export interface CommandArg {
  name: string;
  description: string;
  required: boolean;
  type: ArgTypes;
  choices?: StringChoices;
}

export type CommandArgs = Array<CommandArg>;

export interface ResponseArg {
  name: string;
  type: ArgTypes | ApplicationCommandOptionType;
  value?: string | number | boolean;
  channel?: CommandInteractionOption["channel"];
  role?: Role | APIRole;
  user?: User | GuildMember | APIInteractionDataResolvedGuildMember;
  member?: GuildMember | APIInteractionDataResolvedGuildMember;
}

export interface ResponseArgs {
  [key: string]: ResponseArg;
}

export enum FormattedPerms {
  CREATE_INSTANT_INVITE = "Create Invite",
  KICK_MEMBERS = "Kick Members",
  BAN_MEMBERS = "Ban Members",
  ADMINISTRATOR = "Administrator",
  MANAGE_CHANNELS = "Manage Chanels",
  MANAGE_GUILD = "Manage Server",
  ADD_REACTIONS = "Add Reactions",
  VIEW_AUDIT_LOG = "View Audit Log",
  PRIORITY_SPEAKER = "Priority Speaker",
  STREAM = "Stream Video",
  VIEW_CHANNEL = "View Channel",
  SEND_MESSAGES = "Send Messages",
  SEND_TTS_MESSAGES = "Send text-to-speech Messages",
  MANAGE_MESSAGES = "Manage Messages",
  EMBED_LINKS = "Embed Links",
  ATTACH_FILES = "Attach Files",
  READ_MESSAGE_HISTORY = "Read Message History",
  MENTION_EVERYONE = "Mention all roles & everyone",
  USE_EXTERNAL_EMOJIS = "Use External Emojis",
  VIEW_GUILD_INSIGHTS = "View Server Insights",
  CONNECT = "Connect to Voice Channels",
  SPEAK = "Speak in Voice Channels",
  MUTE_MEMBERS = "Mute Members",
  DEAFEN_MEMBERS = "Deafen members",
  MOVE_MEMBERS = "Move Members",
  USE_VAD = "Unknown Permission Name",
  CHANGE_NICKNAME = "Change Nickname",
  MANAGE_NICKNAMES = "Manage Nicknames",
  MANAGE_ROLES = "Manage Roles",
  MANAGE_WEBHOOKS = "Manage Webhooks",
  MANAGE_EMOJIS_AND_STICKER = "Manage Emojis & Stickers",
  USE_APPLICATION_COMMANDS = "Use Application Commands",
  REQUEST_TO_SPEAK = "Request to Speak",
  MANAGE_THREADS = "Manage Threads",
  USE_PUBLIC_THREADS = "Use Public Threads",
  CREATE_PUBLIC_THREADS = "Create Public Threads",
  USE_PRIVATE_THREADS = "Use Private Threads",
  CREATE_PRIVATE_THREADS = "Create Private Threads",
  USE_EXTERNAL_STICKERS = "Use External Stickets",
  SEND_MESSAGES_IN_THREADS = "Send Messages In Threads",
  START_EMBEDDED_ACTIVITIES = "Start Activites",
}

export interface Database {
  users: ModelClass;
}

export enum XpLevelRequirement {
  lv1 = 100,
  lv2 = 125,
  lv3 = 150,
  lv4 = 175,
  lv5 = 200,
  lv6 = 250,
  lv7 = 300,
  lv8 = 350,
  lv9 = 400,
  lv10 = 500,
}
