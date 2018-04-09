<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Cadastro de Endereço</h2>


    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <label for="inputCep">CEP</label>
          <the-mask mask="#####-###" class="form-control" id="inputCep" type="tel"  placeholder="Digite o CEP"></the-mask>
        </div>
      </div>
      <div class="col-md-3"><span class="text-danger"><strong>* CEP não encontrado</strong></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
