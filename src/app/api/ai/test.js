const res = await fetch("/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    defaultPrompt: "Recommend beginner-friendly React courses.",
    userPrompt: "I want free resources only."
  }),
});
const data = await res.json();
console.log(data.courses);