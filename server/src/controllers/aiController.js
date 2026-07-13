export const explainCode = async (req, res) => {

  const { code } = req.body;

  if (!code || code.trim() === "") {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const GEMINI_URL =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent` +
      `?key=${process.env.GEMINI_API_KEY}`;

    const prompt = `Explain what the following code does in simple, plain English. 
    Be concise. Highlight what each section does and mention any important patterns or risks.

    Code:
    \`\`\`
    ${code}
    \`\`\``;

    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    // Parse the JSON body from Gemini's response.
    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("[explainCode] Gemini API error:", data);
      return res
        .status(502)
        .json({ error: "Gemini API returned an error", details: data });
    }

    // Drill into the nested response structure to grab the generated text.
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!explanation) {
      return res
        .status(502)
        .json({ error: "Gemini returned an empty response" });
    }

    res.status(200).json({ explanation });
  } catch (error) {
    // Network failure, timeout, or unexpected crash.
    console.error("[explainCode] Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to reach Gemini API", details: error.message });
  }
};
