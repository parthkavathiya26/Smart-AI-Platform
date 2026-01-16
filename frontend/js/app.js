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
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    typingDiv.style.display = "block";

    try {
        const response = await fetch("http://127.0.0.1:8000/chatbot/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });

        const data = await response.json();
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
        console.error(err);
    }
}

function handleKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}

// ================= RECOMMENDATION =================
const RECOMMEND_API = "http://127.0.0.1:8000/recommendation/recommend";

async function getRecommendations() {
    const movieInput = document.getElementById("movieInput");
    const container = document.getElementById("recommendation-container");
    const explanation = document.getElementById("recommendation-explanation");

    if (!movieInput || !container || !explanation) return;

    const movieName = movieInput.value.trim();
    if (movieName === "") {
        container.innerHTML = "";
        explanation.innerText = "Please enter a movie name.";
        return;
    }

    container.innerHTML = "Loading recommendations...";
    explanation.innerText = "";

    try {
        const response = await fetch(RECOMMEND_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: movieName })
        });

        const data = await response.json();
        container.innerHTML = "";

        if (data.error) {
            container.innerHTML = `<p style="color:red">${data.error}</p>`;
            return;
        }

        const title = document.createElement("h4");
        title.innerText = "Recommended Movies:";
        container.appendChild(title);

        data.recommended.forEach(movie => {
            const div = document.createElement("div");
            div.className = "recommend-item";
            div.innerText = movie;
            container.appendChild(div);
        });

        explanation.innerText = "Recommendations are based on similarity to your input movie.";

    } catch (err) {
        console.error(err);
        container.innerHTML = "Error fetching recommendations";
    }
}

document.getElementById("getRecBtn")?.addEventListener("click", getRecommendations);

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
        alert("Canvas or result element missing");
        return;
    }

    resultDiv.innerText = "Predicting...";

    try {
        const response = await fetch(PREDICT_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tv, radio, newspaper })
        });

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
                    data: [tv, radio, newspaper, prediction],
                    backgroundColor: ["#3b82f6", "#f97316", "#facc15", "#10b981"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

    } catch (err) {
        console.error(err);
        resultDiv.innerText = "Prediction failed";
    }
}
