function enviarParaWhats() {


    let nome = document.querySelector('.enviar-nome').value
    let email = document.querySelector('.enviar-email').value
    let linkCurriculo = document.querySelector('.enviar-currilo').value
    let numero = document.querySelector('.enviar-numero').value
    let url = "https://wa.me/5511941896372?text=" // Seu numero
        + "Olá, visitei o site de vocês e gostaria de saber mais sobre oportunidades de trabalho. Seguem meus contatos para que possamos conversar:" + "%0a"
        + "Nome - " + " " + nome + "%0a"
        + "Email- " + " " + email + "%0a"
        + "link Curriculo" + linkCurriculo + "%0a"
        + "Numero - " + " " + numero + "%0a"
       

    window.open(url, '_blank').focus();


}