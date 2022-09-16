<template>
  <section>
    <div class="error">
      <h1>Error 404</h1>
      <h2>Такой страницы не существует или ещё в разработке</h2>
      <div >
        <nuxt-link
          class="error__link"
          to="/">
          Вернусться на главную страницу
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="scss">
  .error {
    height: 400px;
    width: 100%;
    text-align: center;
    padding-top: 100px;
    background-color: #FFF2E7;
    &__link {
      border: 2px solid rgba(225, 255, 255, 0);
    }
    &__link:hover {
      border-bottom: 2px solid rgba(0, 0, 0, 1);
      cursor: pointer;
      color: #A67145;
    }
  }
  h1 {
    margin: auto;
    color: #272727;
  }
</style>
