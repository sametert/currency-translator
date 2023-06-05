const API_key = "601eefc884e13a8e67da0421";
const url = "https://v6.exchangerate-api.com/v6/"+ API_key;

//element info
const currency1 = document.getElementById("currency_one");
const currency2 = document.getElementById("currency_two");
const list1     = document.getElementById("list_one");
const list2     = document.getElementById("list_two");
const amount    = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result    = document.getElementById("result");

async function foreignCurrency() {
    const request = await fetch(url+"/codes");
    const data    = await request.json();
    const items   = data.supported_codes;
   
    let options;
    for(let item of items) {

        options += `<option value=${item[0]}>${item[1]}</option>`;

    }

    list1.innerHTML = options;
    list2.innerHTML = options;
}

foreignCurrency();


calculate.addEventListener("click" , async() => {
    const doviz1 = currency1.value;
    const doviz2 = currency2.value;
    const miktar = amount.value;

    const istek = await fetch(url+"/latest/"+doviz1);
    const data  = await istek.json();


    const result = (data.conversion_rates[doviz2] * miktar).toFixed(3);
    displayCurrency(result,doviz1,doviz2,miktar);

    

    
});

const displayCurrency = (calculate,firstMoney,secondMoney,howMuch)=> {
    const htmlTag = `
        <div class="card border-primary">
            <div class="card-body text-center" style="font-size: 30px;">
                ${howMuch}  ${firstMoney} = ${calculate}  ${secondMoney}
            </div>
        </div>
        `
   result.innerHTML = htmlTag;
}

