async function sendMessage() {
    const inputBox = document.getElementById("userInput");
    const message = inputBox.value;
    if (!message) return;

    // Display user message
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p><b>You:</b> ${message}</p>`;
    inputBox.value = "";

    try {
        // Send message to backend
        const response = await fetch("http://127.0.0.1:8000/chatbot/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Display chatbot response
        chatbox.innerHTML += `<p><b>Bot:</b> ${data.response}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;

    } catch (error) {
        console.error("Error:", error);
        chatbox.innerHTML += `<p style="color:red;"><b>Error connecting to bot</b></p>`;
    }
}
