<template>
  <ul class="food-list">
    <li v-for="food in foods" :key="food.id">
      <span v-if="food.total"> {{ food.name }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { Food } from '@/types/recommendation';

defineProps({
  foods: { type: Array as PropType<Food[]>, required: true },
});
</script>

<style scoped>
.food-list {
  list-style: none;
  padding: 0;
}
.food-list li {
  padding: 6px 0;
}
</style>
