<template>
  <div class="food-card">
    <div class="header">
      <h3>{{ food.name }}</h3>
      <button class="remove-btn" @click="emit('remove', food.id)">×</button>
    </div>

    <!-- 기본 정보 -->
    <div class="info">
      <input v-model="food.name" placeholder="음식명" />
      <select v-model="food.category">
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
      </select>
      <input
        type="number"
        v-model.number="food.calories"
        placeholder="칼로리(kcal)"
      />
      <label class="check">
        <input type="checkbox" v-model="food.dietFriendly" />
        🥗 다이어트용
      </label>
      <label class="check">
        <input type="checkbox" v-model="food.drinkSide" />
        🍺 안주용
      </label>
    </div>

    <!-- 가중치 -->
    <div class="mappings">
      <div>
        <h4>기분 점수</h4>
        <div class="tags">
          <label v-for="mood in moods" :key="mood.id" class="tag">
            <span class="icon">{{ mood.icon }}</span> {{ mood.name }}
            <input
              type="number"
              min="0"
              max="5"
              step="1"
              v-model.number="getMoodWeight(mood.id).weight"
            />
          </label>
        </div>
      </div>

      <div>
        <h4>날씨 점수</h4>
        <div class="tags">
          <label v-for="weather in weathers" :key="weather.id" class="tag">
            <span class="icon">{{ weather.icon }}</span> {{ weather.name }}
            <input
              type="number"
              min="0"
              max="5"
              step="1"
              v-model.number="getWeatherWeight(weather.id).weight"
            />
          </label>
        </div>
      </div>
    </div>

    <button class="save-btn" @click="saveFood">💾 저장</button>
  </div>
</template>

<script setup lang="ts">
import type {
  Food,
  Mood,
  Weather,
  FoodMoodWeight,
  FoodWeatherWeight,
} from '@/types/recommendation';

const props = defineProps<{
  food: Food;
  moods: Mood[];
  weathers: Weather[];
  foodMoodWeights: FoodMoodWeight[];
  foodWeatherWeights: FoodWeatherWeight[];
}>();

const emit = defineEmits<{
  (e: 'remove', id: number): void;
}>();

function getMoodWeight(moodId: number) {
  let found = props.foodMoodWeights.find(
    (w) => w.foodId === props.food.id && w.moodId === moodId
  );
  if (!found) {
    found = { foodId: props.food.id, moodId, weight: 0 };
    props.foodMoodWeights.push(found);
  }
  return found;
}

function getWeatherWeight(weatherId: number) {
  let found = props.foodWeatherWeights.find(
    (w) => w.foodId === props.food.id && w.weatherId === weatherId
  );
  if (!found) {
    found = { foodId: props.food.id, weatherId, weight: 0 };
    props.foodWeatherWeights.push(found);
  }
  return found;
}

async function saveFood() {
  await fetch('/api/saveFood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      food: props.food,
      foodMoodWeights: props.moods.map((m) => getMoodWeight(m.id)),
      foodWeatherWeights: props.weathers.map((w) => getWeatherWeight(w.id)),
    }),
  });
  alert(`${props.food.name} 저장 완료!`);
}
</script>

<style scoped>
.food-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
  padding: 16px;
  margin-bottom: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.food-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.remove-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 18px;
  cursor: pointer;
}
.info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}
input[type='number'],
input[type='text'],
select {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 4px 8px;
}
.check {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}
.mappings {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px 8px;
}
.icon {
  font-size: 16px;
}
.save-btn {
  margin-top: 12px;
  padding: 6px 12px;
  border-radius: 8px;
  background: linear-gradient(90deg, #4caf50, #45a049);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: linear-gradient(90deg, #45a049, #3b8d3b);
}
</style>
