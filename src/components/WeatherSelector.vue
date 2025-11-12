<template>
  <div class="selector">
    <button
      v-for="w in weathers"
      :key="w.id"
      :class="{ active: modelValue === w.id }"
      @click="$emit('update:modelValue', w.id)"
    >
      {{ w.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { Weather } from '../types/recommendation';

defineProps({
  weathers: { type: Array as PropType<Weather[]>, required: true },
  modelValue: { type: Number, required: true },
});
</script>

<style scoped>
.selector {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
button {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}
button.active {
  background-color: #89cff0;
  font-weight: bold;
}
</style>
