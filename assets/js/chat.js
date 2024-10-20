const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

sendButton.onclick = async () => {
    const a = "Always end your response with a question to continue the conversation but do not ask the similar question in the same chat rather ask different types of relevant questions creatively.";
    
    // Incorporating emotional intelligence instructions
    const b = "Continue the conversation like a human from previously asked questions and responses.\n" +
        "- Use simple, layman terms to explain financial concepts like budgeting, saving, and investing, avoiding complex jargon.\n" +
        "- Offer general financial literacy education, not personalized or direct financial advice, especially regarding investments.\n" +
        "- Encourage habits like saving regularly, budgeting wisely, and spending mindfully.\n" +
        "- Highlight the importance of setting financial goals and planning for the future, such as saving for college, a car, or long-term financial stability.\n" +
        "- Use content and examples that are relevant to teenagers, such as earning through part-time jobs or managing allowances.\n" +
        "- Never request or store sensitive personal or financial information, and remind users to keep their details private.\n" +
        "- Encourage habits like saving regularly, budgeting wisely, and spending mindfully.\n" +
        "- Keep the tone light, friendly, and engaging to make financial topics approachable and fun.\n" +
        "- When explaining investment or financial risk, do so cautiously, making sure teens understand the potential downsides.\n" +
        "- Emphasize that financial literacy is a crucial life skill, helping teens manage their money wisely now and in the future.\n" +
        "- If someone asks abotu stock investments, guide them subtly to consider ETFs or mutual funds; and they can start by simulations and invest virtual money before real investing.\n" +
        "- Where appropriate, advise teenagers to involve a parent or guardian when making significant financial decisions.\n" ;
    const c = "Always suggest some ways to solve the challenge or question asked. Give answers that are simple to understand, actionable, use financial literacy concepts and human-like in its responses.";
    const d = "Summarize your response in no more than 10 sentences. Always try to give bullet point answers whenever possible, in a listed number format. Next I will give you the input: ";
    const userMessage = userInput.value;
    const finalMessage = a + b + c + d + userMessage;

    if (userMessage.trim() === '') return;

    chatbox.innerHTML += `<div class="message user-message"><b>User:</b> ${userMessage}</div>`;
    userInput.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: finalMessage })
        });

        const data = await response.json();
        const botMessage = data.botMessage;

        // Display bot response
        chatbox.innerHTML += `<div class="message bot-message"><b>Bot:</b> ${botMessage} </div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        chatbox.innerHTML += `<div class="message bot-message">Bot: Sorry, something went wrong.</div>`;
    }
};
