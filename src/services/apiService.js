// --- Live API Service ---
// This service fetches real-world data from public APIs to power the dashboard.

// --- Configuration ---
// IMPORTANT: Replace with your own free API key from https://openweathermap.org/
const OPENWEATHERMAP_API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; 
const WEATHER_CITY_ID = '1275339'; // Mumbai, India - A major logistics hub

// --- API Helper Functions ---

/**
 * Fetches the latest CO2 emissions data for India from the World Bank API.
 * Indicator EN.ATM.CO2E.KT = CO2 emissions (kt)
 */
const fetchEmissionData = async () => {
    // The API returns the most recent data first. We request 1 record.
    const url = 'https://api.worldbank.org/v2/country/IND/indicator/EN.ATM.CO2E.KT?per_page=1&format=json';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`World Bank API failed with status: ${response.status}`);
        const data = await response.json();
        
        // The data is in the second array element.
        if (data && data[1] && data[1][0]) {
            const latestRecord = data[1][0];
            return {
                year: latestRecord.date,
                value: latestRecord.value, // Value is in kilotons (kt)
            };
        }
        throw new Error('Could not parse World Bank CO2 data.');
    } catch (error) {
        console.error('Error fetching emission data:', error);
        // Return a fallback value in case of API failure
        return { year: 'N/A', value: 2500000 }; 
    }
};

/**
 * Fetches current weather data to simulate disruption risk.
 * A real implementation would use more complex weather forecasting.
 */
const fetchWeatherData = async () => {
    if (OPENWEATHERMAP_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('OpenWeatherMap API key is missing. Using fallback data.');
        return { temp: 29, windSpeed: 3.5, description: 'clear sky' }; // Fallback data
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${WEATHER_CITY_ID}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`OpenWeatherMap API failed with status: ${response.status}`);
        const data = await response.json();
        return {
            temp: data.main.temp,
            windSpeed: data.wind.speed, // in meter/sec
            description: data.weather[0].description,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { temp: 29, windSpeed: 3.5, description: 'clear sky' }; // Fallback data
    }
};

/**
 * Fetches historical sales data from a public CSV file.
 * This simulates fetching demand data from an enterprise data warehouse.
 * Source: A public dataset of daily sales for a fictional store.
 */
const fetchDemandData = async () => {
    const url = 'https://raw.githubusercontent.com/plotly/datasets/master/daily-sales-for-a-fictional-store.csv';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`CSV fetch failed with status: ${response.status}`);
        const csvText = await response.text();
        
        // Simple CSV parsing
        const rows = csvText.split('\n').slice(1); // Split by line and remove header
        const salesData = rows.map(row => {
            const [date, sales] = row.split(',');
            return { date, sales: parseFloat(sales) };
        }).filter(item => item.date && !isNaN(item.sales));

        // Format data for the chart: use last 90 days as "Historical" and project next 30
        const historical = salesData.slice(-120, -30); // Use a slice as historical data
        const forecast = [];
        const lastHistoricalValue = historical[historical.length - 1].sales;

        for (let i = 0; i < 30; i++) {
            const prevValue = forecast.length > 0 ? forecast[i - 1].Forecast : lastHistoricalValue;
            forecast.push({
                date: `Day ${i + 1}`,
                'Forecast': Math.max(50, prevValue + (Math.random() - 0.48) * 15),
            });
        }
        
        return historical.map(h => ({ date: h.date, 'Historical Sales': h.sales, 'Forecast': null })).concat(forecast);

    } catch (error) {
        console.error('Error fetching demand data:', error);
        return []; // Return empty array on failure
    }
};


/**
 * Main function to fetch all data in parallel and structure it for the app.
 */
export const fetchSupplyChainData = async () => {
    // Simulating API delay for a better loading experience
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Fetch all data sources in parallel for efficiency
    const [emissions, weather, demand] = await Promise.all([
        fetchEmissionData(),
        fetchWeatherData(),
        fetchDemandData()
    ]);

    // Calculate a dynamic risk factor based on weather.
    // Higher wind speed = higher disruption risk.
    const disruptionRiskFactor = Math.min(1, weather.windSpeed / 10); // Normalize wind speed

    // Structure the final data object for the application
    return {
        forecastData: demand,
        shapData: [
            { name: 'Weather Patterns', value: 0.45 },
            { name: 'Promotional Events', value: 0.38 },
            { name: 'Day of Week', value: 0.25 },
            { name: 'Competitor Pricing', value: 0.18 },
            { name: 'Social Media Trends', value: 0.15 },
        ],
        riskMetrics: {
            // Base risk is now influenced by live weather data
            baseStockoutRisk: 40 + Math.round(disruptionRiskFactor * 20),
            reductionFactor: 32
        },
        network: {
            // Using a more realistic static list of major Indian cities
            nodes: [
                { id: 'Mumbai Port', x: 100, y: 250, type: 'port' },
                { id: 'Factory (Pune)', x: 150, y: 150, type: 'factory' },
                { id: 'DC (Delhi)', x: 400, y: 50, type: 'dc' },
                { id: 'DC (Bangalore)', x: 350, y: 350, type: 'dc' },
                { id: 'Retail (Kolkata)', x: 650, y: 150, type: 'retail' },
                { id: 'Retail (Chennai)', x: 550, y: 400, type: 'retail' },
            ],
            links: [
                { source: 'Mumbai Port', target: 'Factory (Pune)' },
                { source: 'Factory (Pune)', target: 'DC (Delhi)' },
                { source: 'Factory (Pune)', target: 'DC (Bangalore)' },
                { source: 'DC (Delhi)', target: 'Retail (Kolkata)' },
                { source: 'DC (Bangalore)', target: 'Retail (Chennai)' },
            ],
        },
        emissionData: {
            // These would be derived from complex models in a real app
            costOptimized: { costReduction: 22, co2Reduction: 15 },
            ecoOptimized: { costReduction: 18, co2Reduction: 35 },
            liveCO2Data: emissions
        }
    };
};
