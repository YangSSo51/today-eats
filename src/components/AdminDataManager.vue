<template>
  <div class="admin">
    <h1>🍱 음식 데이터 관리</h1>

    <!-- 음식 카드 목록 -->
    <div class="food-list">
      <AdminFoodCard
        v-for="food in foods"
        :key="food.id"
        :food="food"
        :moods="moods"
        :weathers="weathers"
        :foodMoodWeights="foodMoodWeights"
        :foodWeatherWeights="foodWeatherWeights"
        @remove="removeFood"
      />
    </div>

    <!-- 새 음식 카드 -->
    <AdminFoodCard
      v-if="addingNew"
      :food="newFood"
      :moods="moods"
      :weathers="weathers"
      :foodMoodWeights="foodMoodWeights"
      :foodWeatherWeights="foodWeatherWeights"
      @remove="cancelNewFood"
    >
      <template #save-button>
        <button class="save-btn" @click="confirmAddFood">➕ 추가</button>
      </template>
    </AdminFoodCard>

    <button class="add-new-btn" @click="startAddFood">새 음식 추가</button>
    <button class="save-all-btn" @click="saveAll">전체 저장</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminFoodCard from '@/components/AdminFoodCard.vue';
import foodsData from '@/data/foods.json';
import moodsData from '@/data/moods.json';
import weathersData from '@/data/weathers.json';
import foodMoodWeightsData from '@/data/foodMoodWeights.json';
import foodWeatherWeightsData from '@/data/foodWeatherWeights.json';
import type {
  Food,
  Mood,
  Weather,
  FoodMoodWeight,
  FoodWeatherWeight,
} from '@/types/recommendation';

const foods = ref<Food[]>(JSON.parse(JSON.stringify(foodsData)));
const moods = ref<Mood[]>(moodsData);
const weathers = ref<Weather[]>(weathersData);
const foodMoodWeights = ref<FoodMoodWeight[]>(
  JSON.parse(JSON.stringify(foodMoodWeightsData))
);
const foodWeatherWeights = ref<FoodWeatherWeight[]>(
  JSON.parse(JSON.stringify(foodWeatherWeightsData))
);

const addingNew = ref(false);
const newFood = ref<Food>({
  id: Date.now(),
  name: '',
  category: '한식',
  calories: 0,
  dietFriendly: false,
  drinkSide: false,
});

// 새 음식 카드 열기
function startAddFood() {
  addingNew.value = true;
  newFood.value = {
    id: Date.now(),
    name: '',
    category: '한식',
    calories: 0,
    dietFriendly: false,
    drinkSide: false,
  };
}

// 새 음식 카드 취소
function cancelNewFood() {
  addingNew.value = false;
}

// 새 음식 확정 + 가중치 초기화
function confirmAddFood() {
  if (!newFood.value.name) return alert('음식명을 입력하세요');

  const foodId = newFood.value.id;
  foods.value.push({ ...newFood.value });

  // 기분 가중치 초기화
  moods.value.forEach((mood) => {
    foodMoodWeights.value.push({ foodId, moodId: mood.id, weight: 0 });
  });

  // 날씨 가중치 초기화
  weathers.value.forEach((weather) => {
    foodWeatherWeights.value.push({ foodId, weatherId: weather.id, weight: 0 });
  });

  addingNew.value = false;
}

// 음식 삭제
function removeFood(id: number) {
  foods.value = foods.value.filter((f) => f.id !== id);
  foodMoodWeights.value = foodMoodWeights.value.filter((w) => w.foodId !== id);
  foodWeatherWeights.value = foodWeatherWeights.value.filter(
    (w) => w.foodId !== id
  );
}

// 전체 저장
async function saveAll() {
  await fetch('/api/saveAllFoods', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      foods: foods.value,
      foodMoodWeights: foodMoodWeights.value,
      foodWeatherWeights: foodWeatherWeights.value,
    }),
  });
  alert('전체 저장 완료!');
}
</script>

<style scoped>
.admin {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
}
.food-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}
.add-new-btn,
.save-all-btn {
  margin-right: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  background: #4caf50;
  color: white;
  font-weight: bold;
}
.add-new-btn:hover,
.save-all-btn:hover {
  background: #45a049;
}
</style>
