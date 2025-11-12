import { ref } from 'vue';
import type { Mood, Weather, Food } from '../types/recommendation';

export function useRecommendation() {
  // ▼ 기분 목록
  const moods = ref<Mood[]>([
    { id: 1, name: '행복해' },
    { id: 2, name: '피곤해' },
    { id: 3, name: '우울해' },
    { id: 4, name: '짜증나' },
  ]);

  // ▼ 날씨 목록
  const weathers = ref<Weather[]>([
    { id: 1, name: '맑음' },
    { id: 2, name: '비' },
    { id: 3, name: '눈' },
    { id: 4, name: '더움' },
    { id: 5, name: '추움' },
  ]);

  // ▼ 음식 목록
  const foods = ref<Food[]>([
    { id: 1, name: '라멘' },
    { id: 2, name: '샐러드' },
    { id: 3, name: '국밥' },
    { id: 4, name: '치킨' },
    { id: 5, name: '아이스크림' },
  ]);

  // ▼ 음식-기분 관계 (가중치)
  const foodMoodWeights = ref([
    { foodId: 1, moodId: 3, weight: 3 }, // 우울할 때 라멘 최고
    { foodId: 3, moodId: 2, weight: 3 }, // 피곤할 때 국밥
    { foodId: 5, moodId: 1, weight: 2 }, // 행복할 때 아이스크림
    { foodId: 4, moodId: 4, weight: 2 }, // 짜증날 때 치킨
  ]);

  // ▼ 음식-날씨 관계 (가중치)
  const foodWeatherWeights = ref([
    { foodId: 3, weatherId: 5, weight: 3 }, // 추울 때 국밥
    { foodId: 2, weatherId: 4, weight: 3 }, // 더울 때 샐러드
    { foodId: 5, weatherId: 4, weight: 2 }, // 더울 때 아이스크림
    { foodId: 1, weatherId: 2, weight: 2 }, // 비 올 때 라멘
  ]);

  // ▼ 추천 계산 함수
  const recommendFoods = (moodId: number, weatherId: number): Food[] => {
    return foods.value
      .map((food) => {
        const moodScore =
          foodMoodWeights.value.find(
            (w) => w.foodId === food.id && w.moodId === moodId
          )?.weight || 0;
        const weatherScore =
          foodWeatherWeights.value.find(
            (w) => w.foodId === food.id && w.weatherId === weatherId
          )?.weight || 0;
        return { ...food, total: moodScore + weatherScore };
      })
      .sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
  };

  return { moods, weathers, foods, recommendFoods };
}
