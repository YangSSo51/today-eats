<template>
  <div class="app">
    <h1>🍱 오늘의 추천 음식</h1>

    <section>
      <h3>기분을 선택하세요</h3>
      <MoodSelector v-model="selectedMoodId" :moodData="moods" />
    </section>

    <section>
      <h3>날씨를 선택하세요</h3>
      <WeatherSelector v-model="selectedWeatherId" :weatherData="weathers" />
    </section>

    <section>
      <h3>추천 음식</h3>
      <FoodRecommendation :foods="recommendedFoods" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRecommendation } from '@/composables/useRecommendation';
import MoodSelector from '@/components/MoodSelector.vue';
import WeatherSelector from '@/components/WeatherSelector.vue';
import FoodRecommendation from '@/components/FoodRecommendation.vue';

import type {
  Mood,
  Weather,
  Food,
  FoodMoodWeight,
  FoodWeatherWeight,
} from '@/types/recommendation';

import foodsData from '@/data/foods.json';
import foodMoodWeightsData from '@/data/foodMoodWeights.json';
import foodWeatherWeightsData from '@/data/foodWeatherWeights.json';
import moodData from '@/data/Moods.json';
import weatherData from '@/data/weathers.json';

const moods = ref<Mood[]>(moodData as Mood[]);
const weathers = ref<Weather[]>(weatherData as Weather[]);

const selectedMoodId = ref<number>(moods.value[0].id);
const selectedWeatherId = ref<number>(weathers.value[0].id);

const recommendedFoods = computed(() =>
  useRecommendation(
    selectedMoodId.value,
    selectedWeatherId.value,
    foodsData as Food[],
    foodMoodWeightsData as FoodMoodWeight[],
    foodWeatherWeightsData as FoodWeatherWeight[]
  )
);
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}
h1 {
  margin-bottom: 24px;
}
section {
  margin-bottom: 32px;
}
</style>
