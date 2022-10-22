<template>
  <div class="cart">
    <div class="cart__form">
      <input v-model="message">
      <button @click="sendMessage">Отправить сообщение</button>
    </div>
  </div>
</template>

<script>
import telegram_data from '/static/json/telegram-api.json'
import * as axios from 'axios'

export default {
  name: "cart",
  scrollToTop: true,
  data () {
    return {
      telegram: telegram_data,
      message: ''
    }
  },

  methods: {
    sendMessage() {
      axios.get(`https://api.telegram.org/bot${telegram_data.token}/sendMessage?chat_id=@${telegram_data['id-group']}&text=${this.message}`)
    }
  }
}
</script>

<style lang="scss">
.cart {
  margin: 0;
  height: 100%;
  background-color: $white;
  &__form {
    padding-top: 42px;
    width: 160px;
  }
}
</style>
