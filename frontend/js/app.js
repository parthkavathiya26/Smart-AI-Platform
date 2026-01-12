async function sendMessage() {
  const inputBox = document.getElementById("userInput");
  const input = inputBox.value.trim();

  if (input === "") return;

  const messagesDiv = document.getElementById("messages");

  // Show user message
  messagesDiv.innerHTML +=
    `<div class="message user"><b>You:</b> ${input}</div>`;

  inputBox.value = "";

  try {
    // Call chatbot backend
    const response = await fetch("http://127.0.0.1:8000/chatbot/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    if (!response.ok) {
      throw new Error(`Chatbot API error: ${response.status}`);
    }

    const data = await response.json();

    // Show bot reply
    messagesDiv.innerHTML +=
      `<div class="message bot"><b>Bot:</b> ${data.response || "No response"}</div>`;

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (err) {
    console.error(err);
    messagesDiv.innerHTML +=
      `<div class="message bot"><b>Bot:</b> Error fetching response</div>`;
  }
}

// Enter key support
function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// ========== Recommendation System ==========

// Correct backend route here (check your FastAPI /docs)
const RECOMMEND_API = "http://127.0.0.1:8000/recommend"; // update if route is different

async function getRecommendations(userId) {
  const container = document.getElementById("recommendation-container");
  container.innerHTML = "Loading recommendations...";

  try {
    const response = await fetch(RECOMMEND_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    if (!response.ok) {
      throw new Error(`Recommendation API error: ${response.status}`);
    }

    const data = await response.json();

    // Safe check
    const items = data.recommendations || [];
    if (items.length === 0) {
      container.innerHTML = "No recommendations available";
      return;
    }

    // Display recommendations
    container.innerHTML = "";
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "recommend-item";
      div.textContent = item;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "Error fetching recommendations";
  }
}

// Button click event
document.getElementById("getRecBtn").addEventListener("click", () => {
  getRecommendations("123"); // example user id
});
async function getPrediction() {
  const input = document.getElementById("predictInput").value.trim();
  const resultDiv = document.getElementById("predictionResult");

  if (!input) return;

  resultDiv.innerHTML = "Loading prediction...";

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input_text: input }) // backend ke hisab se key change ho sakta hai
    });

    if (!response.ok) throw new Error(`Prediction API error: ${response.status}`);

    const data = await response.json();
    resultDiv.innerHTML = data.prediction || "No prediction available";
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "Error fetching prediction";
  }
}

// Button click event
document.getElementById("predictBtn").addEventListener("click", getPrediction);
