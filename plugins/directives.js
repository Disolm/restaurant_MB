import Vue from 'vue'

Vue.directive('scroll', {
  inserted (el, binding) {
    const f = (evt) => {
      if (binding.value.handleScroll(evt, el, binding.value.type)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
    f()
  }
})
