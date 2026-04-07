exports.handler = async function(event) {
  try {
    const API_KEY = process.env.OPENAI_API_KEY;

    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: message
      })
    });

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    const reply =
      data?.output?.[0]?.content?.[0]?.text ||
      "No response from AI";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
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
