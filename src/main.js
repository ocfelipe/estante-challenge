// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueTheMask from 'vue-the-mask'
import Cadastro from './components/Cadastro'

Vue.use(VueTheMask)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/estante-challenge/',
  //base: __dirname,
  routes: [
    {path: '/', component: App},
    {path: '/cadastro', component: Cadastro}
  ]
})

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: `
    <div id="app">
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Catálogo de Endereços</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Endereços</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cadastro">Cadastrar Endereço</router-link>
            </li>
          </ul>          
        </div>
      </nav>      
      <router-view></router-view>
    </div> 
  `
  //components: { App },
  //template: '<App/>'
}).$mount('#app')
