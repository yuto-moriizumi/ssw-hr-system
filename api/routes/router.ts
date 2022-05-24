import express from 'express';

const router = express.Router();

// Root Endpoint
router.get('/', (req, res) => {
  res.status(200).send('Welcome to SSW HR System API server!');
});

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents } from 'discord.js';

router.get('/test', (req, res) => {
  console.log(process.env.CLIENT_ID);
  const { CLIENT_ID, GUILD_ID, CLIENT_SECRET } = process.env;
  if (
    CLIENT_ID === undefined ||
    GUILD_ID === undefined ||
    CLIENT_SECRET == undefined
  )
    throw new Error('CLIENT_ID is undefined!');

  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];

  const rest = new REST({ version: '9' }).setToken(CLIENT_SECRET);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
      });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

  client.login(CLIENT_SECRET);

  res.status(200).send('TEST');
});

export default router;
