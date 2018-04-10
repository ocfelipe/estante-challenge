<template>
  <div id="enderecosAdd" class="container">
    <div class="row show-grid">
      <form class="col-md-12" v-on:submit="registrar">
        <h1 class="page-header">Cadastro de Endereço</h1>
        <div v-if="erros.length" class="alert alert-danger" role="alert">
          <b>Por favor corrija os erros a seguir:</b>
          <br/><br/>
          <ul>
            <li v-for="erro in erros">{{ erro }}</li>
          </ul>
        </div>
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label for="inputCep">CEP</label>
              <input v-mask="'#####-###'" class="form-control" id="inputCep" type="tel" v-model="cep" v-on:keyup="buscar"></input>
            </div>
          </div>
          <div class="col-md-3"><span class="text-danger" v-show="naoEncontrado"><strong>* CEP não encontrado</strong></span></div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="inputLogradouro">Logradouro</label>
              <input class="form-control" id="inputLogradouro" type="text" v-model="endereco.logradouro"/>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="inputNumero">Número</label>
              <input class="form-control" id="inputNumero" type="tel" v-model="endereco.numero"/>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="inputComplemento">Complemento</label>
              <input class="form-control" id="inputComplemento" v-model="endereco.complemento" type="text"/>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="col-md-5">
            <div class="form-group">
              <label for="inputBairro">Bairro</label>
              <input class="form-control" id="inputBairro" type="text" v-model="endereco.bairro"/>
            </div>
          </div>
          <div class="col-md-5">
            <div class="form-group">
              <label for="inputCidade">Cidade</label>
              <input class="form-control" id="inputCidade" type="text" v-model="endereco.localidade"/>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="inputEstado">Estado</label>
              <input class="form-control" id="inputEstado" type="text" v-model="endereco.uf" maxlength="2"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <button type="submit" class="btn btn-primary" value="Salvar">Salvar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Cadastro",
      data() {
        return {
          cep: '',
          endereco: {},
          enderecos: [],
          naoEncontrado: false,
          erros: []
        }
      },
      methods: {
        registrar: function registrar(e) {
          // processar dados
          if (this.cep && this.endereco.logradouro && this.endereco.numero && this.endereco.bairro && this.endereco.localidade && this.endereco.uf) {
            this.enderecos.push(this.endereco);
            localStorage.setItem('enderecos', JSON.stringify(this.enderecos));
            console.log('New Address');
            this.$router.push({path: '/'});
          } else {
            this.erros =[];
            if(!this.cep) this.erros.push("Preencha o CEP.");
            else if (!(/^[0-9]{5}-[0-9]{3}$/.test(this.cep))) this.erros.push("Preencha o CEP com 8 dígitos. Formato: 00000-000.");
            if(!this.endereco.logradouro) this.erros.push("Preencha o Logradoudo.");
            if(!this.endereco.numero) this.erros.push("Preencha o Número.");
            if(!this.endereco.bairro) this.erros.push("Preencha o Bairro.");
            if(!this.endereco.localidade) this.erros.push("Preencha a Cidade.");
            if(!this.endereco.uf) this.erros.push("Preencha o Estado.");
            e.preventDefault();
          }
        },
        buscar: function buscar() {
          var self = this;
          self.naoLocalizado = false;

          if (/^[0-9]{5}-[0-9]{3}$/.test(this.cep)) {
            var guardaCep = this.cep;
            $.getJSON("https://viacep.com.br/ws/" + this.cep + "/json/", function (endereco) {
              if (endereco.erro) {
                self.endereco = {};
                self.endereco.cep = guardaCep;
                $("#inputLogradouro").focus();
                self.naoEncontrado = true;
                return;
              }
              self.endereco = endereco;
              console.log(endereco);
              $("#inputNumero").focus();
            });
          }
        }
      },
      mounted() {
        console.log('App mounted!');
        if (localStorage.getItem('enderecos')) this.enderecos = JSON.parse(localStorage.getItem('enderecos'));
      },

    }
</script>

<style scoped>
  #enderecosAdd {
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
