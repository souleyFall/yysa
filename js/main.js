resetInputs();
let header = document.querySelector("header");
let formulaire= `
<div id="overlay">
    <div id="form">
        <button type="button" id="icon-close" onclick="close_form()">
            <div id="icon-close-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </div>
        </button>
        <form class="form">
            <span class="title">s'inscire à notre newsletter</span>
            <div class="form-container">
                <input id="prenom" type="text" class="input" placeholder="Prénom">
                <input id="nom" type="text" class="input" placeholder="Nom">
                <input id="mail-in-popup" type="email" class="input" placeholder="Email">
            </div>
            <button type="button" onclick="sendEmail()">Envoyer</button>
        </form>
    </div>
</div>
`
let data_successfully_saved=`
<CENTER>
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
    </svg>
<CENTER>
<h2>Votre demande a bien été transmis</h2>
<h3>Merci à vous</h3>`;
let header_mobile=`
<div class="header-mobile">
    <img src="rsc/logo_yysa.jpg" width="80dvw" height="70dvh" alt="logo"></img>
    <h1>YYSA</h1>
    <div id="btn-menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="10dvw" height="10dvw" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
    </div>
    <div class="dropdown-menu" id="dropdownMenu">
        <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#missions">Missions</a></li>
            <li><a href="#nouveautes">Nouveautés</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Faire un don</a></li>
            <li><a href="pages/form.html">Nous rejoindre</a></li>
            <li><a href="#">À propos de nous</a></li>
        </ul>
    </div>
</div>`;
let header_laptop=`
<div class="contact">
    <div class="mail-tel">
        <div class="mail-contact">
            <a href="mailto:yeewuyittelsunuaskan@gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
                yeewuyittelsunuaskan@gmail.com
            </a>
        </div>
        <div class="tel">
            <a href="tel:00221777773530">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                +221 77 777 35 30
            </a>
        </div>
    </div>
    <div class="header-social-media-logo">
        <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
        </a>
        <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
        </a>
        <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
        </a>
    </div>
</div>
<!------------- Fin contact ------------>

<!---->

<!------------- Début section logo-nav ------------>
<div class="barre-nav">
    <img src="rsc/final-logo.png" width="90" height="100" alt="logo">
    <nav>
        <a href="#">ACCUEIL</a>
        <a href="#missions">MISSIONS</a>
        <a href="#nouveautes">NOUVEAUTE</a>
        <a href="#contact">CONTACT</a>
    </nav>
</div>
<!------------- Fin section logo-nav ------------>`;

function close_form(){
    document.getElementById('formulaire').innerHTML=``;
}

/* fait apparaitre le pop-in */
function open_form(){
    document.getElementById('formulaire').innerHTML=formulaire;
}

function setHeader(){
    if(window.innerWidth<768){
        header.innerHTML = header_mobile;
        activeDropDownListener();
    }
    else{
        header.innerHTML = header_laptop;
    }
}
setHeader();

window.addEventListener("resize", setHeader);

function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
}
window.addEventListener('load', aosInit);
window.addEventListener('load', new PureCounter());
new PureCounter();

const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000, // défilement toutes les 3 secondes
      disableOnInteraction: false, // continue même après une interaction
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

function sendEmail() {
    fetch("http://45.147.251.120:5000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        PRENOM : document.getElementById("prenom").value, 
        NOM : document.getElementById("nom").value, 
        EMAIL : document.getElementById("mail-in-popup").value, 
        TEL : document.getElementById("tel").value }),
    })
    .then((res) => res.json())
    .then((data) => alert("données enregistrées"))
    .catch((err) => console.error("Erreur:", err)); 
    document.querySelector("form").innerHTML=data_successfully_saved;
}

function resetInputs(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      input.value = ""; 
    });
}

function activeDropDownListener(){
    const menuButton = document.getElementById('btn-menu');
    const dropdownMenu = document.getElementById('dropdownMenu');
    menuButton.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
    
    document.addEventListener('click', function(event) {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
} 
