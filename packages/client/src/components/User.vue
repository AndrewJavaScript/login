<template>
  <div class="user">
    <h1 class="user__title user__field">LOGIN PAGE</h1>
    <h3 class="user__title user__field">
      EMAIL: {{ componentState.user.email }}
    </h3>
    <h3 class="user__title user__field">
      DATE OF REGISTRATION: {{ new Date(componentState.user.created_date).toLocaleString('ru-RU') }}
    </h3>

    <button
      type="button"
      class="button button--red"
      @click="logOut"
    >
      LOG OUT
    </button>

    <div class="user__users">
      <button
        type="button"
        class="button"
        @click="showUsers"
      >
        SHOW USERS
      </button>

      <input
        v-model="componentState.userCount"
        type="number"
        min="1"
        max="10"
      >
    </div>

    <table
      v-if="componentState.users.length > 0"
      class="user__table"
    >
      <tbody>
        <tr>
          <th>Email:</th>
          <th>Created:</th>
        </tr>
        <tr v-for="user in componentState.users">
          <th>{{ user.email }}</th>
          <th>{{ new Date(user.created_date).toLocaleString('ru-RU') }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { API_URLS } from '../utils/api-urls.ts';
import { getToken } from '../utils/helpers.ts';

interface IUser {
  email: string;
  created_date: string;
}

interface IComponentState {
  users: IUser[];
  userCount: number;
  token: string;
  user: IUser;
}

const componentState: IComponentState = reactive({
  users: [],
  userCount: 1,
  token: '',
  user: {
    email: '',
    created_date: '',
  },
});

function logOut() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  window.location.href = '/';
}

async function showUsers() {
  try {
    const { data } = await axios.get(API_URLS.USERS, {
      params: {
        qty: componentState.userCount
      },
      headers: {
        Authorization: `Bearer ${componentState.token}`
      },
    });

    if (data) componentState.users = data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  const token = getToken();

  if (!token) return window.location.href = '/';

  componentState.token = token;

  try {
    const { data } = await axios.get(API_URLS.USER, {
      headers: {
        Authorization: `Bearer ${componentState.token}`
      },
    });

    if (data) componentState.user = data;
  } catch (error) {
    console.error(error);
  }
})
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.user__field {
  margin-bottom: 20px;
}

.user__users {
  padding-top: 30px;
  margin-bottom: 30px;
  color: white;
  display: flex;
  column-gap: 20px;
}

table, th, td {
  border: 1px solid;
  padding: 6px;
  border-collapse: collapse;
}
</style>
