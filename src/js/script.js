// Btn voltar home

window.onscroll = function() { verificarScroll() };

function verificarScroll() {
    let botao = document.getElementById("btnTopo");
    let home = document.getElementById("home");
    
    // Verifica se o usuário rolou para baixo além da seção "home"
    if (document.documentElement.scrollTop > home.offsetHeight) {
        botao.style.display = "block"; // Mostra o botão
    } else {
        botao.style.display = "none"; // Esconde o botão no topo
    }
}

function voltarParaHome() {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}
