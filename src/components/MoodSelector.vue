<template>
  <div class="mood-selector">
    <button
      v-for="mood in moodData"
      :key="mood.id"
      :class="{ active: modelValue === mood.id }"
      @click="$emit('update:modelValue', mood.id)"
    >
      {{ mood.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Mood } from '@/types/recommendation';

defineProps<{
  modelValue: number;
  moodData: Mood[];
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
button.active {
  background-color: #ffd600;
  font-weight: bold;
}
</style>
