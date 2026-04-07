exports.handler = async function(event) {
  try {
    const API_KEY = process.env.OPENAI_API_KEY;

    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    console.log("API RESPONSE:", data); // 🔥 debug

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data?.choices?.[0]?.message?.content || "No response from AI"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Server error 😢"
      })
    };
  }
};
