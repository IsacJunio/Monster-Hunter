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

// Galeria de imagem com localStorage

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const storedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
    
    storedImages.forEach(src => {
        const imgElement = document.createElement("img");
        imgElement.src = src;
        gallery.appendChild(imgElement);
    });
});

document.getElementById("imageForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById("imageInput");
    const gallery = document.getElementById("gallery");
  
    const file = fileInput.files[0]; // Pega o arquivo da imagem
    if (file) {
        const reader = new FileReader();
  
        // Quando a imagem for carregada, adiciona à galeria e salva no localStorage
        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result; // A URL da imagem carregada
            gallery.appendChild(imgElement); // Adiciona a imagem à galeria
  
            // Salva no localStorage
            const storedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
            storedImages.push(event.target.result);
            localStorage.setItem("galleryImages", JSON.stringify(storedImages));
        };
  
        reader.readAsDataURL(file); // Converte a imagem para uma URL base64
    }
  
    // Limpa o input de arquivo após o upload
    fileInput.value = "";
});

// Feedback com localStorage

document.addEventListener("DOMContentLoaded", function () {
    const feedbackList = document.querySelector(".swiper-wrapper");
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    
    storedFeedbacks.forEach(feedback => {
        const novoFeedback = document.createElement("div");
        novoFeedback.classList.add("swiper-slide");
        novoFeedback.innerHTML = `
          <div class="Nome">${feedback.nome}</div>
          <blockquote class="text-feedbeck">${feedback.comentario}</blockquote>
        `;
        feedbackList.appendChild(novoFeedback);
    });
    swiper.update();
});

// Inicializa o Swiper
var swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true, 
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
});
  
// Captura o evento de envio do formulário
document.getElementById("form-feedbeck").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o recarregamento da página
  
    const nomeInput = document.getElementById("nome");
    const comentarioInput = document.getElementById("comentario");
    
    const nome = nomeInput.value.trim();
    const comentario = comentarioInput.value.trim();
  
    if (!nome || !comentario) return; // Garante que os campos não estão vazios
  
    // Criar um novo slide de feedback
    const novoFeedback = document.createElement("div");
    novoFeedback.classList.add("swiper-slide");
    novoFeedback.innerHTML = `
      <div class="Nome">${nome}</div>
      <blockquote class="text-feedbeck">${comentario}</blockquote>
    `;
  
    // Adicionar o novo slide no final
    const feedbackList = document.querySelector(".swiper-wrapper");
    feedbackList.appendChild(novoFeedback);
  
    // Salvar no localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    storedFeedbacks.push({ nome, comentario });
    localStorage.setItem("feedbacks", JSON.stringify(storedFeedbacks));
  
    // Atualizar Swiper para reconhecer o novo slide
    swiper.update();
    swiper.slideToLoop(0); // Mantém o loop funcional
  
    // Limpar manualmente os campos do formulário
    nomeInput.value = "";
    comentarioInput.value = "";
});