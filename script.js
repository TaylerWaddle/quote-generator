const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
function showNewQuote() {
  showLoadingSpinner();
  // Pick a random quote from API quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check Author for Anonymous, and empty authors
  if (
    quote.author === "Anonymous" ||
    quote.author === "Anonymousk" ||
    !quote.author
  ) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote Length to Determine Styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    alert(error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
