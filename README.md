# Mizan

**Mizan** is a web application designed for **Bijouterie Al Andalous**, a jewellery shop located in Nador, Morocco. It provides a simple, centralized dashboard where users can consult gold and silver market prices, follow their price variations, explore historical prices, and estimate the value of jewellery based on its weight.

The application aims to bring together precious-metal market information in one accessible interface, making it easier for jewellers and their clients to stay informed about current market conditions.

## Features

- **Current gold and silver prices** — View up-to-date spot prices for gold (XAU) and silver (XAG) in multiple currencies and weight units.
- **Price variations** — Track price changes compared with previous market prices.
- **Historical price visualization** — Explore historical gold and silver price data over time.
- **Jewellery value estimation** — Estimate the value of jewellery based on its weight and the current metal price.

## Data Source

Mizan uses the public **XAUS API** to retrieve precious-metal market data.

- **API documentation:** [https://xaus.com/api/](https://xaus.com/api/)
- **Base URL:** `https://xaus.com/api/v1`

The API serves data through standard HTTP GET requests and does not require an API key.

### Data Provided by the API

The following market data is used by Mizan:

#### Current Gold Prices

- Gold spot price (XAU).
- Price in the requested currency.
- Price in the requested weight unit: troy ounce, gram, or kilogram.
- USD spot price per troy ounce.

#### Current Silver Prices

- Silver spot price (XAG).
- Silver price per troy ounce in USD.

#### Currency Exchange Information

- Exchange rate between USD and the requested currency.
- Currency conversion information used to display precious-metal prices in currencies such as MAD, USD, and EUR.

#### Historical Market Prices

- Historical gold and silver price data.
- Historical timestamps or dates.
- Opening, highest, lowest, and closing prices where provided by the historical endpoint.

#### Data Update Information

- Last API response update timestamp.
- Price freshness information where provided by the API.

## Purpose

Mizan brings this information together into a single dashboard to provide:

1. **Real-time pricing** — Current gold and silver prices displayed in relevant currencies and weight units.
2. **Market tracking** — Price variations compared with previous market values, giving users a clear view of market movement.
3. **Historical analysis** — Visualization of historical price data to help identify trends over time.
4. **Value estimation** — A practical tool for estimating jewellery value based on weight and the current price of the metal.

## License

This project is developed for Bijouterie Al Andalous, Nador, Morocco.

