const fs = require('node:fs');
const path = require('node:path');
const { MessageFlags } = require('discord.js');
const config = require('../config.json');
const startEmbedCollector = require('./startEmbedCollector.js');

function getComponentSignatures(node) {
    const signatures = [];

    const walk = (value) => {
        if (!value || typeof value !== 'object') return;

        if (typeof value.content === 'string') {
            signatures.push(value.content);
        }

        if (typeof value.custom_id === 'string') {
            signatures.push(value.custom_id);
        }

        if (Array.isArray(value.components)) {
            for (const child of value.components) {
                walk(child);
            }
        }
    };

    walk(node);
    return signatures;
}

async function sendPersistentEmbeds(client) {
    const dirPath = path.join(__dirname, '..', 'autocompleters');
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const folders = entries.filter(entry => entry.isDirectory());

    for (const folder of folders) {
        const folderPath = path.join(dirPath, folder.name);
        const childrenPath = path.join(folderPath, 'children');
        let embedTargets = [];

        if (fs.existsSync(childrenPath) && fs.statSync(childrenPath).isDirectory()) {
            const childEntries = fs.readdirSync(childrenPath, { withFileTypes: true });
            const childFolders = childEntries.filter(entry => entry.isDirectory());

            for (const childFolder of childFolders) {
                embedTargets.push({
                    path: path.join(childrenPath, childFolder.name, 'startEmbed.js'),
                    configKey: `${folder.name}_${childFolder.name}`
                });
            }
        } else {
            embedTargets.push({
                path: path.join(folderPath, 'startEmbed.js'),
                configKey: folder.name
            });
        }

        for (const target of embedTargets) {
            if (!fs.existsSync(target.path)) {
                console.log(`Cannot find startEmbed.js at ${target.path}`);
                continue;
            }

            const channelID = config.channels[target.configKey];
            if (!channelID) {
                console.log(`Channel for ${target.configKey} is not configured`);
                continue;
            }

            let channel;
            try {
                channel = await client.channels.fetch(channelID);
            } catch (error) {
                console.warn(`Skipping ${target.configKey}: invalid channel ID ${channelID}: ${error.message}`);
                continue;
            }

            if (!channel) {
                console.log(`${target.configKey} channel not found`);
                continue;
            }

            try {
                const startEmbed = require(target.path);
                const messages = await channel.messages.fetch({ limit: 50 });
                const startEmbedSignatures = getComponentSignatures(startEmbed);

                const existingMessage = messages.find(msg =>
                    msg.author.id === client.user.id &&
                    msg.components?.some(messageComponent => {
                        const messageSignatures = getComponentSignatures(messageComponent);
                        return messageSignatures.some(signature => startEmbedSignatures.includes(signature));
                    })
                );

                if (!existingMessage) {
                    console.log(`Sending persistent embed for ${target.configKey}`);
                    await channel.send({
                        flags: MessageFlags.IsComponentsV2,
                        components: [startEmbed]
                    });
                }

                await startEmbedCollector(existingMessage || (await channel.messages.fetch({ limit: 1 })).first(), folder.name);
            } catch (error) {
                console.error(`Failed to set up persistent embed for ${target.configKey}:`, error);
            }
        }
    }
}

module.exports = sendPersistentEmbeds;
