<template>
  <form class="form">
    <div class="form__header">
      <font-awesome-icon class="form__logo" :icon="['fas', 'utensils']" />
      <slot name="header"></slot>
    </div>
    <div class="form__group">
      <label for="email">信箱</label>
      <input
        type="email"
        id="email"
        name="email"
        :class="['form__input']"
        v-model="user.email"
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
        v-model="user.password"
      />
      <div></div>
    </div>
    <PrimaryButtonLarge @click.stop.prevent="signIn">登入</PrimaryButtonLarge>
    <div class="form__links">
      <slot name="register"></slot>
      <slot name="login"></slot>
    </div>
  </form>
</template>

<script>
import PrimaryButtonLarge from "../../components/Buttons/PrimaryButtonLarge.vue";
import { LOCALSTORAGE_KEY } from "../../configs/config";
import signingApi from "../../apis/signings/signing";

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SigningForm",
  components: { PrimaryButtonLarge },
  setup() {
    const router = useRouter();
    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
      router.push("/");
    }

    const user = reactive({
      email: "",
      password: "",
      // concatData: computed(() => {
      //   return `帳號: ${user.account}, 信箱:${user.email}`;
      // }),
      isLoading: false,
    });

   // TODO add errorMsg to view notification
    const errorMsg = ref('登入失敗');

    // some functions
    const signIn = async () => {
      if (!user.email || !user.password) {
        errorMsg.value = "沒有輸入資料";
        alert(errorMsg.value);
        return;
      }

      try {
        const res = await signingApi.signIn(user.email, user.password);
        const { statusText, data } = res;
        console.log(res)
        if (statusText === "OK" && data.access_token) {
          alert("登入成功");
          localStorage.setItem(LOCALSTORAGE_KEY, data.access_token);
          router.push("/");
        }
      } catch (err) {
        console.log(err);
        alert(errorMsg.value);
      }
    };

    return {
      user,
      errorMsg,
      signIn,
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
