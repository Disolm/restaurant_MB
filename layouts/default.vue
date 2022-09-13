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
  height: calc(100% - 8px);
}
#__nuxt, #__layout, main {
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  min-width: 280px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #FFF2E7;
  font-size: 12px;
  font-family: Montserrat, Verdana, sans-serif;
  color: #272727;
  @media screen and (min-width: 769px) {
    font-size: 14px;
  }
  a {
    text-decoration: none;
    color: #272727;
  }
  &__header{
  }
  &__nuxt {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }
  &__footer {
    flex-shrink: 0;
  }
}
</style>
