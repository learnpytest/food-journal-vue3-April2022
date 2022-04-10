<template>
  <form class="form">
    <div class="form__header">
      <font-awesome-icon class="form__logo" :icon="['fas', 'utensils']" />
      <slot name="header"></slot>
    </div>
    <div class="form__group">
      <label for="email">信箱</label>
      <input
        type="text"
        id="email"
        name="email"
        :class="['form__input']"
        v-model="signUpUserEmail"
      />
      <div></div>
    </div>
    <div class="form__group">
      <label for="account">帳號</label>
      <input
        type="text"
        id="account"
        name="account"
        :class="['form__input']"
        v-model="signUpUserAccount"
      />
      <div></div>
    </div>
    <div class="form__group">
      <label for="password">密碼</label>
      <input
        type="password"
        id="password"
        name="password"
        :class="['form__input']"
        v-model="signUpUserPassword"
      />
      <div></div>
    </div>

    <!-- <slot name="button" @click.stop.prevent="SignUp"></slot> -->
    <PrimaryButtonLarge @click.stop.prevent="SignUp">註冊</PrimaryButtonLarge>

    <div class="form__links">
      <slot name="register"></slot>
      <slot name="login"></slot>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { LOCALSTORAGE_KEY } from "../../configs/config";
import signUpApi from "../../apis/signUp/signUp";

import PrimaryButtonLarge from "../Buttons/PrimaryButtonLarge.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AccountForm",
  components: { PrimaryButtonLarge },
  setup() {
    const router = useRouter();

    const signUpUserAccount = ref("");
    const signUpUserEmail = ref("");
    const signUpUserPassword = ref("");

    // TODO add errorMsg to view notification
    const errorMsg = ref("註冊失敗");

    // some functions
    const SignUp = async () => {
      if (
        !signUpUserAccount.value ||
        !signUpUserEmail.value ||
        !signUpUserPassword.value
      ) {
        errorMsg.value = "沒有輸入資料";
        alert(errorMsg.value);
        return;
      }

      try {
        const res = await signUpApi.signUp({
          email: signUpUserEmail.value,
          account: signUpUserAccount.value,
          password: signUpUserPassword.value,
        })
        if (res.statusText === 'OK') {
          alert("註冊成功");
          router.push("/signin");
        }
        signUpUserEmail.value = "";
        signUpUserAccount.value = "";
        signUpUserPassword.value = "";
      } catch (err) {
        console.log(err);
        alert(errorMsg.value);
      }
    };

    return {
      signUpUserAccount,
      signUpUserEmail,
      signUpUserPassword,
      errorMsg,
      SignUp,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/utils/mixins/_colors.scss";
@import "../../scss/utils/_variables.scss";

.form {
  font-family: var(--ff-primary);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  .form__logo {
    font-size: 3rem;
    color: $yellow;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
    @include grays(color, g-900);
    font-size: 1.5rem;
    font-weight: var(--fw-bold);
  }
  &__logo {
    width: 3rem;
    height: 3rem;
  }
  &__group,
  &__links {
    width: 540px;
    max-width: 70%;
  }
  &__group {
    margin-bottom: 1.9rem;
    @include grays(color, g-600);
    font-size: 1rem;
    background-color: $gray-50;
    font-weight: var(--fw-normal);
    text-align: start;
  }
  label {
    font-size: 12px;
    margin: 5px;
  }
  &__group + &__group {
    margin-bottom: 2.7rem;
  }
  &__input {
    width: 100%;
    border: none;
    padding: 5px;
    border-bottom: 1.5px solid $gray-600;
    @include grays(border-color, g-600);
    background-color: $gray-50;
  }

  &__links {
    margin-top: 1.25rem;
    display: flex;
    justify-content: flex-end;
    .link--login {
      @include grays(color, b-1000);
      font-weight: var(--fw-bold);
    }
  }
}

.form__input:focus,
.form__input:hover {
  border-bottom: 1.5px solid $blue-800;
}
</style>
