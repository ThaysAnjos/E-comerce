document.addEventListener("DOMContentLoaded", function () {
    
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const enterButton = document.getElementById('enter-button');
    const errorMessage = document.getElementById('error-message');
    
    enterButton.addEventListener('click', function (e) {
        e.preventDefault(); 

        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        
        if (email === "" || senha === "") {
            errorMessage.textContent = "Preencha todos os campos corretamente!";
            errorMessage.style.display = "block";  
        } else {
           
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                errorMessage.textContent = "Por favor, insira um e-mail válido!";
                errorMessage.style.display = "block";  
            } else {
                errorMessage.style.display = "none";  

               
                window.location.href = "./index.html";  
            }
        }
    });

   
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            enterButton.click();  
        }
    });
});