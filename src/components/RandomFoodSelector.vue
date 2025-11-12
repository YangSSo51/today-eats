<template>
  <div class="random-selector">
    <h3>🎲 랜덤 메뉴 추천</h3>
    <div class="display">
      <span v-if="displayFood">{{ displayFood.name }}</span>
      <span v-else>여기서 메뉴가 선택됩니다</span>
    </div>
    <button type="button" @click="startRandomPick" :disabled="isPicking">
      🎯 랜덤 선택
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Food } from '@/types/recommendation';

const props = defineProps<{ foods: Food[] }>();

const displayFood = ref<Food | null>(null);
const isPicking = ref(false);

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

async function startRandomPick() {
  if (props.foods.length === 0) return;
  isPicking.value = true;

  let i = 0;
  const duration = 2000;
  const intervalTime = 100;
  const steps = duration / intervalTime;

  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      displayFood.value = props.foods[getRandomIndex(props.foods.length)];
      i++;
      if (i >= steps) {
        clearInterval(interval);
        isPicking.value = false;
        resolve();
      }
    }, intervalTime);
  });
}
</script>

<style scoped>
.random-selector {
  text-align: center;
  margin: 24px 0;
}
.display {
  min-height: 50px;
  font-size: 1.5rem;
  margin-bottom: 16px;
  font-weight: bold;
  color: #2c3e50;
}
button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #6366f1;
}
</style>
