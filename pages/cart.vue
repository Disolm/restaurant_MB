<template>
  <div class="cart">
    <div class="cart__wrapper">
      <div class="cart__container">
        <div class="cart__header">
          <!--        <h5 class="cart__title">"Корзина" в разработке, для офрмления заказа звоните по 311-04-24</h5>-->
          <h5 class="cart__title">Корзина</h5>
          <div
            @click="clearOut"
            v-if="!emptyBasket"
            class="cart__clear-cart"
            key="clearOut"
          />
        </div>
        <template>
        <transition name="fade" mode="out-in">
          <div
            v-if="emptyBasket"
            class="cart__empty-basket"
            key="emptyBasket"
          >
            Ваша корзина пуста!
          </div>
          <template v-else>
            <div
              :key="cartKey"
              class="cart__lists"
            >
              <div
                v-for="list in textCart"
                :key="list.name"
                class="cart__list"
              >
                <div class="cart__list-title">
                  {{ list.name }}
                </div>
                <div class="cart__sections">
                  <template v-if="!list?.section?.dish">
                    <div
                      v-for="section in list.section"
                      :key="section.id"
                      class="cart__section"
                    >
                      <div class="cart__section-title">
                        {{section.name}}
                      </div>
                      <div
                        v-for="dish in section.dish"
                        :key="dish.id"
                        class="cart__dish"
                      >
                        <div class="cart__dish-title">
                          {{ dish.title }}
                        </div>
                        <div
                          v-if="dish.weight[dish.active]"
                          class="cart__dish-weight">
                          {{ dish.weight[dish.active] }}{{ dish.dimension }}
                        </div>
                        <div class="cart__dish-quantity">
                          {{ dish.quantity }}x
                        </div>
                        <div class="cart__dish-price">
                          {{ dish.price[dish.active] }}р
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </transition>
        </template>
      </div>
      <div
        class="cart__form-wrapper"
      >
        <template>
        <transition name="slide-fade" mode="out-in">
          <div
            v-if="!emptyBasket"
            class="cart__form"
            key="form"
          >
            <textarea
                class="cart__input cart__input_comment"
                v-model="message.comment" @change="statusMessage = ''" placeholder="Комментарий к заказу" required maxlength="256"
                @input="resize($event)"
            ></textarea>
            <input
              class="cart__input cart__input_name"
              :class="{'cart__input_error': inputError.name}"
              @input="validName"
              v-model="message.name" @change="statusMessage = ''" placeholder="Имя" required maxlength="32"
            >
            <input
              class="cart__input cart__input_phone"
              :class="{'cart__input_error': inputError.phone}"
              @input="validPhone"
              v-model="message.phone" @change="statusMessage = ''" placeholder="Телефон" required maxlength="20"
            >
            <div class="cart__input cart__sum">
              <p>
                <span>Сумма: </span> <span>{{ total }}р</span>
              </p>
              <p>
                <span>Скидка самовывоза: </span> <span>{{ discount.toFixed(2) * 100 }}%</span>
              </p>
              <p>
                <span>Итого к оплате: </span> <span>{{ total - total * discount.toFixed(2) }}р</span>
              </p>
            </div>
            <button
              :disabled="fullCart || validError "
              class="cart__button"
              @click.prevent="sendMessage"
            >
              {{ validError ? 'Ошибка ввода данных' : 'Оформить заказ' }}
            </button>
          </div>
          <div
            v-else-if="statusMessage === 200 && emptyBasket"
            class="cart__form"
            key="statusMessageGood"
          >
            <div
              class="cart__status-send-message cart__statusSendMessage_good"
            >
              Заказ отправлен<br><br>
              Ожидайте звонка от аминистратора ресторана для подтверждения заказа
            </div>
          </div>
          <div
            v-else-if="statusMessage !== 200 && statusMessage !== 0 && emptyBasket"
            class="cart__form"
            key="statusMessageError"
          >
            <div
              class="cart__status-send-message cart__statusSendMessage_bead"
            >
              Ошибка отправки заказа
            </div>
          </div>
        </transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const MAX_LENGTH_MESSAGE_FOR_TELEGRAM = 3500
const MIN_LENGTH_NAME = 3
const MIN_LENGTH_PHONE = 7
import telegram_data from '/static/json/telegram-api.json'

