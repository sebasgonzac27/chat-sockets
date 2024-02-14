<template>
    <section id="chat">
        <header id="header">
            Chat #{{ id }}
        </header>
        <ul id="messages">
            <li v-for="message in messages" :key="message">
                {{ message }}
            </li>
        </ul>
        <form id="form" :onsubmit="sendMessage">
            <input type="text" v-model="message" id="input" placeholder="Escribe un mensaje aquí...">
            <button>></button>
        </form>
    </section>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
    id: {
        type: String,
        required: true
    }
});

const messages = ref([])
const message = ref('')

function sendMessage(e) {
    e.preventDefault();
    messages.value.push(message.value);
    message.value = ''
}
</script>


<style scoped lang="scss">
#chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 800px;
    width: 100%;
    max-width: 500px;
    border: solid 1px #383838;
    border-radius: 4px;
}

#header {
    padding: 8px;
    background-color: #383838;
    color: #fff;
    text-align: center;
    font-weight: bold;
}

#messages {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    scroll-behavior: smooth;
    flex: 1;

    li {
        padding: 8px 12px;
        border-bottom: solid 1px #383838;
    }

    li:nth-child(odd) {
        background-color: #f4f4f4;
    }
}

#form {
    display: flex;
    gap: 10px;
    height: 40px;
    padding: 8px;
    margin: 4px;
}

#input {
    border-radius: 9999px;
    padding: 8px;
    flex: 1;
    border: 1px solid #000;

    &:focus {
        outline: none;
    }
}

#form>button {
    border-radius: 100%;
    border: none;
    background-color: #09f;
    height: 100%;
    width: 40px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0cf;
    }
}
</style>