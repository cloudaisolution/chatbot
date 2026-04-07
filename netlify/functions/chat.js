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

return {
  statusCode: 200,
  body: JSON.stringify({
    reply: data?.output?.[0]?.content?.[0]?.text || "No response from AI"
  })
};