export default {
  name: "cart",
  scrollToTop: true,
  data () {
    return {
      message: {
        name:'',
        phone: '',
        comment: '',
        cart: '',
      },
      loading: true,
      statusMessage: 0,
      textCart: [],
      fullCart: false,
      validError: false,
      inputError: {
        name: false,
        phone: false,
      },
      cartKey: 0,
      total: 0,
      discount: 0.1,
      emptyBasket: false,
    }
  },
  methods: {
    clearOut () {
      localStorage.removeItem('cart')
      this.loadingItemInCart()
      this.cartKey += 1
    },
    resize (textarea) {
      textarea.target.style.height = 'auto'
      textarea.target.style.height = `${Math.ceil(textarea.target.scrollHeight) - 12}px`
    },
    async sendMessage() {
      this.checkForValidation ()
      if (this.inputError.name || this.inputError.phone) return
      const URL = `https://api.telegram.org/bot${telegram_data.token}/sendMessage?chat_id=${telegram_data['id-group']}&text=${this.composeTextForMessage()}&parse_mode=html`
      // const URL = `https://api.telegram.org/bot${telegram_data.token}/getUpdates`
      await fetch(URL)
        .then(response => {this.statusMessage = response.status})
        .catch(error => console.log(error))
        .finally(() => this.loading = false)
      this.message = {name:'', phone: '', comment: '', cart: ''}
      localStorage.removeItem('cart')
      this.loadingItemInCart()
      this.cartKey += 1
    },
    composeTextForMessage () {
      const date = new Date().toLocaleString()
      const discount = this.discount * 100
      const result = this.total - this.total * this.discount
      return  '<b>ИМЯ</b>: ' + this.message.name +
        '%0A<b>Телефон</b>: ' + this.message.phone +
        '%0A' + date +
        '%0A<b>Комментарий:</b> ' + this.message.comment +
        '%0A' + this.message.cart +
        '%0A' + 'Сумма заказа: ' + this.total  + 'р' +
        '%0A' + 'Скидка самовывоза: ' + discount + '%' +
        '%0A' + 'Итого к оплате: ' + result + 'р'
    },
    loadingItemInCart () {
      this.emptyBasket = false
      if (!localStorage.getItem('cart')) {
        this.emptyBasket = true
        return
      }
      const cartStorage = JSON.parse(localStorage.getItem('cart'));
      Object.keys(cartStorage).map(async jsonName => {
        const jsonURL = '/json/' + jsonName + '.json'
        const api = await this.$axios.$get(jsonURL)
        this.getDateForCart(api, cartStorage, jsonName)
      })
      this.cartKey += 1
    },
    getDateForCart (oneFullJsonObj, cart, title) {
      this.fullCart = false
      const normalName = this.replacementName(title)
      const cartElement = Object.assign({},{
        name: normalName,
        section: [],
      })
      this.total = 0
      this.message.cart += '<u>' + normalName + '</u>' + '%0A'
      oneFullJsonObj.forEach(sectionJson => {
        const sectionStorage = Object.keys(cart[title])
        if (sectionStorage.indexOf((String(sectionJson.id))) >=0) {
          this.message.cart += '<i>' + sectionJson.type + '</i>' + ':%0A'
          const dish = []
          sectionJson.set.forEach(dishJson => {
            const quantity = cart?.[title]?.[sectionJson.id]?.[dishJson.id]?.[0]
            const choice = cart?.[title]?.[sectionJson.id]?.[dishJson.id]?.[1]
            if (quantity) {
              dishJson.dimension = sectionJson.dimension
              dishJson.quantity = quantity
              dishJson.active = choice
              dish.push(dishJson)
              this.total += quantity * dishJson.price[choice]
              this.message.cart += dishJson.title + ': ' + quantity + 'шт, по ' + dishJson.price[choice] + 'р' + '%0A'
            }
          })
          cartElement.section.push({
            name: sectionJson.type,
            dish,
            id: sectionJson.id
          })
        }
      })
      if (this.message.cart.length > MAX_LENGTH_MESSAGE_FOR_TELEGRAM) {
        this.fullCart = true
      }
      this.textCart.push(cartElement)
    },
    replacementName (name) {
      if (name === 'menu') {
        return 'Основное меню'
      }
      if (name === 'lunch') {
        return 'Бизнес-ланч'
      }
      if (name === 'mapBar') {
        return 'Карта бара'
      }
      return name
    },
    checkForValidation () {
      if (this.message.name.length < MIN_LENGTH_NAME) this.inputError.name = true
      if (this.message.phone.length < MIN_LENGTH_PHONE) this.inputError.phone = true
      this.validError = this.inputError.name || this.inputError.phone
    },
    validName () {
      this.inputError.name = !this.message.name.length >= MIN_LENGTH_NAME
      this.validError = false
    },
    validPhone () {
      const reg = /^[\d+][\d() -]{7,18}\d$/
      const phone = this.message.phone
      this.inputError.phone = !reg.test(phone)
      this.validError = false
    },
  },
  mounted () {
    this.loadingItemInCart()
  },
}
</script>

