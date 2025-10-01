// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { defaultPrompt, userPrompt } = await req.json();

//     const prompt = `
// You are a course recommendation engine.
// Based on the following context, respond strictly in JSON array format with objects containing "title" and "url".

// Context:
// ${defaultPrompt}
// User request:
// ${userPrompt}

// Respond like:
// [
//   { "title": "Course Name", "url": "https://example.com" },
//   { "title": "Another Course", "url": "https://another.com" }
// ]
// `;

//     // ✅ Call Gemini API
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=AIzaSyBznulnNoH3hgvvU60NiCcNko1RwAZ3dAM`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     // Gemini’s text output is here:
//     const modelOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

//     // Try parsing JSON (Gemini should return JSON if prompt is clear)
//     let courses;
//     try {
//       courses = JSON.parse(modelOutput);
//     } catch (err) {
//       console.warn("⚠️ Could not parse Gemini output, returning raw text.");
//       courses = [{ title: "Raw Output", url: modelOutput }];
//     }

//     return NextResponse.json({ courses });
//   } catch (e) {
//     console.error("AI course recs error", e);
//     return NextResponse.json({ courses: [] }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { defaultPrompt, userPrompt } = await req.json();

    const prompt = `
You are a course recommendation engine.
Respond STRICTLY in JSON array format with 3 objects, each containing "title" and "url".

Context:
${defaultPrompt}
User request:
${userPrompt}

Format example:
[
  { "title": "Course Name", "url": "https://example.com" },
  { "title": "Another Course", "url": "https://another.com" }
]
`;

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await resp.json();
    let textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // 🧹 Clean markdown formatting if Gemini added ```json or ```
    textResponse = textResponse
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Try parsing again
    let courses;
    try {
      courses = JSON.parse(textResponse);
    } catch (err) {
      console.error("❌ Still failed to parse JSON. Raw response:", textResponse);
      courses = [];
    }

    return NextResponse.json({ courses });
  } catch (e) {
    console.error("AI course recs error", e);
    return NextResponse.json({ courses: [] }, { status: 500 });
  }
}
