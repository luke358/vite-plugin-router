<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import axios from 'axios'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
const users = ref([])
// axios.get('/api/users').then((response) => {
//   console.log(response.data)
//   users.value = response.data
// })
// console.log(users.value)
const ins = getCurrentInstance()
function useI18n() {
  const locale = ref('en')
  const i18n = ins?.type.i18n

  function t(msg: any) {
    return computed(() => i18n[locale.value][msg]).value
  }

  return { locale, t }
}
const { locale, t } = useI18n()
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>{{ JSON.stringify(users) }}</div>
  <form>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">
        en
      </option>
      <option value="ja">
        ja
      </option>
    </select>
  </form>
  <p>{{ t('hello') }}</p>
</template>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
