<template>
  <div class="home">
    <NavBar />
    <JournalPage />
  </div>
</template>

<script>
import NavBar from "../components/Navs/NavBar.vue";
import JournalPage from "../components/Journals/JournalPage.vue";
import { LOCALSTORAGE_KEY } from "../configs/config";
import { useRouter } from "vue-router";
export default {
  name: "HomeView",
  components: {
    NavBar,
    JournalPage,
  },
  setup() {
    const router = useRouter();
    const isAuthenticated = localStorage.getItem(LOCALSTORAGE_KEY);
    !isAuthenticated && router.push("/signin");
  },
};
</script>
