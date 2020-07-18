var descricaoTexto = document.querySelector(".descricao_foto");
var raca = document.querySelector(".input_racas");
var color = document.querySelector(".input_cores");
var fonte = document.querySelector(".input_fontes");
var fotoCachorro = document.querySelector(".imagem_photo");
var namePet = document.querySelector(".input_nomecachorro--text");
window.onload = init();

function init() {
    getImagem(); 
    getRaca();
    saveInfoRaca();
    getInfosbreed();
    saveInfoFonte();
    getInfoFonte();
    saveInfoCores();
    getInfoCor();
    saveInfoNome();
    getInfoNome();
    getHora();

}
$(".input_nomecachorro--button").click(function() {

    if(raca.value != "none" && color.value != "none" && fonte.value != "none"){
        getFotoRaca();
        saveImagem();
        setCor();
        setFonte();
        setCacachorroNome();
        document.querySelector(".status").innerHTML = "Salvo com Sucesso!!!"
    }else{
        document.querySelector(".status").innerHTML = "Preencha Todos os Campos"
    }
});

function setCor(){
    let selectColor = document.querySelector(".input_cores").value;
    descricaoTexto.style.color = selectColor;
}
function setFonte(){
    let selectFonts = document.querySelector(".input_fontes").value;
    descricaoTexto.style.fontFamily = selectFonts;
}

function setCacachorroNome(){
    let nomeCachorro = document.getElementById("textCachorro");
    if(nomeCachorro.value == ""){
        document.querySelector(".descricao_foto").innerHTML ="Pet sem nome";
    }else{
        document.querySelector(".descricao_foto").innerHTML = nomeCachorro.value;
    }
    
}

//função para consumir raça e popular o select
function getRaca(){
    let urlStr = "https://dog.ceo/api/breeds/list/all";
    $.ajax({
        url : urlStr,
        type : "get",
        dataType : "json",
        success : function(data){
            for (let i = 0; i < Object.entries(data.message).length; i++){
                newOption = document.createElement("option"); 
                newOption.value =Object.entries(data.message)[i][0];
                newOption.text=Object.entries(data.message)[i][0];
                raca.add(newOption);
            }
        },
        error : function(erro){
            console.log(erro);
        }
    });
}
//função para consumir imagem
function getFotoRaca(){
    let urlStrPhotos = "https://dog.ceo/api/breed/"+raca.value+"/images";
    $.ajax({
        url : urlStrPhotos,
        type : "get",
        dataType : "json",
        success : function(dataPhoto){
            let numberImages = (Object.entries(dataPhoto.message).length);
            let numberImagesRandom = (Math.round(Math.random() * (numberImages- 0 + 1) + 0));
            fotoCachorro.src = Object.entries(dataPhoto.message)[numberImagesRandom][1];

        },
        error : function(erro){
            console.log(erro);
        }
    });
}
//salvando opções de raça no localstorage
function saveInfoRaca() {
    $('.input_racas').change(function() {
        localStorage.setItem('raca', this.value);
    })
}
function getInfosbreed() {
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url === "https://dog.ceo/api/breeds/list/all") {
            if (localStorage.getItem('raca')) {
                $('.input_racas').val(localStorage.getItem('raca'));
            }
        }
    });
}
//salvando opções de cor no localstorage
function saveInfoCores() {
    $('.input_cores').change(function() {
        localStorage.setItem('color', this.value); 
    })
}

function getInfoCor() {
    if (localStorage.getItem('color')) {
        $('.input_cores').val(localStorage.getItem('color'));
        document.querySelector(".descricao_foto").style.color = localStorage.getItem('color')

    }
}
//salvando opções de fonte no localstorage
function saveInfoFonte() {
    $('.input_fontes').change(function() {
        localStorage.setItem('fonte', this.value);
    })
}
function getInfoFonte() {
    if (localStorage.getItem('fonte')) {
        $('.input_fontes').val(localStorage.getItem('fonte'));
        document.querySelector(".descricao_foto").style.fontFamily = localStorage.getItem('fonte')
    }
}
//salvando opções de nome no localstorage
function saveInfoNome() {
    $('#textCachorro').on('keyup', function() {
        localStorage.setItem('name', this.value);
    })
}
function getInfoNome() {
    if (localStorage.getItem('name')) {
        $('.descricao_foto').text(localStorage.getItem('name'));
        $('#textCachorro').val(localStorage.getItem('name'));
    }
}
//salvando foto no localstorage
function saveImagem() {
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url.indexOf('/images') >= 0) {
            localStorage.setItem('image', $('.imagem_photo').attr('src'))
        }
    })
}
function getImagem() {
    if (localStorage.getItem('image')) {
        $('.imagem_photo').attr('src', localStorage.getItem('image'));
    }
}
function getHora(){ 
    let data = new Date();
    let dia = data.getDate(); 
    var mes = data.getMonth() +1;		 
    let hora = data.getHours();
    let minutos = data.getMinutes();
    localStorage.setItem("horario","Horário: "+hora +" : "+minutos+" Data: "+ dia+"/"+mes)
    
    if (localStorage.getItem('horario'))
        $(".inputHora").text(localStorage.getItem('horario'));
}