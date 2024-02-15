<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const router = useRouter()

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

async function createChat(e) {
  e.preventDefault();
  if (user.value) {
    const res = await fetch('https://chat-sockets-server.vercel.app/random-id')
    const data = await res.json()
    const { id } = data
    router.push(`/chat/${id}`)
  }
}
</script>

<template>
  <div id="home-card">
    <img src="@/assets/logo.svg" width="150px" />
    <h1>Bienvenido a <span>We</span>Chat</h1>
    <p>Ingresa tu nombre y crea un chat para compartir con un amigo y hablar...</p>
    <form :onsubmit="createChat">
      <input type="text" v-model="user" placeholder="Ingresa tu nombre" />
      <button>Crear chat</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/colors.scss';

#home-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 20px;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 400px;
  background-color: $background-color-light;
  border-radius: 20px;

  h1 {
    margin: 0;
    text-align: center;

    span {
      color: $primary;
    }
  }

  p {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
    width: 100%;

    input {
      padding: 10px;
      border-radius: 9999px;
      border: 1px solid #000;
      outline: none;
    }

    button {
      padding: 10px;
      border-radius: 9999px;
      border: none;
      background-color: $primary;
      color: #fff;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: $primary-light;
      }
    }
  }
}
</style>
