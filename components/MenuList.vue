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
              <div class="menu-list__block-top">
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
  },
  data () {
    return {
      content: contentJson,
    }
  },
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
    top: $height-navbar-mobile;
    @media screen and (min-width: $width-mobile) {
      top: $height-navbar-desktop;
    }
    text-decoration: underline;
    font-weight: bold;
    letter-spacing: 0.05rem;
    text-align: center;
  }
  //&__section-name:hover {
  //  cursor: pointer;
  //  color: #BFB8B1;
  //}
  &__dish {
    max-width: 600px;
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
    padding-right: 60px;
  }
  &__block-top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
  }
  &__block-bottom {
    display: flex;
    flex-direction: row;
    justify-content: flex-start
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
