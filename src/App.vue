<template>
  <div id="enderecosView" class="container">
    <div>
      <h1 class="page-header">Lista de Endereços</h1>
      <table v-if="enderecos.length>0" class="table table-striped">
        <thead>
        <tr>
          <th>Logradouro</th>
          <th>Número</th>
          <th>Complemento</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>UF</th>
          <th>CEP</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="enderecoShow in enderecos">
          <td>{{enderecoShow.logradouro}}</td>
          <td>{{enderecoShow.numero}}</td>
          <td>{{enderecoShow.complemento}}</td>
          <td>{{enderecoShow.bairro}}</td>
          <td>{{enderecoShow.localidade}}</td>
          <td>{{enderecoShow.uf}}</td>
          <td>{{enderecoShow.cep}}</td>
          <td><button class="btn btn-danger" v-on:click="deleteEnd(enderecoShow)">Remover</button> </td>
        </tr>
        </tbody>
      </table>
      <div v-else class="alert alert-danger" role="alert">
        Não existem endereços cadastrados
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        cep: '',
        endereco: {},
        enderecos: [],
        naoEncontrado: false
      }
    },
    methods: {
      deleteEnd: function (x) {
        this.enderecos.splice(this.enderecos.indexOf(x), 1);
      }
    },
    mounted() {
      console.log('App mounted!');
      if (localStorage.getItem('enderecos')) this.enderecos = JSON.parse(localStorage.getItem('enderecos'));
    },
    watch: {
      enderecos: {
        handler() {
          console.log('Enderecos changed!');
          localStorage.setItem('enderecos', JSON.stringify(this.enderecos));
        },
        deep: true,
      },
    },
  }
</script>

<style scoped>
  #enderecosView {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }
  h1 {
    margin-bottom: 30px;
  }
</style>
