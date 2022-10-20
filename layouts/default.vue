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
body {
  margin: 0;
}
.size {
  height: 100%;
  width: 100%;
}
#__nuxt, #__layout {
  height: 100%;
}
main {
  height: calc(100% + $height-footer);
}
.container {
  display: flex;
  flex-direction: column;
  min-width: $width-minimal;
  min-height: 100%;
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
    margin-bottom: calc($height-header-mobile * (-1));
    @media screen and (min-width: $width-mobile) {
      margin-bottom: calc($height-header-desktop * (-1));
    }
    z-index: 1;
  }
  &__nuxt {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: $height-footer;
    padding-top: $height-header-mobile;
    margin-top:  - $height-header-mobile;
    @media screen and (min-width: $width-mobile) {
      padding-top: $height-header-desktop;
      margin-top: - $height-header-desktop;
    }
  }
  &__footer {
    z-index: 1;
    flex-shrink: 0;
    margin-top: -$height-footer;
  }
}
</style>
