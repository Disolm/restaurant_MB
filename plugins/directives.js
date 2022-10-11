import Vue from 'vue'

Vue.directive('scroll', {
  inserted (el, binding) {
    const f = (evt) => {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
