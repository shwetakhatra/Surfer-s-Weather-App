export const getWeatherCondition = (code: number): string => {
  if ([0, 1].includes(code)) return "clear";
  if ([2, 3].includes(code)) return "clouds";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "clear";
};