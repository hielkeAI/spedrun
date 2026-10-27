const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, SectionBuilder, ThumbnailBuilder } = require('discord.js');
const { emojis, colours } = require('../../config.json');

const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Small });

const section = new SectionBuilder()
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`# Educake\nAutomate your Educake homework with >90% accuracy and a customisable time!\n## ✨ Features\n- ⏰ **Customisable Time** — Autocompletes your Educake homework in whatever time you want to balance speed and detection!\n- 🎯 **High Accuracy** — Excellent accuracy of >90% at completing questions!\n- 🧠 **Easy To Use** — Simple and intuitive to use with the press of only a few buttons!`)
    )
    .setThumbnailAccessory(new ThumbnailBuilder({ media: { url: 'https://i.postimg.cc/VNLwXfqj/educake-logo-favicon.png' } }));

const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId('educake_login')
        .setLabel('Login')
        .setStyle(ButtonStyle.Success)
        .setEmoji(emojis.login)
);

const container = new ContainerBuilder()
    .setAccentColor(colours.educake)
    .addSectionComponents(section)
    .addSeparatorComponents(separator)
    .addActionRowComponents(buttonRow);

module.exports = container;
