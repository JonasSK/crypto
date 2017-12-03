<template>
  <div id="app">
    <pre>{{coins}}</pre>
  </div>
</template>

<script>
import api from "./api";

export default {
  name: "app",
  data() {
    return {
      coins: []
    };
  },

  async created() {
    try {
      const coins = await api.getAllCoins();
      this.coins = coins;
    } catch (err) {
      this.error = err;
    }
  }
};
</script>