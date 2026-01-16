// ================= CHATBOT =================
async function sendMessage() {
  const inputBox = document.getElementById("userInput");
  const input = inputBox.value.trim();
  if (input === "") return;

  const messagesDiv = document.getElementById("messages");
  const typingDiv = document.getElementById("typing");

  messagesDiv.innerHTML += `
    <div class="message user"><b>You:</b> ${input}</div>
  `;
  inputBox.value = "";

  // show typing
  typingDiv.style.display = "block";

  try {
    const response = await fetch("http://127.0.0.1:8000/chatbot/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();

    // hide typing
    typingDiv.style.display = "none";

    messagesDiv.innerHTML += `
      <div class="message bot"><b>Bot:</b> ${data.response}</div>
    `;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  } catch (err) {
    typingDiv.style.display = "none";
    messagesDiv.innerHTML += `
      <div class="message bot"><b>Bot:</b> Error</div>
    `;
  }
}


// ================= RECOMMENDATION =================
const RECOMMEND_API = "http://127.0.0.1:8000/recommendation/recommend";

async function getRecommendations(userId) {
  const container = document.getElementById("recommendation-container");
  if (!container) return;

  container.innerHTML = "Loading recommendations...";

  try {
    const response = await fetch(RECOMMEND_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    if (!response.ok) throw new Error(response.status);

    const data = await response.json();
    container.innerHTML = "";

    data.recommendations.forEach(item => {
      const div = document.createElement("div");
      div.className = "recommend-item";
      div.innerText = item;
      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "Error fetching recommendations";
  }
}

document.getElementById("getRecBtn")?.addEventListener("click", () => {
  getRecommendations(123);
});

// ================= SALES PREDICTION =================
let chart;
const PREDICT_API = "http://127.0.0.1:8000/prediction/predict";

async function predictSales() {
  const tv = Number(document.getElementById("tv")?.value || 0);
  const radio = Number(document.getElementById("radio")?.value || 0);
  const newspaper = Number(document.getElementById("news")?.value || 0);

  const resultDiv = document.getElementById("salesPredictionResult");
  const canvas = document.getElementById("salesChart");

  if (!canvas || !resultDiv) {
    alert("Canvas or result element missing in HTML");
    return;
  }

  resultDiv.innerText = "Predicting...";

  try {
    const response = await fetch(PREDICT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tv: tv,
        radio: radio,
        newspaper: newspaper
      })
    });

    if (!response.ok) throw new Error(response.status);

    const data = await response.json();
    const prediction = data.prediction;

    resultDiv.innerText = "Predicted Sales: " + prediction;

    const ctx = canvas.getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["TV", "Radio", "Newspaper", "Predicted Sales"],
        datasets: [{
          label: "Values",
          data: [tv, radio, newspaper, prediction]
        }]
      }
    });

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Prediction failed";
  }
}
