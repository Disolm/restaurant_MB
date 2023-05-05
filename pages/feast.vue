<template>
  <div class="feast">
    <div class="feast__wrapper">
      <div class="feast__grid">
        <transition-group name="slide-fade" tag="div" class="feast__titles">
          <template v-if="isLoading">
<!--            <div-->
<!--              class="feast__title"-->
<!--              key="title"-->
<!--            >-->
<!--              {{ content.feast.title }}-->
<!--            </div>-->
            <div
              v-for="title in content.feast.descriptions"
              class="feast__description"
              :key="title"
            >
              {{ title }}
            </div>
          </template>
        </transition-group>

        <div
          v-if="isLoading"
          class="feast__buttons"
        >
          <div
            v-for="button in content.feast.buttons"
            :key="button.id"
            class="feast__button">
            <a
              :href="button.href"
              class="feast__link"
              :target="button.target"
            >
              {{ button.title }}
            </a>
          </div>
        </div>
      </div>
      <div class="feast__void" />
    </div>
  </div>
</template>

<script>
export default {
  name: "feast",
  async asyncData ({ $axios }) {
    const contentApi = await $axios.$get('/json/content.json')
    return {
      content: contentApi
    }
  },
  data () {
    return {
      isLoading: false,
    }
  },
  mounted() {
    this.isLoading = true
  }
}
</script>

<style lang="scss">
.feast {
  margin-top: 0;
  width: 100%;
  height: auto;
  background: linear-gradient( rgba(166, 113, 69, 0.3), rgba(0, 0, 0, 0.6) ), url("/image/background/background-feast.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  &__wrapper {
    width: calc(100% - 24px);
    padding: 22px 12px $height-footer 12px;
    flex: 1 0 auto;
    background-color: rgba($black, 0.4);
    @media screen and (min-width: $width-tablet) {
      padding: 42px 12px $height-footer 12px;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(2, auto);
    @media screen and (min-width: $width-tablet) {
      grid-template-columns: 0.5fr 1fr;
      padding: 42px 12px 0 12px;
    }
  }
  &__titles {
    grid-area: 1 / 2 / 2 / 3;
  }
  &__title {
    margin-bottom: 32px;
  }
  &__title, &__description {
    background: rgba($black, 0.2);
    box-shadow: 0 0 50px rgba($black, 0.5);
    border-radius: 32px;
    color: $white;
    letter-spacing: 0.8px;
    font-weight: 400;
    padding: 0 16px;
    font-size: 16px;
    line-height: 22px;
    @media screen and (min-width: $width-mobile) {
      line-height: 32px;
      padding: 0 24px;
    }
  }
  &__buttons {
    width: 100%;
    height: 100%;
    margin: 16px auto;
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
  }
  &__button {
    margin: 8px;
  }
  &__link {
    text-decoration: none;
    border: 1px solid $white;
    border-radius: 6px;
    padding: 10px;
    color: $white;
    letter-spacing: 0.8px;
    font-size: 12px;
    background-color: rgba($brown, 0.2);
    @media screen and (min-width: $width-mobile) {
      font-size: 14px;
    }
  }
  &__link:hover {
    cursor: pointer;
    border: 1px solid $brown;
  }
  &__void {
    grid-area: 1 / 1 / 3 / 2;
  }
}
</style>
