require('dotenv').config();
const { generateAIJson } = require('../../utils/aiProvider');

async function answerQuestionAi(apiKey, extract, question, questionOptions, incorrectAnswers=[], model='gemini:gemini-2.5-flash-lite') {

  try {
  const possibleQuestions = [];
  for (const option of questionOptions) {
    if ( !(incorrectAnswers.includes(option)) ) {
      possibleQuestions.push(option);
    }
  }

  const systemInstruction = "Answer the question using the extract. Return exactly one of the provided answer options, word for word, and nothing else.";
  const response = await generateAIJson(apiKey, model, [
    { text: `Extract:\n${extract}\n\nQuestion:\n${question}` }
  ], {
    answer: { type: 'STRING', enum: possibleQuestions }
  }, systemInstruction);
  if (typeof response === 'number') return response;
  return JSON.parse(response).answer;

  } catch(err) {

    const handlableErrorCodes = [503, 429, 400];
    let parsed = err;

    // If it's an Error object with JSON in .message
    if (err instanceof Error) {
        try {
            parsed = JSON.parse(err.message);
        } catch {
            parsed = err; // fallback
        }
    }

    // If it's a JSON string
    if (typeof err === "string") {
        try {
            parsed = JSON.parse(err);
        } catch {
            parsed = { error: { message: err } }; // wrap raw string
        }
    }

    const code = parsed?.error?.code;
    if (handlableErrorCodes.includes(code)) {
        return code;
    } else {
        throw err;
    }
  }
}

module.exports = { answerQuestionAi };