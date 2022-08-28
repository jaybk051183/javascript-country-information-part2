import axios from "axios";

const searchField = document.getElementById("search-form");
searchField.addEventListener("submit",getCountryData);

const errorInfo = document.getElementById("error");
const countryInfo = document.getElementById("country-info");

function handleForm(e) {
    e.preventDefault();
    getCountryData(searchField.value);
    searchField.value = "";
}

async function getCountryData() {
    countryInfo.innerHTML = "";
    errorInfo.innerHTML = "";

    try{
        const result = await axios.get("https://restcountries.com/v2/name/panama")
        const countryInfo = result.data[0];
        console.log(result.data[0]);
        
    countryInfo.innerHTML = `
    <article>
    <span>
    <img src="${countryInfo.flag}" alt="countryflag">
    <h2>${countryInfo.name}</h2>
    </span>
    <p>${countryInfo.name} is situated in ${countryInfo.region}. It has a population of ${countryInfo.population} people.</p>
    <p>The capital is ${countryInfo.capital} and you can pay with ${countryInfo.currency}.</p>
    <p>They speak ${countryInfo.language}.</p>
    </article>
` }
    catch (e) {
        console.error(e)
    }

}