<style lang="scss">
.cart {
  margin: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient( rgba(256, 256, 256, 0.8), rgba(0, 0, 0, 0.5) ),url("/image/background-cart.jpg") 0 0 repeat;
  &__empty-basket {
    margin: 16px auto;
    font-size: 18px;
    line-height: 1.56;
    color: $brown;
    width: 100%;
    padding: 100px 0;
    text-align: center;
    border-radius: 12px;
    background-color: $white;
  }
  &__wrapper {
    width: 96%;
    margin: 0 auto;
    max-width: $width-desktop;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 0;
    grid-row-gap: 0;
    @media screen and (min-width: $width-tablet) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      grid-column-gap: 22px;
    }
  }
  &__container {
    grid-area: 1 / 1 / 2 / 2;
    @media screen and (min-width: $width-tablet) {
      grid-area: 1 / 1 / 2 / 3;
    }
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 16px 0;
  }
  &__header {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: flex-end;
    grid-area: 2 / 1 / 3 / 2;
    @media screen and (min-width: $width-tablet) {
      grid-area: 1 / 3 / 2 / 4;
    }
  }
  &__clear-cart {
    border: solid 1px $white;
    margin: 2px;
    border-radius: 6px;
    background-color: rgba($white, 0.5);
    background-image: url("/image/food-cart-clear.svg");
    background-size: cover;
    width: 32px;
    height: 32px;
  }
  &__clear-cart:hover {
    cursor: pointer;
    border: solid 1px $brown;
    background-color: rgba($brown, 0.5);
  }
  &__title {
    display: block;
    font-weight: 800;
    line-height: 46px;
    font-size: 26px;
    margin: 16px auto 0 16px;
    letter-spacing: 1px;
    text-align: center;
  }
  &__lists {
    width: 100%;
  }
  &__list {
    background-color: rgba($white, 0.7);
    border-radius: 12px;
    padding: 16px 6px;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__list-title {
    margin: 12px 0;
    font-size: 18px;
    font-weight: 600;
  }
  &__sections {
    width: 100%;
    font-size: 14px;
    @media screen and (min-width: $width-mobile ){
      font-size: 16px;
    }
  }
  &__section {
    padding: 12px;
    margin: 12px 0;
    background-color: rgba($black, 0.2);
    border-radius: 12px;
  }
  &__section-title {
    margin-bottom: 12px;
    font-weight: 500;
    border-bottom: solid 1px $brown;
  }
  &__dish {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  &__dish-title {
    margin-right: 12px;
  }
  &__dish-weight {
    font-size: 12px;
    @media screen and (min-width: $width-mobile ){
      font-size: 14px;
    }
  }
  &__dish-quantity {
    margin-left: auto;
  }
  &__form-wrapper {
    width: 100%;
    margin: 0 0 62px 0;
    @media screen and (min-width: $width-tablet ){
      margin: 94px 0 32px 0;
    }
  }
  &__form {
    position: sticky;
    top: $height-header-navbar-mobile;
    @media screen and (min-width: $width-mobile) {
      top: $height-header-navbar-desktop;
    }
    display: flex;
    flex-direction: column;
    align-items: stretch;
    //max-width: $width-mobile;
    background-color: rgba($white, 0.7);
    border-radius: 12px;
    padding: 0 6px;
  }
  &__sum {
    p {
      margin: 2px 0;
    }
  }
  &__input {
    margin-top: 16px;
    border: none;
    border-radius: 6px;
    padding: 6px;
    background-color: white;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &_name, &_phone {
      height: 22px;
    }
    &_comment {
      min-height: 56px;
      resize: none;
      overflow: hidden;
      font-size: 14px;
    }
    &_error {
      box-shadow: 0 0 16px 2px rgba($red, 0.6);
    }
  }
  &__input::placeholder {
    color: $brown;
    opacity: 0.9;
  }
  &__input:focus {
    border: none;
    outline: 0;
    box-shadow: 0 0 16px 2px rgba($white, 0.6);
  }
  &__button {
    margin: 16px 0;
    height: 42px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid $white;
    color: $white;
    letter-spacing: 0.8px;
    font-size: 14px;
    background-color: rgba($brown, 0.6);
    @media screen and (min-width: $width-mobile) {
      font-size: 16px;
    }
  }
  &__button:hover:enabled {
    cursor: pointer;
    color: $brown;
    border: 1px solid $brown;
    background-color: rgba($white, 0.6);
  }
  &__button:active:enabled {
    cursor: pointer;
    color: $brown;
    border: 1px solid $brown;
    background-color: rgba($white, 0.2);
  }
  &__button:disabled,
  &__button[disabled]{
    background-color: rgba($black, 0.3);
    color: rgba($white, 0.6);
    border: 1px solid rgba($brown, 0.6);
  }
  &__status-send-message {
    text-align: center;
    margin: 32px auto;
    padding: 0 6px;
    color: $brown;
  }
}
</style>
