<template>

  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/"> 美食日記 </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        {{ isAuthenticated.value }}

        <router-link
          v-if="!isAuthenticated"
          class="btn btn-sm btn-outline-success my-2 my-sm-0 text-white mr-3"
          to="/signup"
        >
          註冊/登入{{ isAuthenticated.value }}</router-link
        >
        <button
          v-if="isAuthenticated"
          @click.stop.prevent="signOut"
          class="btn btn-sm btn-outline-success my-2 my-sm-0 text-white mr-3"
        >
          登出 {{ isAuthenticated.value }}
        </button>

        <!-- <button
          type="button"
          class="btn btn-sm btn-outline-success my-2 my-sm-0"
        >
          註冊/登入
        </button> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LOCALSTORAGE_KEY } from "../../configs/config";

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(null);

    isAuthenticated.value = localStorage.getItem(LOCALSTORAGE_KEY) || false;

    const signOut = () => {
      localStorage.removeItem(LOCALSTORAGE_KEY);
      isAuthenticated.value = false;
      router.push("/signin");
      alert("已成功登出");
    };
    return {
      isAuthenticated,
      signOut,
    };
  },
};
</script>
