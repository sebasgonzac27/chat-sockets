<script setup>
import { io } from 'socket.io-client';

import { nextTick, ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

import SendIcon from '@/components/icons/Send.vue';


const { id } = defineProps({
    id: {
        type: String,
        required: true
    }
});

let socket
onMounted(() => {
    if (!user.value) {
        user.value = prompt('Ingresa tu nombre')
    }
    socket = io('/', { auth: { roomId: id, user: user.value } });

    socket.on('user joined', (users) => {
        friends.value = [...users].filter((u) => u !== user.value)
    });

    socket.on('user left', (users) => {
        friends.value = [...users].filter((u) => u !== user.value)
    });

    socket.on('chat message', (msg) => {
        messages.value.push(msg);
        nextTick(() => {
            if (messageContainer.value) {
                messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
            }
        });

    });
});


const userStore = useUserStore()
const friends = ref([])
const { user } = storeToRefs(userStore)


const messages = ref([])
const message = ref('')
const messageContainer = ref(null)

function sendMessage(e) {
    e.preventDefault();
    if (message.value) {
        socket.emit('chat message', message.value);
        message.value = ''
    }
}

const friendsBadge = computed(() => {
    return friends.value.length > 0 ? friends.value.join(', ') : 'Nadie se ha conectado aún'

})
</script>


<template>
    <section id="chat">
        <header id="header">
            {{ friendsBadge }}
        </header>
        <ul id="messages" ref="messageContainer">
            <li v-for="message in messages" :key="message" :class="message.user == user ? 'me' : ''">
                <div>
                    <h4 v-if="message.user != user && friends.length > 1">{{ message.user }}</h4>
                    <p>{{ message.msg }}</p>
                    <small> {{ message.date }} </small>
                </div>
            </li>
        </ul>
        <form id="form" :onsubmit="sendMessage">
            <input type="text" v-model="message" id="input" placeholder="Escribe un mensaje aquí...">
            <button>
                <SendIcon />
            </button>
        </form>
    </section>
</template>


<style scoped lang="scss">
@import '@/assets/scss/colors.scss';

#chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 800px;
    width: 100%;
    max-width: 500px;
    border: solid 1px #383838;
    border-radius: 4px;
    background-color: $background-color-light;
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
        text-align: left;

        &.me {
            text-align: right;
        }
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
    display: grid;
    place-content: center;
    border-radius: 100%;
    border: none;
    background-color: $primary;
    height: 40px;
    width: 40px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: $primary-light;
    }
}
</style>