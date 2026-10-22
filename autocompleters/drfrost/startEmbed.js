const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize } = require('discord.js');
const { emojis } = require('../../config.json');

const container = new ContainerBuilder()
    .setAccentColor(0xe5ac3f)
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('# Dr Frost\nSelect Login to connect your Dr Frost account.')
    )
    .addSeparatorComponents(
        new SeparatorBuilder({ spacing: SeparatorSpacingSize.Small })
    )
    .addActionRowComponents(
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('drfrost_login')
                .setLabel('Login')
                .setStyle(ButtonStyle.Success)
                .setEmoji(emojis.login)
        )
    );

module.exports = container;