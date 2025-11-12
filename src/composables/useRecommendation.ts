import type {
  Food,
  FoodMoodWeight,
  FoodWeatherWeight,
} from '@/types/recommendation';

export function useRecommendation(
  selectedMoodId: number,
  currentWeatherId: number,
  foods: Food[],
  foodMoodWeights: FoodMoodWeight[],
  foodWeatherWeights: FoodWeatherWeight[],
  topN = 5
) {
  return foods
    .map((food) => {
      const moodWeight =
        foodMoodWeights.find(
          (w) => w.foodId === food.id && w.moodId === selectedMoodId
        )?.weight ?? 0;
      const weatherWeight =
        foodWeatherWeights.find(
          (w) => w.foodId === food.id && w.weatherId === currentWeatherId
        )?.weight ?? 0;
      return { ...food, total: moodWeight + weatherWeight };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, topN);
}
