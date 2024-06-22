const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");

async function updateRate() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/9dfe4ca0662b8bdbd215221d/latest/${currencyFirstEl.value}`
    );
    if (!response.ok) throw new Error("Failed to fetch exchange rates");
    const data = await response.json();
    const rate = data.conversion_rates[currencySecondEl.value];

    exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${rate} ${currencySecondEl.value}`;

    const calculatedValue = (worthFirstEl.value * rate).toFixed(2);
    worthSecondEl.value = calculatedValue;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    exchangeRateEl.innerText = "Error fetching exchange rates";
  }
}

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);

updateRate();
