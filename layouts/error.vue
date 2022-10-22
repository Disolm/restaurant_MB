<template>
  <div class="error">
    <div class="error__title">
      <h1>Error 404</h1>
      <h2>Такой страницы не существует или она находится ещё в разработке</h2>
      <h3>Это всего лишь ошибка на сайте, ресторан по прежнему работаем</h3>
    </div>
    <nuxt-link
      class="error__link"
      to="/"
    >
      Вернусться на главную страницу
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="scss">
  .error {
    height: 100vh;
    width: 100%;
    text-align: center;
    //padding-top: 100px;
    background-color: #FFF2E7;
    margin-top: 0;
    &__title {
      @include padding-top-main;
      margin: 42px;
    }
    &__link {
      font-size: 20px;
      border: 2px solid rgba(225, 255, 255, 0);
    }
    &__link:hover {
      //border-bottom: 2px solid rgba(0, 0, 0, 1);
      cursor: pointer;
      color: $brown;
      text-decoration: underline;
    }
  }
  h1 {
    margin: auto;
    color: $black;
  }
</style>
