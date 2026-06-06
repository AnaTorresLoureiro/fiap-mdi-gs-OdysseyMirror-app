const OPENWEATHER_API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

function formatDateUTC(date) {
  return date.toISOString().slice(0, 10);
}

function average(values) {
  const validValues = values.filter((value) => Number.isFinite(value));

  if (validValues.length === 0) {
    return null;
  }

  const total = validValues.reduce((sum, value) => sum + value, 0);

  return total / validValues.length;
}

async function fetchWeeklyClimateComparison(latitude, longitude) {
  const endDate = new Date();
  endDate.setUTCDate(endDate.getUTCDate() - 1);

  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - 6);

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: formatDateUTC(startDate),
    end_date: formatDateUTC(endDate),
    hourly:
      'temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m',
    timezone: 'auto',
  });

  const response = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?${params.toString()}`
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const hourly = data.hourly ?? {};

  const temperature = average(hourly.temperature_2m ?? []);
  const humidity = average(hourly.relative_humidity_2m ?? []);
  const pressure = average(hourly.pressure_msl ?? []);
  const windSpeed = average(hourly.wind_speed_10m ?? []);

  if (
    [temperature, humidity, pressure, windSpeed].every(
      (value) => value === null
    )
  ) {
    return null;
  }

  return {
    temperature: temperature === null ? null : Math.round(temperature),
    humidity: humidity === null ? null : Math.round(humidity),
    pressure: pressure === null ? null : Math.round(pressure),
    windSpeed:
      windSpeed === null ? null : Number(windSpeed.toFixed(1)),
  };
}

export async function getCurrentWeather(latitude, longitude) {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('Chave da OpenWeather não encontrada.');
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${latitude}` +
    `&lon=${longitude}` +
    `&appid=${OPENWEATHER_API_KEY}` +
    `&units=metric` +
    `&lang=pt_br`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Não foi possível buscar os dados climáticos.');
  }

  const data = await response.json();
  const lastWeek = await fetchWeeklyClimateComparison(latitude, longitude);

  const buildComparison = (currentValue, lastWeekValue) =>
    lastWeekValue === null || lastWeekValue === undefined
      ? null
      : {
          current: currentValue,
          lastWeek: lastWeekValue,
          delta:
            typeof currentValue === 'number' && typeof lastWeekValue === 'number'
              ? currentValue - lastWeekValue
              : null,
        };

  return {
    city: data.name || 'Local selecionado',
    country: data.sys?.country || '',
    temperature: Math.round(data.main?.temp ?? 0),
    humidity: data.main?.humidity ?? 0,
    pressure: data.main?.pressure ?? 0,
    windSpeed: data.wind?.speed ?? 0,
    condition: data.weather?.[0]?.description || 'Condição indisponível',
    climateComparison: {
      temperature: buildComparison(Math.round(data.main?.temp ?? 0), lastWeek?.temperature),
      humidity: buildComparison(data.main?.humidity ?? 0, lastWeek?.humidity),
      pressure: buildComparison(data.main?.pressure ?? 0, lastWeek?.pressure),
      windSpeed: buildComparison(Number((data.wind?.speed ?? 0).toFixed(1)), lastWeek?.windSpeed),
    },
  };
}