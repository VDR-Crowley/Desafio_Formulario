let validator = {

  handleSubmit(event) {
    event.preventDefault();

    let send = true;
    let inputs = form.querySelectorAll('input');

    validator.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = validator.checkInput(input);

      if(check !== true){
        send = false;
        validator.showError(input, check);
      }
    }

    if(send) {
      form.submit();
    }

  }, 


  checkInput(input) {
    let rules = input.getAttribute('data-rules');
    if(rules !== null) {
      rules = rules.split('|');
      for(let i in rules) {
        let rDetails = rules[i].split('=');
        
        switch(rDetails[0]) {
          case 'required':
            if(input.value == '') {
              return 'Campo não pode ser vazio';
            }
          break;
          
          case 'min':
            if(input.value.length < rDetails[1]) {
              return 'Campo tem que ter pelo menos'+rDetails[1]+'caracteres';
            }
          break;

          case 'email':
            if(input.value != '') {
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(!regex.test(input.value.toLowerCase())) {
                return 'email invalido';
              }
            }    
          break;

        }
      }
    }
    return true;
  },

  showError(input, error) {
    let errorElement = document.querySelectorAll('input');
    for (let i=0; i < errorElement.length; i++) {
      let input = errorElement[i];
      if(input.value == '') {
        input.classList.add('error');
        input.style.borderColor = 'var(--red)';
      }
    }
  },

  clearErrors() {
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
      inputs[i].classList.remove('error');
    }
  }

}

let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);
