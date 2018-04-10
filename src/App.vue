<template>
  <div id="enderecosView" class="container">
    <div>
      <h1 class="page-header">Lista de Endereços</h1>
      <table v-if="enderecos.length>0" class="table table-striped table-sm">
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
          <td><button class="btn btn-secondary btn-sm" data-toggle="modal" v-on:click="abrirModal(enderecoShow)">Editar</button> </td>
          <td><button class="btn btn-danger btn-sm" v-on:click="deleteEnd(enderecoShow)">Remover</button></td>
        </tr>
        </tbody>
      </table>
      <div v-else class="alert alert-danger" role="alert">
        Não existem endereços cadastrados. Clique em <router-link to="/cadastro">Cadastrar Endereço</router-link> para adicionar um novo endereço.
      </div>
    </div>
    <div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalTitulo" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <form class="col-md-12" v-on:submit="atualizar">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitulo">Editar Endereço</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div class="modal-body">
            <div v-if="erros.length" class="alert alert-danger" role="alert">
              <b>Por favor corrija os erros a seguir:</b>
              <br/><br/>
              <ul>
                <li v-for="erro in erros">{{ erro }}</li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label for="inputCep">CEP</label>
                  <input disabled v-mask="'#####-###'" class="form-control" id="inputCep" type="tel"></input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="inputLogradouro">Logradouro</label>
                  <input class="form-control" id="inputLogradouro" type="text" />
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label for="inputNumero">Número</label>
                  <input class="form-control" id="inputNumero" type="tel" />
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="inputComplemento">Complemento</label>
                  <input class="form-control" id="inputComplemento" type="text"/>
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <label for="inputBairro">Bairro</label>
                  <input class="form-control" id="inputBairro" type="text" />
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group">
                  <label for="inputCidade">Cidade</label>
                  <input class="form-control" id="inputCidade" type="text"/>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <label for="inputEstado">Estado</label>
                  <input class="form-control" id="inputEstado" type="text" maxlength="2"/>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="submit" class="btn btn-primary" value="Salvar">Salvar</button>
          </div>
          </form>
        </div>
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
        erros: [],
        indice:-1
      }
    },
    methods: {
      deleteEnd: function (x) {
        this.enderecos.splice(this.enderecos.indexOf(x), 1);
      },
      abrirModal: function (x) {
        this.indice = this.enderecos.indexOf(x);
        this.erros = [];
        $('#inputCep').val(x.cep);
        $('#inputLogradouro').val(x.logradouro);
        $('#inputNumero').val(x.numero);
        $('#inputComplemento').val(x.complemento);
        $('#inputBairro').val(x.bairro);
        $('#inputCidade').val(x.localidade);
        $('#inputEstado').val(x.uf);
        $('#modalEditar').modal('show');
      },
      atualizar: function (e) {
        if ($('#inputCep').val() && $('#inputLogradouro').val() && $('#inputNumero').val() && $('#inputBairro').val() && $('#inputCidade').val() && $('#inputEstado').val()) {
          this.endereco.cep = $('#inputCep').val();
          this.endereco.logradouro = $('#inputLogradouro').val();
          this.endereco.numero = $('#inputNumero').val();
          this.endereco.complemento = $('#inputComplemento').val();
          this.endereco.bairro = $('#inputBairro').val();
          this.endereco.localidade = $('#inputCidade').val();
          this.endereco.uf = $('#inputEstado').val();
          this.enderecos.splice(this.indice, 1, this.endereco);
        } else {
          this.erros = [];
          if(!$('#inputCep').val()) this.erros.push("Preencha o CEP.");
          else if (!(/^[0-9]{5}-[0-9]{3}$/.test($('#inputCep').val()))) this.erros.push("Preencha o CEP com 8 dígitos. Formato: 00000-000.");
          if(!$('#inputLogradouro').val()) this.erros.push("Preencha o Logradoudo.");
          if(!$('#inputNumero').val()) this.erros.push("Preencha o Número.");
          if(!$('#inputBairro').val()) this.erros.push("Preencha o Bairro.");
          if(!$('#inputCidade').val()) this.erros.push("Preencha a Cidade.");
          if(!$('#inputEstado').val()) this.erros.push("Preencha o Estado.");
          e.preventDefault();
        }
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
