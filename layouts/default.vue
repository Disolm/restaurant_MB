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
    }
  },
}
</script>
<style lang="scss">
.size {
  height: calc(100% - $main-margin);
  width: calc(100% - $main-margin);
}
#__nuxt, #__layout {
  height: 100%;
}
main {
  height: calc(100% + $height-footer + $main-margin);
  padding-bottom: $main-margin;
}
.container {
  display: flex;
  flex-direction: column;
  min-width: calc($width-minimal - $main-margin * 2);
  min-height: 100%;
  margin: 0 auto $main-margin;
  font-size: 10px;
  font-family: Montserrat, Verdana, sans-serif;
  color: $black;
  background-color: $black;
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
}
</style>
