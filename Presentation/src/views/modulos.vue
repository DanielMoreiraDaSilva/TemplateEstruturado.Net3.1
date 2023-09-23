<template>
  <div>
    <Header titulo="Módulos" />
    <div class="pa-6 app-container" >
      <v-row style="justify-content: center" class="mt-6">
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          v-for="(modulo, index) in modulos"
          :key="modulo.id"
        >
          <CardModulo
            v-bind:card="modulo"
            v-bind:class="index == modulos.length - 1 ? 'ultimoItem' : ''"
          ></CardModulo>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import CardModulo from "../components/card-selecao.vue";
import StorageService from '../service/storage-service.js';

const storageService = new StorageService();

export default {
  name: "Modulos",
  components: {
    Header,
    CardModulo,
  },
  data() {
    return {
      modulos: [],
    };
  },
  created: function () {
    this.modulos = JSON.parse(localStorage.getItem("login"))?.perfil.modulos;
  },
  mounted: async function () {
    await storageService.validarToken();
    setTimeout(() => {
      document.getElementsByTagName("html")[0].style.overflow = "hidden auto";
    }, 100);
  },
};
</script>