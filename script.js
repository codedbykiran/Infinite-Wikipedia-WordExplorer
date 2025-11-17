const greetBox = document.getElementById("greet");
const sentenceBox = document.getElementById("sentence");
const resultBox = document.getElementById("result");

const myInfo = [
  "My name is Kiran and I am a frontend developer",
  "I love building interactive web projects",
  "I enjoy learning JavaScript and improving my coding skills",
  "I create projects like loaders infinite wiki and step counter",
  "I want to become a strong JavaScript developer"
];

if (!sessionStorage.getItem("buddyShown")) {
  greetBox.innerHTML = "<h2>Hey buddy 👋</h2>";
  sessionStorage.setItem("buddyShown", "true");
}

let index = sessionStorage.getItem("infoIndex") || 0;
index = parseInt(index);

const currentSentence = myInfo[index];

let nextIndex = index + 1;
if (nextIndex >= myInfo.length) nextIndex = 0;
sessionStorage.setItem("infoIndex", nextIndex);

function displaySentence() {
  sentenceBox.innerHTML = "";

  currentSentence.split(" ").forEach(word => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.cursor = "pointer";

    span.addEventListener("click", () => fetchWiki(word));
    sentenceBox.appendChild(span);
  });
}

async function fetchWiki(word) {
  resultBox.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${word}&limit=5`
    );

    const data = await res.json();

    if (!data.pages || data.pages.length === 0) {
      resultBox.innerHTML = "No information found.";
      return;
    }

    let html = "";
    data.pages.forEach(page => {
      html += `
        <div style="margin-bottom:15px; padding:10px; border-bottom:1px solid #ddd;">
          <h3>${page.title}</h3>
          <p>${page.excerpt || "No description available"}</p>
        </div>
      `;
    });

    resultBox.innerHTML = html;

  } catch (error) {
    resultBox.innerHTML = "Error loading information.";
  }
}

displaySentence();
