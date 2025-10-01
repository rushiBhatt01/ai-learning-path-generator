// test.js
import fetch from "node-fetch"; // Only needed if Node < 18

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";

const prompt = `
You are a course recommendation engine.
List 3 free beginner-friendly React.js courses in strict JSON format:
[
  { "title": "Course Name", "url": "https://example.com" }
]
`;

async function testGemini() {
  console.log("🔑 Using model: gemini-2.5-flash");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=`, // ✅ NEW MODEL NAME
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log("🔍 Raw Gemini Response:\n", JSON.stringify(data, null, 2));

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log("\n✅ Parsed Model Output:\n", text);

  try {
    const json = JSON.parse(text);
    console.log("\n📚 Final Parsed JSON:", json);
  } catch {
    console.log("\n⚠️ Could not parse JSON automatically. Output above may need cleanup.");
  }
}

testGemini().catch(console.error);
