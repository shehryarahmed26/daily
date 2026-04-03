require("dotenv").config();
const Groq = require("groq-sdk");
const fs = require("fs");
const path = require("path");

const WORDS_FILE = path.join(__dirname, "..", "data", "words.json");

async function main() {
  // 1. Read existing words
  let words = [];
  try {
    const raw = fs.readFileSync(WORDS_FILE, "utf-8");
    words = JSON.parse(raw);
  } catch {
    // First run or corrupted file — start fresh
    words = [];
  }

  const existingWords = words.map((w) => w.word);
  console.log(`📚 Existing words: ${existingWords.length}`);

  // 2. Call Groq AI
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `Generate a unique English vocabulary word that is useful for students and professionals.

${existingWords.length > 0 ? `Do NOT use any of these words: ${existingWords.join(", ")}` : ""}

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "word": "Word",
  "meaning": "Clear, simple meaning",
  "sentence": "Natural example sentence using the word",
  "synonym": "2-3 synonyms separated by commas",
  "antonym": "2-3 antonyms separated by commas",
  "category": "One of: Noun, Verb, Adjective, Adverb, Idiom, Phrase",
  "difficulty": "One of: Beginner, Intermediate, Advanced"
}`;

  console.log("🤖 Asking Groq AI for a new word...");

  const chat = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.9,
    max_tokens: 300,
  });

  const response = chat.choices[0]?.message?.content;
  if (!response) {
    throw new Error("No response from Groq AI");
  }

  // 3. Parse AI response
  let newWord;
  try {
    // Clean response — remove markdown code blocks if present
    const cleaned = response.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    newWord = JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ Failed to parse AI response:", response);
    throw new Error("Invalid JSON from AI");
  }

  // Validate required fields
  const required = ["word", "meaning", "sentence", "synonym", "antonym", "category", "difficulty"];
  for (const field of required) {
    if (!newWord[field]) {
      throw new Error(`Missing field: ${field}`);
    }
  }

  // 4. Duplicate check
  if (existingWords.map((w) => w.toLowerCase()).includes(newWord.word.toLowerCase())) {
    console.error(`⚠️ Duplicate word: ${newWord.word}. Skipping.`);
    process.exit(1);
  }

  // 5. Build entry and save
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const entry = {
    id: words.length + 1,
    date: today,
    ...newWord,
  };

  words.push(entry);
  fs.writeFileSync(WORDS_FILE, JSON.stringify(words, null, 2));

  console.log(`✅ New word added: "${entry.word}" — ${entry.meaning}`);
  console.log(`📊 Total words: ${words.length}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
