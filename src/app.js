import axios from "axios";

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit",handleForm);

const errorInfo = document.getElementById("error");
const countryInfo = document.getElementById("country-info");

function handleForm(e) {
    e.preventDefault();

    const inputField = document.getElementById("input-field");
    getCountryData(inputField.value);

    inputField.value = "";
}

async function getCountryData(name) {
    countryInfo.innerHTML = ``;
    errorInfo.innerHTML = ``;

    try{
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        console.log(result.data[0]);
        
    countryInfo.innerHTML = `
    <article class="country-info-box">
    <span class="flag-tittle">
    <img src="${country.flag}" alt="countryflag" class="flag">
    <h2>${country.name}</h2>
    </span>
    <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people.</p>
    <p>The capital is ${country.capital} ${currencyDescription(country.currencies)}.</p>
    <p>${countryLanguage(country.languages)}.</p>
    </article>
`;
    } catch (e) {
        console.error(e);
        errorInfo.innerHTML = `
        <p class="error-message">${name} komt niet voor. Probeer het opnieuw.</p>
        `
    }

}

getCountryData();

function currencyDescription(currencies) {
    let output = "and you can pay with ";

    if(currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}`

    }
return output + `${currencies[0].name}`;
    
}

function countryLanguage(languages) {
    let output = "They speak ";

    if(languages.length === 2) {
        return output + `${languages[0].name} and ${languages[1].name}`

    }

    if (languages.length === 3) {
        return output + `${languages[0].name}, ${languages[1].name} and ${languages[2].name}`

    }
    return output + `${languages[0].name}`

}

