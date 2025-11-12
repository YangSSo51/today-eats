<template>
  <div class="weather-selector">
    <button
      v-for="weather in weatherData"
      :key="weather.id"
      :class="{ selected: modelValue === weather.id }"
      @click="$emit('update:modelValue', weather.id)"
    >
      {{ weather.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Weather } from '@/types/recommendation';

defineProps<{
  modelValue: number;
  weatherData: Weather[];
}>();
</script>

<style scoped>
button {
  margin: 4px;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
}
button.selected {
  background-color: #00bfff;
  border-color: #1e90ff;
}
</style>
