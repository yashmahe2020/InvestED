let portfolio = [];
let currentStock = {};

const API_KEY = 'O02Z93YYPNOWD2JW'; // Replace with your API Key
const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${API_KEY}&symbol=`;

async function getStockData() {
    const ticker = document.getElementById('tickerSearch').value.toUpperCase();
    if (!ticker) {
        alert("Please enter a valid ticker symbol");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}${ticker}`);
        const data = await response.json();
        if (data['Error Message']) {
            alert("Invalid ticker symbol or API limit reached.");
            return;
        }
        
        const stockInfo = data["Time Series (5min)"];
        const latestKey = Object.keys(stockInfo)[0];
        const stockPrice = stockInfo[latestKey]["1. open"];
        
        currentStock = {
            ticker: ticker,
            price: parseFloat(stockPrice),
            date: latestKey
        };
        
        document.getElementById('stockInfo').innerHTML = `
            <h3>${ticker}</h3>
            <p>Price: $${stockPrice}</p>
            <p>Date: ${latestKey}</p>
        `;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Unable to fetch stock data.");
    }
}

function investStock() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    const shares = investmentAmount / currentStock.price;
    const investment = {
        ticker: currentStock.ticker,
        amountInvested: investmentAmount,
        sharesBought: shares,
        buyPrice: currentStock.price,
        buyDate: currentStock.date
    };

    portfolio.push(investment);
    displayPortfolio();
}

function displayPortfolio() {
    let portfolioHTML = "<ul>";

    portfolio.forEach(stock => {
        portfolioHTML += `
            <li>
                <strong>${stock.ticker}</strong>: 
                Invested $${stock.amountInvested.toFixed(2)}, 
                Shares: ${stock.sharesBought.toFixed(4)}, 
                Buy Price: $${stock.buyPrice.toFixed(2)}
            </li>
        `;
    });

    portfolioHTML += "</ul>";
    document.getElementById('portfolioList').innerHTML = portfolioHTML;
}
