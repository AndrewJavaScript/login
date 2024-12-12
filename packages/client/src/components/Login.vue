<template>
  <form
    class="login"
    @submit.prevent="login"
  >
    <h1>LOGIN PAGE</h1>
    <div class="login__field">
      <field
        v-model="componentState.email"
        name="email"
        class="input"
        placeholder="* Email"
        type="text"
        rules="required|email|correctUser"
        @update:modelValue="onDataChange"
      />

      <div class="error">
        <error-message name="email" id="error1"/>
      </div>
    </div>

    <div class="login__field">
      <field
        v-model="componentState.password"
        class="input"
        name="password"
        placeholder="* Password"
        type="password"
        rules="required|min:8"
        @update:modelValue="onDataChange"
      />

      <div class="error">
        <error-message name="password"/>
      </div>
    </div>

    <label class="login__field login__checkbox">
      <input
        v-model="componentState.stayOnline"
        type="checkbox"
      />
      Stay signed in
    </label>

    <div class="login__field">
      <button
        type="submit"
        class="button"
      >
        LOG IN
      </button>
    </div>

    <div>
      <router-link
        to="/registration"
        class="link"
      >
        <button
          type="button"
          class="button"
        >
          REGISTRATION
        </button>
      </router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { configure, defineRule, useForm, ErrorMessage, Field } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import { required, email, min } from '@vee-validate/rules';
import { API_URLS } from '../utils/api-urls.ts';
import { getToken } from '../utils/helpers.ts';

const { validate, values } = useForm();

const componentState = reactive({
  email: '',
  password: '',
  isCorrectUser: true,
  stayOnline: false,
});

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('correctUser', () => componentState.isCorrectUser);

configure({
  validateOnInput: true,
  generateMessage: localize ('en', {
    messages: {
      required: 'This field is required',
      email: 'Enter correct email',
      min: 'Password must be at least {params} characters',
      correctUser: 'Incorrect email or password'
    }
  }
)});

function onDataChange() {
  if (componentState.isCorrectUser) return;

  componentState.isCorrectUser = true;
  validate();
}

async function login() {
  const { valid } = await validate();

  if (!valid) return;

  try {
    const { data } = await axios.post(API_URLS.LOGIN, values);

    if (data.token) {
      const { token } = data;

      if (componentState.stayOnline) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      window.location.href = '/user';
    }

    if (data === 409) {
      componentState.isCorrectUser = false;

      await validate();
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  const token = getToken();

  if (token) return window.location.href = '/user';
})
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.login__field {
  margin-bottom: 20px;
}

.login__checkbox {
  margin-bottom: 40px;
  cursor: pointer;
}
</style>
