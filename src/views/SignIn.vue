<template>
  <SigningForm>
    <template v-slot:header> <h1>Food Journal</h1> </template>
    <template v-slot:register>
      <router-link class="link--login" :to="{ name: 'sign-up' }"
        >Sign Up
      </router-link></template
    >
    <template v-slot:button>
      <PrimaryButtonLarge>登入 </PrimaryButtonLarge>
    </template>
  </SigningForm>
</template>

<script>
import SigningForm from "../components/Forms/SigningForm.vue";
import PrimaryButtonLarge from "../components/Buttons/PrimaryButtonLarge.vue"

export default {
  name: "SignUp",
  components: {
    SigningForm,
    PrimaryButtonLarge,
  },
  setup() {},
};
</script>
