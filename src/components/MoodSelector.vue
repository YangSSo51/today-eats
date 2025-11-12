<template>
  <div class="selector">
    <button
      v-for="m in moods"
      :key="m.id"
      :class="{ active: modelValue === m.id }"
      @click="$emit('update:modelValue', m.id)"
    >
      {{ m.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { Mood } from '../types/recommendation';

defineProps({
  moods: { type: Array as PropType<Mood[]>, required: true },
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
  background-color: #ffd600;
  font-weight: bold;
}
</style>
