<script setup lang="ts">
import { ref } from 'vue';
import { chatService, Message } from './services/chat-service'

const messages = ref<Message[]>([])

chatService.injectReceiver((message) => {
  messages.value.push(message);
})
</script>

<template>
  <div>
    <button @click="chatService.send({username: 'zhangsan', content: `${Date.now()}`})">zhangsan</button>
    <button @click="chatService.send({username: 'lisi', content: `${Date.now()}`})">lisi</button>
    <div class="main">
      <ul>
      <li v-for="(m, index) in messages" :key="index" :class="{me: m.username === 'zhangsan'}">{{m.username}}: {{m.content}}</li>
    </ul>
    <ul>
      <li v-for="(m, index) in messages" :key="index" :class="{me: m.username === 'lisi'}">{{m.username}}: {{m.content}}</li>
    </ul>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
}
.main ul {
    height: 400px;
    overflow: auto;
}
.me {
  color: red;
}
</style>
