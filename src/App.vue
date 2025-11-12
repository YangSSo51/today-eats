<template>
  <div class="app">
    <h1>🍱 오늘의 추천 음식</h1>

    <section>
      <h3>기분을 선택하세요</h3>
      <MoodSelector v-model="selectedMoodId" :moods="moods" />
    </section>

    <section>
      <h3>날씨를 선택하세요</h3>
      <WeatherSelector v-model="selectedWeatherId" :weathers="weathers" />
    </section>

    <section>
      <h3>추천 음식</h3>
      <FoodRecommendation :foods="recommendedFoods" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRecommendation } from './composables/useRecommendation';
import MoodSelector from './components/MoodSelector.vue';
import WeatherSelector from './components/WeatherSelector.vue';
import FoodRecommendation from './components/FoodRecommendation.vue';

const { moods, weathers, recommendFoods } = useRecommendation();

const selectedMoodId = ref<number>(moods.value[0].id);
const selectedWeatherId = ref<number>(weathers.value[0].id);

const recommendedFoods = computed(() =>
  recommendFoods(selectedMoodId.value, selectedWeatherId.value)
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
