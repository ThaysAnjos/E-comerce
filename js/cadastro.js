document.addEventListener("DOMContentLoaded", function () {

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    const cadastroButton = document.getElementById('cadastro-button');
    const errorMessage = document.getElementById('error-message');

    cadastroButton.addEventListener('click', function (e) {
        e.preventDefault();  // Evita o comportamento padrão de submissão do formulário

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarSenhaInput.value.trim();

        // Verifica se todos os campos estão preenchidos
        if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
            errorMessage.textContent = "Por favor, preencha todos os campos!";
            errorMessage.style.display = "block";
            return;
        }

        // Valida o formato do email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = "Por favor, insira um e-mail válido!";
            errorMessage.style.display = "block";
            return;
        }

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            errorMessage.textContent = "As senhas não coincidem!";
            errorMessage.style.display = "block";
            return;
        }

        // Se tudo estiver certo, pode enviar ou redirecionar
        errorMessage.style.display = "none";
        alert("Cadastro realizado com sucesso!"); // Aqui você pode implementar a lógica de envio
        window.location.href = "./login.html";  // Redireciona para a página de login
    });
});