# Introduction
This project was made to help students automatically complete their homework with the use of AI and requests while avoiding detection. You may use the code and database for whatever use case, but providing credit back to this original project is preferable. Sparx maths v2 is currently brokem it needs fixing dr frost shoud work it works for me.

The installation guide below is a step-by-step guide on how to set-up the bot on your own computer. The bot may or may not work on a cloud server due to Cloudflare.

**If you are only planning to use the bot for personal use, you can use the bot for free at the discord server!**

## Discord Server
### https://discord.gg/ZWF5VzuXSk
*If the invite link is invalid, please send a Direct Message to **weavernetwork** yes its the same as the wyca one (Discord ID: `1350775338740875396`).*

## Prerequisites

Before starting, ensure you have the following installed on your system:
- **[Node.js](https://nodejs.org/en/download)**
- **[Python](https://www.python.org/downloads/)**
- **[Visual Studio Code](https://code.visualstudio.com/)** (or your preferred code editor)
- **[MiKTeX](https://miktex.org/download)**

## Creating the Discord Bot

1. Go to the **[Discord Developer Portal](https://discord.com/developers/applications)** and click **New Application**.
2. Navigate to the **Bot** tab on the left menu.
3. Scroll down to **Privileged Gateway Intents** and enable all three:
   - Presence Intent
   - Server Members Intent
   - Message Content Intent
![Discord Bot Intents Screenshot](https://i.postimg.cc/J7Y2vwLy/Screenshot-2026-04-10-153939.png)
4. Navigate to the **OAuth2 > URL Generator** tab.
5. Under **Scopes**, select `bot`. Under **Bot Permissions**, select `Administrator`. 
![URL Generator](https://i.postimg.cc/YCCfH0zG/image.png)
6. Copy the generated URL at the bottom of the page, paste it into your browser, and add the bot to your server.

## Setting up the Database

Before installing the bot, you need to set up your database. Follow the instructions provided in the database repository:  


## Installing and Configuring the Discord Bot

1. **Prepare your workspace.**
   Download the folder using the "Download Folder" button at the top of the page and extract it in File Explorer, open it in VS Code, and open a new terminal.

   ![Open Folder](https://i.postimg.cc/vB0bCPYd/image.png)
   ![New Terminal](https://i.postimg.cc/qvQ9QNj2/image.png)

2. **Install dependencies.**
   Run the following commands in your terminal:
   ```bash
   npm install
   npx playwright install
   python -m venv venv; .\venv\Scripts\python -m pip install --upgrade pip; .\venv\Scripts\python -m pip install -r requirements.txt
   ```

3. **Set up your environment variables and configuration.**
   Create two new files in your folder: `.env` and `config.json`. Fill them out using the provided `.example` files as a guide. 
   * You **must** provide a value for any fields that are completely empty (`""`). 
   * For the other fields, you may use the default values provided in the example files.

   > **Tip: Finding Discord IDs**
   > Ensure you use the **ID** of roles and channels, not their names. You can get these by enabling **Developer Mode** in your Discord Advanced Settings, then right-clicking the channel or role and selecting "Copy ID".

   ![Developer Mode](https://i.postimg.cc/q7xg1XW5/image.png)
   ![Channel ID](https://i.postimg.cc/tJXchyWz/image.png)
   ![Role ID](https://i.postimg.cc/zDt7dnr5/image.png)
   ![Config](https://i.postimg.cc/9MGPtnjv/image.png)
   ![Env](https://i.postimg.cc/DmV8j2dc/image.png)

### Configuring Progress Bar Emojis

In order to use the progress bar, you must upload the custom emojis to your Discord application.

1. Go to the **Emojis** section of your bot in the Discord Developer Portal.
2. Upload the images found in the `emojis/progress_bar` folder of your project.
3. Once uploaded, click **Copy Markdown**. Your clipboard will now contain a string formatted like `<:emoji_name:id>`.
4. Navigate to your `config.json` file and paste the copied markdown into the relevant fields.

![Emojis Upload](https://i.postimg.cc/65GWjJP4/image.png)
![Emojis Folder](https://i.postimg.cc/kgbyg4pR/image.png)
![Copy Markdown](https://i.postimg.cc/0yQLWpj4/image.png)

### Configuring the Env

You will need to gather several keys and IDs to fill out your `.env` file. Here is where to find them:

* **CLIENT_ID**: Discord Developer Portal -> **General Information** -> Copy **Application ID**.
* **DISCORD_TOKEN**: Discord Developer Portal -> **Bot** -> Click **Reset Token**.
  ![Discord Token](https://i.postimg.cc/mrZnKTtV/image.png)
* **RESOURCE_WEBHOOK_URL** & **LOGS_WEBHOOK_URL** & **STARTUP_WEBHOOK_URL** & **ERROR_WEBHOOK_URL**: Go to your target Discord channel's **Settings** -> **Integrations** -> **Webhooks** and create/copy the Webhook URL.
  ![Webhook](https://i.postimg.cc/dt6r4CZX/image.png)
* **SUPABASEURL**: Formatted as `https://PROJECT_ID.supabase.co`. You can find your Project ID in Supabase under **Settings** -> **General**.

  ![Supabase Settings General](https://i.postimg.cc/T172WThF/image.png)
* **SUPABASEKEY**: In Supabase, go to **Settings** -> **API Keys** and copy the `secret` key.

![Env Example](https://i.postimg.cc/DmV8j2dc/image.png)

### Configuring AI API Keys

AI provider keys are read from the bot's `.env` file. Set at least one provider key, for example `GEMINI_API_KEY` for Gemini; supported names are `GEMINI_API_KEY`, `MISTRAL_API_KEY`, `QWEN_API_KEY`, and `OPENROUTER_API_KEY`. Choose a model for the same provider in the bot's AI settings. You can generate a Gemini key at [Google AI Studio](https://aistudio.google.com/api-keys).

Do not put provider keys in `apikeys.txt`. The `.env.example` file lists the available environment variables; copy those names into `.env` and set the values there. Keep `.env` private and do not commit it.

## Configuring Commands

To make the Discord bot's commands appear, ensure your terminal is in the bot folder and run:
   ```bash
   node deployment
   ```
   > **Note:** You only need to do this once. Run it again only if new commands are added or existing ones are modified. The commands will remain registered even if the bot goes offline.

## Running the Discord Bot

Once all your files are configured and saved, ensure your terminal is in the bot folder and run:
   ```bash
   node launcher
   ```

**Congrats! Your bot should now be online and running!**
