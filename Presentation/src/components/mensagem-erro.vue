<template>
  <div>
    <v-alert
      transition="slide-y-reverse-transition"
      color="red lighten-1"
      colored-border
      icon="mdi-alert"
      v-bind:class="
        login
          ? 'alerta-login red--text lighten-1'
          : 'alerta red--text lighten-1'
      "
      elevation="6"
      border="left"
      prominent
      text
      v-model="modal"
    >
      {{ mensagemAlerta }}
      <v-btn v-on:click="ocultarMensagem" icon>
        <v-icon color="red lighten-1">mdi-close</v-icon>
      </v-btn>
    </v-alert>
  </div>
</template>
<script>
export default {
  name: "MensagemErro",
  props: ["mensagemAlerta", "alertaErro", "login"],
  data() {
    return {
      modal: false,
    };
  },
  methods: {
    ocultarMensagem() {
      this.modal = false;
      setTimeout(() => {
        this.$emit("ocultarErro");
      }, 250);
    },
  },
  watch: {
    alertaErro() {
      this.modal = this.alertaErro;
    },
  },
};
</script>
<style scoped>
.alerta {
  position: fixed;
  bottom: 7px;
  right: 24px;
  z-index: 1000;
  background-color: white !important;
}
.alerta-login {
  position: fixed;
  bottom: 0;
  right: 16px;
  z-index: 1000;
  background-color: white !important;
}
</style>