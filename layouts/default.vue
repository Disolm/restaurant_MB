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
    Header,
    Footer
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
    margin-top: calc($main-margin + 4px);
    padding-bottom: calc($height-footer + $main-margin);
    padding-top: calc($height-header-desktop * 2 + $main-margin * 2);
    @media screen and (min-width: $width-mobile) {
      padding-top: calc($height-header-mobile * 2 + $main-margin);
    }
  }
  &__footer {
    z-index: 1;
    flex-shrink: 0;
    margin-top: -$height-footer;
  }
}
</style>
