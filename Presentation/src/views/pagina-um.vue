<template>
  <div>
    <Header titulo="Pagina 1"  homeModulo="/modulos" tooltipModulo="Módulos"/>
    <div class="pa-6 app-container">
      <v-row style="justify-content: center;" class="mt-6">
        <v-col cols="12" sm="12" md="6" lg="4" v-for="(pagina, index) in paginas" :key="pagina.id">
          <CardSelecao
            v-bind:card="pagina"
            v-bind:class="index == paginas.length - 1 ? 'ultimoItem' : ''"
          ></CardSelecao>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import CardSelecao from "../components/card-selecao.vue";
import StorageService from "../service/storage-service.js";

const storage = new StorageService

export default {
  components: {
    Header,
    CardSelecao
  },
  data() {
    return {
      paginas: [],
    };
  },
  created: function() {
    let modulos = JSON.parse(localStorage.getItem("login"))?.perfil.modulos;
    if(modulos){
      let paginas = modulos.filter(x => {
        return x.id == this.$globals.modulo.toLowerCase();
      })[0].moduloPaginas;
      this.paginas = paginas.filter(x => {
        return x.card == true;
      });
    }
  },
  mounted: function() {
    document.getElementsByTagName("html")[0].style.overflow = "hidden auto";
  },
  beforeMount: function() {
    storage.validarToken();
  },
};
</script>