export interface Weather {
  elevation?: number;
  current_weather_units?: {
    time?: string;
    interval?: string;
    temperature?: string;
    windspeed?: string;
    winddirection?: string;
    is_day?: string;
    weathercode?: string;
  };
  current?: {
    time: Date;
    temperature?: number;
    windspeed?: number;
    winddirection?: number;
    is_day?: number;
    weathercode?: number;
    interval?: number;
  };
  hourly?: {
    [key: string]: number[] | string;
  };
  daily?: {
    [key: string]: number[] | string;
  };
}

export interface FetchParams {
  latitude: number;
  longitude: number;
  current?: string[];
  hourly?: string[];
  daily?: string[];
  timezone?: string;
}

export const fetchWeatherByCoords = async (
  params: FetchParams,
): Promise<Weather | null> => {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.append("latitude", params.latitude.toString());
  url.searchParams.append("longitude", params.longitude.toString());

  // Always request current_weather if current is needed
  if (params.current && params.current.length > 0) {
    url.searchParams.append("current_weather", "true");
  }

  if (params.hourly && params.hourly.length > 0) {
    url.searchParams.append("hourly", params.hourly.join(","));
  }

  if (params.daily && params.daily.length > 0) {
    url.searchParams.append("daily", params.daily.join(","));
  }

  url.searchParams.append("timezone", params.timezone ?? "auto");

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const result: Weather = {};

    // Parse current weather data
    if (data.current_weather) {
      const utcOffsetSeconds = data.utc_offset_seconds ?? 0;
      const currentRaw = data.current_weather;

      result.current = {
        time: new Date(
          new Date(currentRaw.time).getTime() + utcOffsetSeconds * 1000,
        ),
        temperature: currentRaw.temperature,
        windspeed: currentRaw.windspeed,
        winddirection: currentRaw.winddirection,
        is_day: currentRaw.is_day,
        weathercode: currentRaw.weathercode,
        interval: currentRaw.interval,
      };
    }

    // Parse hourly weather data
    if (params.hourly && data.hourly) {
      const utcOffsetSeconds = data.utc_offset_seconds ?? 0;
      const hourlyRaw = data.hourly;
      const timeArray = hourlyRaw.time.map(
        (t: string) =>
          new Date(new Date(t).getTime() + utcOffsetSeconds * 1000),
      );
      const hourlyParsed: Weather["hourly"] = { time: timeArray };

      params.hourly.forEach((key) => {
        if (key in hourlyRaw) {
          hourlyParsed[key] = hourlyRaw[key];
        }
      });

      result.hourly = hourlyParsed;
    }

    // Parse daily weather data
    if (params.daily && data.daily) {
      const utcOffsetSeconds = data.utc_offset_seconds ?? 0;
      const dailyRaw = data.daily;
      const timeArray = dailyRaw.time.map(
        (t: string) =>
          new Date(new Date(t).getTime() + utcOffsetSeconds * 1000),
      );
      const dailyParsed: Weather["daily"] = { time: timeArray };

      params.daily.forEach((key) => {
        if (key in dailyRaw) {
          dailyParsed[key] = dailyRaw[key];
        }
      });

      result.daily = dailyParsed;
    }
    result.elevation = data.elevation;
    result.current_weather_units = data.current_weather_units;

    return result;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
};
