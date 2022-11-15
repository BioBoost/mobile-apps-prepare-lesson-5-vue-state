import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Location } from '@/types/location';

export const useLocationStore = defineStore('location', () => {

  // State
  const locatable = ref(false);
  const location = ref({latitude: 51, longitude: 3} as Location);       // The user's current location

  // Actions
  function locate_user() {
    if (!navigator.geolocation) {
      locatable.value = false;
      return;
    }

    navigator.geolocation.getCurrentPosition((geoLocation) => {
      console.log(geoLocation);
      location.value.latitude = geoLocation.coords.latitude;
      location.value.longitude = geoLocation.coords.longitude;
      locatable.value = true;
    }, (error) => {
      locatable.value = false;
      console.log(error)
    });
  }

  // Public
  return {
    locatable,
    location,
    locate_user,
  }
});