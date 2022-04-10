<template>
  <AccountForm>
    <template v-slot:header> <h1>註冊美食日記</h1> </template>
    <template v-slot:register>
      <router-link class="link--login" :to="{ name: 'sign-in' }"
        >登入美食日記
      </router-link></template
    >
    <template v-slot:login>
      <!-- <router-link class="link--login" :to="{ name: 'admin-login' }"
          >後台登入</router-link
        > -->
    </template>
  </AccountForm>
</template>

<script>
// import AccountForm from "../components/Forms/AccountForm.vue";

export default {
  name: "SignUp",
  components: {
    // AccountForm,
  },
};
</script>
