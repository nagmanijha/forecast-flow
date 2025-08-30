export const generateForecastData = () => {
  const data = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Historical Sales': Math.floor(Math.random() * (200 - 150 + 1) + 150) + i * 0.5,
      'Forecast': null,
    });
  }
  const lastHistoricalValue = data[data.length - 1]['Historical Sales'];
  data[data.length - 1]['Forecast'] = lastHistoricalValue;

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const prevForecast = data[data.length - 1]['Forecast'];
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Historical Sales': null,
      'Forecast': Math.max(100, prevForecast + (Math.random() - 0.45) * 15),
    });
  }
  return data;
};