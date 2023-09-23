<template>
  <div>
    <v-divider class="mb-6"></v-divider>
    <div class="container-paginacao">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="primary" v-on="on" @click="primeiraPagina" class="btn-paginacao">
            <v-icon>mdi-page-first</v-icon>
          </v-btn>
        </template>
        <span>Primeira página</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="primary" v-on="on" @click="paginaAnterior" class="btn-paginacao">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>Página anterior</span>
      </v-tooltip>
      <div class="ml-4 mr-4">{{paginaAtual}} de {{totalPaginas}}</div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="primary" v-on="on" @click="proximaPagina" class="btn-paginacao">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Próxima página</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="primary" v-on="on" @click="ultimaPagina" class="btn-paginacao">
            <v-icon>mdi-page-last</v-icon>
          </v-btn>
        </template>
        <span>Última página</span>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  props: ['totalPaginas', 'paginaAtual'],
  name: "Paginacao",
  data() {
    return {
      tPaginas: 1,
      pAtual: 1
    };
  },
  methods: {
    primeiraPagina(){
      this.$emit('primeiraPagina');
    },
    proximaPagina(){
      this.$emit('proximaPagina');
    },
    paginaAnterior(){
      this.$emit('paginaAnterior');
    },
    ultimaPagina(){
      this.$emit('ultimaPagina');
    }
  }
};
</script>
<style scoped>
.btn-paginacao:hover {
  background-color: #e4effa;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}
.container-paginacao {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>