import { defineStore } from 'pinia';
import type { Tree } from '@/types/tree';
import { ref, computed } from 'vue';
import { Trees } from '@/api/dust';
import { useLocationStore } from '@/stores/location';

export const useTreeStore = defineStore('tree', () => {

  // State
  const trees = ref([] as Tree[]);
  const loading = ref(false);

  // Actions
  async function fetch_trees() {
    loading.value = true;
    Trees.all()
    .then((response) => {
      trees.value = response.data.data;
    })
    .finally(() => {
      loading.value = false;
    })
  }

  // Getters
  const closest_tree = computed(() => {
    const locationStore = useLocationStore();

    if (!locationStore.locatable || loading.value || trees.value.length === 0) {
      return undefined
    }

    const distances = trees.value.map((tree) => {
      const longDiff = tree.location.longitude - locationStore.location.longitude;
      const latDiff = tree.location.latitude - locationStore.location.latitude;
      return Math.sqrt(longDiff*longDiff + latDiff*latDiff)
    });

    // Need the index of the smallest
    const iMin = distances.reduce(
      (previousValue, currentValue, currentIndex) => (currentValue < distances[previousValue] ? currentIndex : previousValue),
      // previousValue = index of current smallest
      // currentValue = current distance !
      0 // Initial index value
    );

    return trees.value[iMin];
  });

  // Public
  return {
    trees,
    loading,
    fetch_trees,
    closest_tree,
  }
});