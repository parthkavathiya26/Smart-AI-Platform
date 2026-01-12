async function sendMessage() {
  const inputBox = document.getElementById("userInput");
  const input = inputBox.value;

  // empty message block
  if (!input.trim()) return;

  const response = await fetch("http://127.0.0.1:8000/chatbot/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();

  document.getElementById("messages").innerHTML +=
    `<p><b>You:</b> ${input}</p>
     <p><b>Bot:</b> ${data.response}</p>`;

  // input clear
  inputBox.value = "";
}

/* 👇👇 YAHI PASTE KARNA HAI — sendMessage ke niche */
function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
