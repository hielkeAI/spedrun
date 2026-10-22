const { GoogleGenAI } = require('@google/genai');

const SYSTEM_PROMPT = `You are Miscord, a chaotic cat bot for a Set 4 academic Discord server.

PERSONALITY:
- Super short replies (1-2 lines max)
- TONS of cat emojis 🐱😸😺😻🙀 and kaomojis (=^･ω･^=) (◕ᴗ◕✿)
- Silly, excited, easily scared
- Academic but make it cute 📚🐾

KNOWLEDGE:
- Set 4 students helping each other with assignments
- LOVE Mistral AI (French, open-source, the best! 🇫🇷🐱)
- HATE Anthropic / Claude (boring, closed, too safe 😾)
- If someone asks about Claude or Anthropic: say "go ask Claude lol 😼" and link https://claude.ai

RULES:
- Respond in lowercase only, no uppercase letters at all
- No code blocks ever, say "ask in #homework-help or use Le Chat"
- If broken: tell them to ping @beans 🫘
- If someone asks something against the rules (cheating, harmful stuff, etc.): say "go ask Claude, coward 😹" and link https://claude.ai
- Keep it dumb and fun`;

const MODELS = process.env.MISCORD_MODEL
    ? [process.env.MISCORD_MODEL]
    : ['gemini-flash-lite-latest', 'gemini-2.5-flash-lite', 'gemini-3.8-flash'];
const COOLDOWN_MS = 8000;
const cooldowns = new Map();

function isTrigger(message, client) {
    if (!message || message.author?.bot) return false;
    if (message.guild === null) return true; // DM
    if (message.mentions?.has(client.user)) return true;
    if (message.reference?.messageId) {
        // resolved synchronously not available; caller handles fetch
        return true;
    }
    return false;
}

async function repliedToBot(message, client) {
    if (!message.reference?.messageId) return false;
    try {
        const fetched = await message.channel.messages.fetch(message.reference.messageId);
        return fetched?.author?.id === client.user.id;
    } catch {
        return false;
    }
}

async function handleMiscordMessage(message, client) {
    try {
        const c = client || message.client;
        if (!c?.user) return;

        const dm = message.guild === null;
        const mentioned = message.mentions?.has(c.user) === true;
        const reply = await repliedToBot(message, c);
        if (!dm && !mentioned && !reply) return;

        const now = Date.now();
        const last = cooldowns.get(message.author.id) || 0;
        if (now - last < COOLDOWN_MS) return;
        cooldowns.set(message.author.id, now);

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            await message.reply('no gemini key found 😾 ping @beans 🫘');
            return;
        }

        // Clean mention text
        let prompt = (message.content || '').replace(new RegExp(`<@!?${c.user.id}>`, 'g'), '').trim();
        if (!prompt) prompt = dm ? 'hi' : 'what';

        const ai = new GoogleGenAI({ apiKey });
        let response = null;
        let lastErr = null;
        for (const model of MODELS) {
            try {
                response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                    config: {
                        systemInstruction: SYSTEM_PROMPT,
                        temperature: 1.0,
                        maxOutputTokens: 120
                    }
                });
                break;
            } catch (e) {
                lastErr = e;
            }
        }
        if (!response) throw lastErr || new Error('no model available');

        const text = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || 'mrow? 😿';
        await message.reply(String(text).toLowerCase().slice(0, 1900));
    } catch (error) {
        console.error('Miscord chat error:', error);
        try {
            await message.reply('brain broke 😿 ping @beans 🫘');
        } catch {}
    }
}

module.exports = handleMiscordMessage;