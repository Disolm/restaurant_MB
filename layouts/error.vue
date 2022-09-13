<template>
  <section>
    <div class="error">
      <h1>Error 404</h1>
      <h2>Такой страницы не существует</h2>
      <nuxt-link to="/">
        Вернусться на главную страницу
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped>
  .error {
    height: 400px;
    width: 100%;
    text-align: center;
    padding-top: 100px;
    background-color: #FFF2E7;
  }
  h1 {
    margin: auto;
    color: #272727;
  }
</style>
