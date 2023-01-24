const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "loop",
  aliases: ['repeat', 'rp'],
  description: "Changes loop mode",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    let mode = null
    switch (args[0]) {
      case 'off':
        mode = 0
        break
      case 'song':
        mode = 1
        break
      case 'queue':
        mode = 2
        break
    };
    mode = await queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'OFF'

    const status = queue => `**Volume:** \`${queue.volume}%\` | **Filters:** \`${queue.filters.names.join(', ') || 'OFF'}\` | **Loop:** \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'OFF'}\` | **Autoplay:** \`${queue.autoplay ? 'ON' : 'OFF'}\``;

    const loopEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setTitle('Loop Mode Changed')
      .setDescription(`Set loop mode to \`${mode}\`\n\n${status(queue)}`)

    return message.reply({ embeds: [loopEmbed] });

  },

};