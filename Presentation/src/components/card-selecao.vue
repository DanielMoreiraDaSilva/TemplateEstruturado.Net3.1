<template>
  <v-card class="lwart-card pa-4" v-on:click="irParaLink()">
    <div class="lwart-card-title">
      <v-icon size="50px" color="secondary" left>{{card.icone}}</v-icon>
      <span class="primary--text">{{card.titulo}}</span>
    </div>
    <div class="lwart-card-text" v-if="card.descricao">
      <v-card-text>{{card.descricao}}</v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  props:["card"],
  name: 'CardSelecao',
  data() {
    return {};
  },
  methods: {
    irParaLink(){
      if(this.card.url)
        this.$router.push(this.card.url).catch(failure => { localStorage.setItem("erro", failure) });
    }
  }
}
</script>
<style scoped>
.lwart-card {
  transition: 0.3s ease;
  cursor: pointer;
}
.lwart-card-title{
  display: flex;
  align-items: center;
  justify-content: center;
}
.lwart-card-title span{
  font-size: 20px;
}
.lwart-card-text{
  height: 75px;
  text-align: center;
}
.lwart-card:hover {
  transform: translateY(-5px);
  background-color: #e4effa;
}
.ultimoItem{
  margin-bottom: 50px;
}
</style>