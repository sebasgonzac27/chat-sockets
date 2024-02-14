<template>
    <section id="chat">
        <ul id="messages">

        </ul>
        <form id="form">
            <input type="text" name="message" id="input" placeholder="Escribe un mensaje aquí...">
            <button>></button>
        </form>
    </section>
</template>
<script setup>
defineProps({
    id: {
        type: String,
        required: true
    }
});
</script>