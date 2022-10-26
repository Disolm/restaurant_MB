<template>
  <div class="menu-list">
    <div
      class="menu-list__content"
    >
      <div
        v-for="section in menuList"
        :key="section.id"
        class="menu-list__chapter"
      >
        <div
          class="menu-list__section-name"
          :style="{background: `url('${backgroundUrl}')`}"
          @click="section.isShow = !!section.isShow"
        >
          {{ section.type.toUpperCase() }}
        </div>
        <transition name="fade">
          <div
            v-if="!section.isShow"
          >
            <div
              v-for="dish in section.set"
              :key="dish.id"
              class="menu-list__dish"
            >
              <div
                :key="keyItemCart"
                class="menu-list__block-top"
              >
                <div class="menu-list__dish-title">
                  {{ dish.title.toUpperCase() }}
                  <template v-if="!!dish.weight">
                    <span
                      v-for="(itemWeight, idxW) in dish.weight"
                      :key="idxW"
                      class="menu-list__dish-weight"
                    >
                      {{ itemWeight }}{{ section.dimension }}
                      <span v-if="idxW + 1 < dish.weight.length"> /</span>
                    </span>
                  </template>
                </div>
                <div class="menu-list__dish-prices">
                  <div
                    v-for="(itemPrice, idxP) in dish.price"
                    :key="idxP"
                    class="menu-list__dish-price"
                  >
                    {{ itemPrice }}{{ content.menu.currency }}
                    <span v-if="idxP + 1 < dish.weight.length"> /</span>
                  </div>
                </div>
                <transition name="fade">
                  <div v-if="isShowChangeCart"
                       class="menu-list__change-cart-wrapper"
                       @click="minusItemInCart(section.id, dish.id)"
                  >
                    <img
                      class="menu-list__change-cart-img"
                      :class="{'menu-list__change-cart-img_disable': itemInCart[section.id][dish.id] === MIN_ITEM_IN_CART}"
                      src="/image/decrease.svg"
                      alt="-"
                      title="-"
                    >
                    <div class="menu-list__change-cart-input">{{ itemInCart[section.id][dish.id] }}</div>
                    <img
                      class="menu-list__change-cart-img"
                      :class="{'menu-list__change-cart-img_disable': itemInCart[section.id][dish.id] === MAX_ITEM_IN_CART}"
                      src="/image/increase.svg"
                      alt="+"
                      title="+"
                      @click="addItemInCart(section.id, dish.id)"
                    >
                  </div>
                </transition>
              </div>
              <div class="menu-list__block-bottom">
                <div
                  v-if="!!dish.description"
                  class="menu-list__dish-description"
                >
                  {{ dish.description }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import contentJson from 'static/json/content'
export default {
  name: 'MenuList',
  props: {
    menuList: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    backgroundUrl: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    nameFileMenu: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
  },
  data () {
    return {
      content: contentJson,
      isShowChangeCart: false,
      itemInCart: {},
      keyItemCart: 5555,
      MAX_ITEM_IN_CART: 9,
      MIN_ITEM_IN_CART: 0,
    }
  },
  methods: {
    addItemInCart (section, dish) {
      if (this.itemInCart[section][dish] < this.MAX_ITEM_IN_CART) {
        this.itemInCart[section][dish] += 1
      }
      this.keyItemCart += 1
      this.saveCats(this.nameFileMenu, section, dish, this.itemInCart[section][dish])
    },
    minusItemInCart (section, dish) {
      if (this.itemInCart[section][dish] > this.MIN_ITEM_IN_CART) {
        this.itemInCart[section][dish] -= 1
      }
      this.keyItemCart += 1
      this.saveCats(this.nameFileMenu, section, dish, this.itemInCart[section][dish])
    },
    createItemInCart () {
      this.menuList.forEach(item => {
        this.itemInCart[item.id] = {}
        item.set.forEach(lot => {
          const cartStorage = JSON.parse(localStorage.getItem('cart'));
          if (cartStorage?.[this.nameFileMenu]?.[item.id]?.[lot.id]) {
            this.itemInCart[item.id][lot.id] = cartStorage[this.nameFileMenu][item.id][lot.id]
          } else {
            this.itemInCart[item.id][lot.id] = 0
          }
        })
      })
      this.isShowChangeCart = true
      localStorage.removeItem('cart');
    },
    saveCats(namePage, section, dish, quantity) {
      let cartStorage = {}
      if (localStorage.getItem('cart')) {
      cartStorage = JSON.parse(localStorage.getItem('cart'));
      }
      if (cartStorage[namePage]){
        if (cartStorage[namePage][section]) {
          cartStorage[namePage][section] = Object.assign(cartStorage[namePage][section], {
            [dish]: quantity,
          })
        } else {
          cartStorage[namePage] = Object.assign(cartStorage[namePage], {
            [section]: {
              [dish]: quantity,
            }
          })
        }
      } else {
        cartStorage = Object.assign(cartStorage, {
          [namePage]: {
            [section]: {
              [dish]: quantity,
            }
          }
        })
      }
      const parsed = JSON.stringify(cartStorage);
      localStorage.setItem('cart', parsed);
    },
  },
  mounted() {
    this.createItemInCart()
  }
}
</script>

<style lang="scss">
.menu-list {
  flex: 1 0 auto;
  height: 100%;
  &__content {
    min-height: 100%;
    margin: 0 10px;
    width: calc(100% - 20px);
  }
  &__chapter {
    padding-top: 10px;
  }
  &__chapter:last-child {
    padding-bottom: 10px;
  }
  &__section-name {
    padding: 6px 0;
    margin: 0 auto;
    position: sticky;
    top: calc($height-header-navbar-mobile - 1px);
    @media screen and (min-width: $width-mobile) {
      top: calc($height-header-navbar-desktop - 1px);
    }
    text-decoration: underline;
    font-weight: bold;
    letter-spacing: 0.05rem;
    text-align: center;
    z-index: 1;
  }
  //&__section-name:hover {
  //  cursor: pointer;
  //  color: #BFB8B1;
  //}
  &__dish {
    max-width: 660px;
    margin: 10px auto;
  }
  &__dish-title {
    color: $brown;
    font-size: 16px;
    font-weight: bold;
    padding-right: 30px;
  }
  &__dish-weight {
    color: $black;
    font-size: 10px;
    font-weight: normal;
    white-space: nowrap;
  }
  &__dish-prices {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-left: auto;
    font-size: 16px;
  }
  &__dish-price {
    margin-left: 3px;
    white-space: nowrap;
  }
  &__dish-description {
    font-size: 10px;
    letter-spacing: 0.05rem;
    padding-right: 120px;
  }
  &__block-top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  &__block-bottom {
    display: flex;
    flex-direction: row;
    justify-content: flex-start
  }
  &__change-cart-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: 8px;
    z-index: 0;
  }
  &__change-cart-input {
    width: 16px;
    text-align: center;
    font-size: 16px;
    margin: 0 4px;
    border: solid 1px $brown;
    border-radius: 2px;
    background-color: $white;
  }
  &__change-cart-img {
    width: 18px;
    height: 18px;
    //padding: 4px;
    &_disable {
      opacity: 0.3;
    }
  }
  &__change-cart-img:hover {
    cursor: pointer;
    border-radius: 9px;
    box-shadow: 0 0 0 1px rgba($black, 0.2);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
