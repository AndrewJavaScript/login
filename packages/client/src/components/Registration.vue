<template>
  <form class="registration">
    <template v-if="!componentState.isRegistered">

    <h1 class="registration__title">REGISTRATION PAGE</h1>

    <div class="registration__field">
      <field
        v-model="componentState.email"
        name="email"
        class="input"
        placeholder="* Email"
        type="text"
        rules="required|email|emailExist"
        @update:modelValue="onEmailChange"
      />

      <div class="error">
        <error-message name="email"/>
      </div>
    </div>

    <div class="registration__field">
      <field
        v-model="componentState.password"
        class="input"
        name="password"
        placeholder="* Password"
        type="password"
        rules="required|min:8"
      />

      <div class="error">
        <error-message name="password"/>
      </div>
    </div>

    <div class="registration__field">
      <field
        v-model="componentState.passwordRepeat"
        class="input"
        name="passwordRepeat"
        placeholder="* Repeat password"
        type="password"
        rules="required|min:8|checkPassword"
      />

      <div class="error">
        <error-message name="passwordRepeat"/>
      </div>
    </div>

    <div class="registration__field">
      <button
        id="logInButton"
        type="button"
        class="button"
        @click="registration"
      >
        SIGN UP
      </button>
    </div>

    <router-link
      to="/"
      class="link"
    >
      <button
        type="button"
        class="button"
      >
        LOG IN
      </button>
    </router-link>
    </template>
    <template v-else>
      <h1 class="registration__title">SUCCESSFULLY REGISTERED</h1>

      <router-link
        to="/"
        class="link"
      >
        <button
          type="button"
          class="button"
        >
          LOG IN
        </button>
      </router-link>
    </template>
  </form>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { configure, defineRule, useForm, ErrorMessage, Field } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import { required, email, min } from '@vee-validate/rules';
import axios from "axios";
import { API_URLS } from '../utils/api-urls.ts';
import { getToken } from '../utils/helpers.ts';

const { validate, values } = useForm();

const componentState = reactive({
  email: '',
  password: '',
  passwordRepeat: '',
  isUniqEmail: true,
  isRegistered: false,
});

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('checkPassword', () => componentState.password === componentState.passwordRepeat);
defineRule('emailExist', () => componentState.isUniqEmail);


configure({
  validateOnInput: true,
  generateMessage: localize ('en', {
    messages: {
      required: 'This field is required',
      email: 'Enter correct email',
      min: 'Password must be at least {params} characters',
      checkPassword: 'Passwords are not equal',
      emailExist: 'This email already exist',
    }
  }
)});

function onEmailChange() {
  if (componentState.isUniqEmail) return;

  componentState.isUniqEmail = true;
  validate();
}

async function registration() {
  const { valid } = await validate();

  if (!valid) return;

  try {
    const { data } = await axios.post(API_URLS.REGISTRATION, values);

    if (data === 200) {
      componentState.isRegistered = true;
    }

    if (data === 409) {
      componentState.isUniqEmail = false;

      await validate();
    }
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  const token = getToken();

  if (token) window.location.href = '/user';
})
</script>


<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.registration__field {
  margin-bottom: 20px;
}
</style>
