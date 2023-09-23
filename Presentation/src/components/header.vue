<template>
  <div>
    <v-app-bar color="white" light height="120px">
      <v-tooltip bottom v-if="!paginaInicial">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="mr-4 btn-voltar" v-on:click="voltar">
            <v-icon size="30px">mdi-arrow-left</v-icon>
          </div>
        </template>
        <span>Voltar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <div class="imagem-modulo" v-on="on" @click="irParaLink('/modulos')">
            <img
              src="@/assets/exemplo-logo.jpg"
              width="255px"
              class="d-none d-sm-flex"
            />
          </div>
        </template>
        <span>Módulos</span>
      </v-tooltip>
      <div class="lwart-divisor"></div>
      <v-toolbar-title class="titulo-header ml-3">
        <v-icon
          class="d-xs-none"
          v-if="$route.path !== homeModulo && $route.path !== '/modulos'"
          >mdi-chevron-right</v-icon
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span
              v-on="on"
              class="d-xs-none titulo-navegacao"
              @click="irParaHomeModulo"
              v-if="$route.path !== homeModulo && $route.path !== '/modulos'"
              >{{ tooltipModulo }}</span
            >
          </template>
          <span>Ir para página {{ tooltipModulo }}</span>
        </v-tooltip>

        <v-icon class="d-xs-none">mdi-chevron-right</v-icon>
        <span>{{ titulo }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <div class="usuario-card" v-on="on" @click.stop="exibirDrawer()"  v-if="usuario">
            <span class="d-none d-sm-inline">{{ usuario.nome }}</span>
            <v-icon size="40px">mdi-account</v-icon>
          </div>
        </template>
        <span>Exibir opções da conta</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      v-show="showDrawer"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon size="40px">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-if="usuario">
          <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense v-if="usuario">
        <v-list-item link @click="irParaLink('/modulos')">
          <v-list-item-icon>
            <v-icon>mdi-format-list-checkbox</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Modulos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link @click="irParaLink(modulo.url)" v-for="modulo in usuario.perfil.modulos.filter(x => { return x.moduloPaginas.length == 0 })" :key="modulo.id">
          <v-list-item-icon>
            <v-icon>{{modulo.icone}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{modulo.titulo}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-for="modulo in usuario.perfil.modulos.filter(x => { return x.moduloPaginas.length > 0 })"
          :key="modulo.id"
          v-model="modulo.ativo"
          :prepend-icon="modulo.icone"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="modulo.titulo"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="pagina in modulo.moduloPaginas"
            :key="pagina.id"
            link
            @click="irParaLink(pagina.url)"
          >
            <v-list-item-icon>
              <v-icon>{{ pagina.icone }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="pagina.titulo"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item link @click="abrirModalSair">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="sair" max-width="600px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sair do sistema</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="fecharModalSair">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <p class="title text-center">Deseja realmente sair do sistema?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            right
            class="mr-2 mb-4"
            @click="fecharModalSair"
            >Não</v-btn
          >
          <v-btn color="primary" text class="mr-4 mb-4" @click="logout"
            >Sim</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: ["titulo", "homeModulo", "tooltipModulo"],
  data() {
    return {
      drawer: null,
      showDrawer: null,
      paginaInicial: false,
      sair: false,
      usuario: {
        nome: '',
        perfil:{
          modulos:[]
        }
      },
    };
  },
  watch: {
    drawer() {
      document.getElementsByTagName("html")[0].style.width = "auto";
      if (!this.drawer) {
        setTimeout(() => {
          this.showDrawer = false;
          document.getElementsByTagName("html")[0].style.width = "100vw";
          document.getElementsByTagName("html")[0].className = "";
        }, 100);
      } else {
        setTimeout(() => {
          document.getElementsByTagName("html")[0].style.width = "100vw";
          document.getElementsByTagName("html")[0].className = "";
        }, 200);
      }
    },
  },
  methods: {
    exibirDrawer() {
      this.showDrawer = !this.showDrawer;
      setTimeout(() => {
        this.drawer = !this.drawer;
      }, 100);
    },
    voltar() {
      history.back();
    },
    abrirModalSair() {
      this.sair = true;
    },
    fecharModalSair() {
      this.sair = false;
      this.showDrawer = true;
    },
    logout() {
      localStorage.removeItem("login");
      this.$router.push("/").catch(failure => { localStorage.setItem("erro", failure) });
    },
    irParaHomeModulo() {
      if (this.$route.path !== this.homeModulo)
        this.$router.push(this.homeModulo).catch(failure => { localStorage.setItem("erro", failure) });
    },
    irParaLink(url) {
      if (this.$route.path !== url) this.$router.push(url).catch(failure => { localStorage.setItem("erro", failure) });
      else this.drawer = false;
    },
  },
  mounted: function () {
    const modulo = location.href.split("/modulos").length == 2;
    const rotaDireta = location.href.split("?id=").length == 2;
    this.paginaInicial = modulo || rotaDireta;
    let login = JSON.parse(localStorage.getItem("login"));
    this.usuario = login;
  },
};
</script>
<style scoped>
.btn-voltar {
  cursor: pointer;
  border-radius: 100%;
  padding: 5px;
}
.btn-voltar i {
  color: unset;
}
.imagem-modulo {
  cursor: pointer;
}
.titulo-header {
  font-size: 25px;
  cursor: default;
}
.titulo-navegacao {
  cursor: pointer;
}
.titulo-navegacao:hover {
  color: #12466e !important;
}
.usuario-card {
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 6px;
  cursor: pointer;
  transition: 0.5s ease;
}
.usuario-card i {
  color: unset;
}
.usuario-card:hover,
.btn-voltar:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  color: #12466e !important;
}
.lwart-divisor {
  background-image: linear-gradient(270deg, #8fc73e, #12466e);
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>