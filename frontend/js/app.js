async function sendMessage() {
  const inputBox = document.getElementById("userInput");
  const input = inputBox.value.trim();

  if (input === "") return;

  const messagesDiv = document.getElementById("messages");

  // Show user message
  messagesDiv.innerHTML +=
    `<div class="message user"><b>You:</b> ${input}</div>`;

  inputBox.value = "";

  // Call backend
  const response = await fetch("http://127.0.0.1:8000/chatbot/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();

  // Show bot reply
  messagesDiv.innerHTML +=
    `<div class="message bot"><b>Bot:</b> ${data.response}</div>`;

  // Auto scroll
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Enter key support
function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
