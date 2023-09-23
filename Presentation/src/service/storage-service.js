import router from '../router/index';

class StorageService {
    async validarToken() {
        const login = localStorage.getItem("login");
        if(!login){
            localStorage.setItem("rotaNavegacao", router.currentRoute.fullPath);
            router.push("/").catch(failure => { localStorage.setItem("erro", failure) });
            return false;
        }
        
        this.flagPermissao = false;

        const usuario = JSON.parse(login)

        if(router.currentRoute.fullPath.includes("/melhoria") || router.currentRoute.fullPath.includes("/modulos")){
            return true;
        }

        usuario.perfil.modulos.forEach(m => {
            if(m.url == router.currentRoute.fullPath && m.moduloPaginas.length == 0){
                this.flagPermissao = true;
            }
            else{
                m.moduloPaginas.forEach(mp => {
                    if(mp.url == router.currentRoute.fullPath){
                        this.flagPermissao = true;
                    }
                })
            }
        });

        if(this.flagPermissao == false){
            localStorage.removeItem("rotaNavegacao");
            router.push("/nao-autorizado").catch(failure => { localStorage.setItem("erro", failure) });
            return false;
        }

        return true;
    }
}

export default StorageService;