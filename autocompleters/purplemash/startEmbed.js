const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize } = require('discord.js');
const { emojis } = require('../../config.json');

const container = new ContainerBuilder()
    .setAccentColor(0x7a32a8)
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('# Purple Mash\nPlaceholder integration pending full Purple Mash API work.')
    )
    .addSeparatorComponents(new SeparatorBuilder({ spacing: SeparatorSpacingSize.Small }))
    .addActionRowComponents(
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('purplemash_login')
                .setLabel('Login')
                .setStyle(ButtonStyle.Success)
                .setEmoji(emojis.login)
        )
    );

module.exports = container;
