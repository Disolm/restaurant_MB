<template>
  <div class="cart">
    <div class="cart__wrapper">
      <div class="cart__title">Корзина</div>
      <div class="cart__form">
        <div
          class="cart__input cart__input_cart"
        >
          <div
            v-for="(str, idx) in textCart"
            :key="idx"
          >
            {{ str }}
          </div>
        </div>
        <div v-if="fullCart">Корзина переполнина</div>
        <input
          class="cart__input cart__input_comment"
          v-model="message.comment" @change="statusMessage = ''" placeholder="Комментарий к заказу" required maxlength="256"
        >
        <input
          class="cart__input cart__input_name"
          v-model="message.name" @change="statusMessage = ''" placeholder="Имя" required maxlength="32"
        >
        <input
          class="cart__input cart__input_phone"
          v-model="message.phone" @change="statusMessage = ''" placeholder="Телефон" required maxlength="24"
        >
        <button
          :disabled="fullCart"
          class="cart__button"
          @click="sendMessage"
        >
          Отправить сообщение
        </button>
        <template v-if="!!statusMessage">
          <div
            v-if="statusMessage === 200"
            class="cart__statusSendMessage cart__statusSendMessage_good"
          >
            заказ отправлен
          </div>
          <div
            v-else
            class="cart__statusSendMessage cart__statusSendMessage_good"
          >
            ошибка отправки заказа
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const MAX_LENGTH_MESSAGE_FOR_TELEGRAM = 3500
import telegram_data from '/static/json/telegram-api.json'

export default {
  name: "cart",
  scrollToTop: true,
  data () {
    return {
      message: {},
      loading: true,
      statusMessage: '',
      textCart: [],
      fullCart: false
    }
  },
  methods: {
    async sendMessage() {
      const URL = `https://api.telegram.org/bot${telegram_data.token}/sendMessage?chat_id=${telegram_data['id-group']}&text=${this.composeTextForMessage()}&parse_mode=html`
      // const URL = `https://api.telegram.org/bot${telegram_data.token}/getUpdates`
      await fetch(URL)
        .then(response => {this.statusMessage = response.status})
        .catch(error => console.log(error))
        .finally(() => this.loading = false)
      this.message = {}

    },
    composeTextForMessage () {
      console.log(this.message.cart)
      const date = new Date().toLocaleString()
      return  '<b>ИМЯ</b>: ' + this.message.name +
        '%0A<b>Телефон</b>: ' + this.message.phone +
        '%0A' + date +
        '%0A' + this.message.cart
    },
    loadingItemInCart () {
      if (!localStorage.getItem('cart')) {
        return
      }
      const cartStorage = JSON.parse(localStorage.getItem('cart'));
      Object.keys(cartStorage).map(async jsonName => {
        const jsonURL = '/json/' + jsonName + '.json'
        const api = await this.$axios.$get(jsonURL)
        this.getInfoForCart(api, cartStorage, jsonName)
      })
    },
    getInfoForCart (oneFullJsonObj, cart, name) {
      this.fullCart = false
      this.textCart.push('____________' + this.replacementName(name) + '____________')
      this.message.cart = ''
      this.message.cart += this.replacementName(name) + "%0A"
      oneFullJsonObj.forEach(sectionJson => {
        const sectionStorage = Object.keys(cart[name])
        if (sectionStorage.indexOf((String(sectionJson.id))) >=0) {
          this.textCart.push( '.', sectionJson.type + ':')
          this.message.cart += sectionJson.type + ':%0A'
          sectionJson.set.forEach(dishJson => {
            const quantity = cart?.[name]?.[sectionJson.id]?.[dishJson.id]
            if (quantity) {
              this.textCart.push('-' + dishJson.title + ': ' + quantity + ' пр', '')
              this.message.cart += dishJson.title + ': ' + quantity + ' пр' + '%0A'
            }
          })
        }
      })
      if (this.message.cart.length > MAX_LENGTH_MESSAGE_FOR_TELEGRAM) {
        this.fullCart = true
      }
    },
    replacementName (name) {
      if (name === 'menu') {
        return 'Основное меню'
      }
      if (name === 'lunch') {
        return 'Бизнес-ланч'
      }
      if (name === 'menu') {
        return 'Карта бара'
      }
      return name
    }
  },
  mounted () {
    this.loadingItemInCart()
  },
}
</script>

<style lang="scss">
.cart {
  margin: 0;
  height: 100%;
  background-color: $white;
  &__wrapper {
    margin: 0 auto;
  }
  &__title {
    display: block;
    font-weight: 600;
    line-height: 46px;
    font-size: 32px;
    margin: 16px;
    letter-spacing: 1px;
    text-align: center;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding-top: 42px;
    width: $width-minimal;
  }
  &__input {
    margin-top: 16px;
    background-color: white;
    &_comment {
      height: 56px;
      width: $width-minimal;
    }
    &_cart {
      width: 100%;
      min-height: 300px;
    }
  }
  &__button {
    margin: 16px;
  }
}
</style>
