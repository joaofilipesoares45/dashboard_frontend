function exeConfig(configName){
    
    switch (configName) {
        case 'Ocultar Valores':
            ocultarValores()
            break;
    
        case 'Modo noturno':
            modoNoturno()
            break;
    }
}

function ocultarValores() {
    document.querySelectorAll('*[hidden]').forEach(element => {
        element.removeAttribute('hidden')
    })
}

function modoNoturno(){
    const html = document.querySelector(':root')
    if (html.hasAttribute('dark')) {
        html.removeAttribute('dark')
        localStorage.darkMode = 'False'
    }else{
        html.setAttribute('dark','')
        localStorage.darkMode = 'True'
    }

}

export { exeConfig }