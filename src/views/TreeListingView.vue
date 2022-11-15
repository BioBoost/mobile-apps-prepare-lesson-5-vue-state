<script setup lang="ts">
import { useTreeStore } from '@/stores/tree';
import { useLocationStore } from '@/stores/location';
import { onMounted } from 'vue';

const treeStore = useTreeStore();     // Create a store instance
const locationStore = useLocationStore();

onMounted(() => {
  treeStore.fetch_trees();
  locationStore.locate_user();
})
</script>

<template>
  <div class="trees">
    <h1>Below is a listing of trees</h1>
    <div v-if="!treeStore.loading">
      <ul v-if="treeStore.trees.length > 0">
        <li v-for="tree in treeStore.trees" :key="tree.id">{{ tree.name }} - {{ tree.id }}</li>
      </ul>
      <p v-else>
        Sorry, no trees to find here.
      </p>
    </div>
    <div v-else>
      <p>
        Loading the data ......
      </p>
    </div>
    <hr />
    <div v-if="treeStore.closest_tree">
      The closest tree to you: {{ treeStore.closest_tree.name }}
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .trees {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
