// API: Application programing interface is a protocol or set of rule that define how different component of a software system should interact with each other.
// https://exchangerate.host/#/ for usage


// async function

// Fetching the symbol data(currency option) from API endpoint

    const getCurrencyOptions = async () => {
    const optionsUrl = 'https://api.exchangerate.host/symbols';
    const response = await fetch (optionsUrl);
    const json = await response.json();

    return json.symbols;
  }
  // getCurrencyOptions().then(console.log);
  // fetching the currency rates(convert result) data from API endpoint

    const getCurrencyRates = async (fromCurrency, toCurrency) => {
    const currencyConvertUrl = new URL('https://api.exchangerate.host/convert');
    currencyConvertUrl.searchParams.append('from', fromCurrency);
    currencyConvertUrl.searchParams.append('to', toCurrency);

    const response = await fetch(currencyConvertUrl);
    const json = await response.json();

    return json.result;

  }
  //  This function will create new option element and create it for the select element being pass an argument

  const appendOptionsElToSelectEl = (selectEl, optionItem) => {
      const optionEl = document.createElement('option');
      optionEl.value = optionItem.code;
      optionEl.textContent = optionItem.description;

      selectEl.appendChild(optionEl);
  }

    const populateSelectEl = (selectEl, optionList) => {
        optionList.forEach((optionItem) => {
          appendOptionsElToSelectEl(selectEl, optionItem);
        })
    };

    //  set up currencies and make the reference to the DOM elements
      const setUpCurrencies = async () => {

      const fromCurrency = document.querySelector('#fromCurrency');
      const toCurrency = document.querySelector('#toCurrency');

      const currencyOptions = await getCurrencyOptions()

      // to convert from Object to an Array
      const currencies = Object.keys(currencyOptions).map(currencyKeys => 
      currencyOptions[currencyKeys]);

      populateSelectEl(fromCurrency, currencies);
      populateSelectEl(toCurrency, currencies);
    };

    setUpCurrencies();

    //  Setting up the event listener for our element

    const setUpEventListener = () => {

      const formEl = document.getElementById('convertForm');
      formEl.addEventListener('submit', async event => {
        
        event.preventDefault();

        const fromCurrency = document.querySelector('#fromCurrency');
        const toCurrency = document.querySelector('#toCurrency');
        const amount = document.querySelector('#amount');
        const convertResultEl = document.querySelector('#convertResult');
        
        try {
          const rate = await getCurrencyRates(fromCurrency.value, toCurrency.value);

          const amountValue = Number(amount.value);
          const conversionRate = Number(amountValue * rate).toFixed(2);
          convertResultEl.textContent = `${amountValue} ${fromCurrency.value} = ${conversionRate} ${toCurrency.value}`
        } catch (error) {
            convertResultEl.textContent = `There is an error fetching data[${error.message}]`
            convertResultEl.classList.add('error');
        };

      });
    }



    setUpEventListener();
    
    
