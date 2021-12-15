import { Client } from "discord.js";

export default (client: Client) => {
  let cup: any = client?.uptime;
  let totalSeconds = Math.floor(cup / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  return `${days}d, ${hours}h, ${minutes}m and ${seconds}s`;
};
