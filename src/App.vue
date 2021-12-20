<template>
  <v-app id="Pulu App">
    <nav-bar />

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <FooTer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooTer from "@/components/FooTer";

export default {
  name: "App",
  components: {
    NavBar,
    FooTer,
  },

  created() {
    document.addEventListener("swupdatefound", this.updateTheApp, {
      once: true,
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.isRefreshing) return;
      this.isRefreshing = true;
      window.location.reload();
    });
  },
  data: function () {
    return {
      registration: null,
      updateAvailable: false,
    };
  },
  methods: {
    updateTheApp(e) {
      this.registration = e.detail;
      this.updateAvailable = true;
    },
    update() {
      // Actual update
      this.updateAvailable = false;
      // Lazy evaluation
      if (this.registration || this.registration.waiting) {
        this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    },
  },
};
</script>