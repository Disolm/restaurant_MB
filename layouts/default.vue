<template>
  <main>
    <div class="container">
      <Header
        class="container__header"
      />
      <nuxt
        class="container__nuxt"
      />
      <Footer
        class="container__footer"
      />
    </div>
    <transition name="fade">
      <LoadingPage
        v-if="isLoadingPageShow"
        class="container__loading-page"
      />
    </transition>
  </main>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Default',
  Components: {
    Footer, Header
  },
  data () {
    return {
      isLoadingPageShow: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.isLoadingPageShow = true
      this.$nuxt.$loading.finish()
      this.isLoadingPageShow = false
    })
  }
}
</script>
<style lang="scss">
.size {
  height: calc(100% - $main-margin);
  width: calc(100% - $main-margin);
}
#__nuxt, #__layout, main {
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  //max-width: 960px;
  min-width: 280px;
  min-height: 100%;
  margin: 0 auto;
  font-size: 10px;
  font-family: Montserrat, Verdana, sans-serif;
  color: $black;
  @media screen and (min-width: $width-mobile) {
    font-size: 14px;
  }
  a {
    text-decoration: none;
  }
  &__header{
    margin-bottom: calc(($height-header-desktop * 2 - $main-margin)*(-1));
    z-index: 1;
  }
  &__nuxt {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: $height-footer;
    padding-top: calc($height-header-desktop + $height-navbar-mobile);
    margin-top: calc($main-margin + 4px);
    @media screen and (min-width: $width-mobile) {
      padding-top: calc($height-header-mobile + $height-navbar-desktop);
      margin-top: calc($main-margin + 14px);
    }
  }
  &__footer {
    z-index: 1;
    flex-shrink: 0;
    margin-top: -$height-footer;
  }
  &__loading-page {
    position: absolute;
    //background-color: rgba($black, 0.95);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
