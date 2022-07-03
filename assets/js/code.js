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

  returnMessage(type) {
    switch (type) {
      case 'email':
        return 'Password cannot be empty';
      case 'password':
        return 'Password cannot be empty';
      case 'firstName':
        return 'First Name cannot be empty';
      case 'lastName':
        return 'Last Name cannot be empty';
      default:
        return '';
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
            if(input.value === '') {
              return this.returnMessage(input.id);
            }
          break;
          
          case 'min':
            if(input.value.length < rDetails[1]) {
              return 'Field must have at least '+rDetails[1]+' characters';
            }
          break;

          case 'email':
            if(input.value !== '') {
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(!regex.test(input.value.toLowerCase())) {
                input.placeholder = 'email@example.com.br';
                input.value = '';
                return 'Loocks like this is not an email';
              }
            }    
          break;

        }
      }
    }
    return true;
  },

  showError(input, error) {
    let errorElement = document.querySelectorAll('input.input');
    let errorMessage = document.createElement('span');

    errorElement.forEach((item) => {
        if(item.getAttribute('data-input') === input.getAttribute('data-input')) {
          item.classList.add('error');
          item.style.borderColor = 'var(--red)';
        }
    });

    errorMessage.innerText = error;
    errorMessage.setAttribute('class', 'erro');
    input.insertAdjacentElement('afterend', errorMessage);

  },

  clearErrors() {
    let inputs = document.querySelectorAll('input');
    let errorMessage = document.querySelectorAll('span.erro');

    console.log(errorMessage);
    for (let i = 0; i < inputs.length; i++) {
      if(errorMessage[i] !== undefined) {
        errorMessage[i].remove();
      }
      inputs[i].style = '';
      inputs[i].classList.remove('error');
    }
  }

}

let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);
