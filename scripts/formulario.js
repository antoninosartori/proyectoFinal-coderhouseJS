//navegacion
linkSingUp.addEventListener('click', () => {
    formLogin.classList.add('inactive');
    formSingUp.classList.remove('inactive');
})
backArrow.addEventListener('click', () => {
    formLogin.classList.remove('inactive');
    formSingUp.classList.add('inactive');
})

//formulario Sing Up
let users = JSON.parse(localStorage.getItem('users'));
if(!users){
    users = [];
}

inputEmailSingUp.addEventListener('change', (e) => {
    return inputEmailSingUpValue = e.target.value
});
inputPasswordSingUp.addEventListener('change', (e) => {
    return inputPasswordSingUpValue = e.target.value
});
inputPasswordRepeatSingUp.addEventListener('change', (e) => {
    return inputPasswordRepeatSingUpValue = e.target.value
});

btnSingUp.addEventListener('click', (e) => {
    e.preventDefault();  

    if(inputPasswordSingUpValue !== inputPasswordRepeatSingUpValue){
        return Swal.fire({text: 'Sus contraseñas no coinciden', icon: 'error'})
    }

    if(users.some(u => u.email === inputEmailSingUpValue)){
        return Swal.fire({text: 'Este usuario ya esta registrado', icon: 'error'})
    }

    users.push(
        {
            email: inputEmailSingUpValue,
            password: inputPasswordSingUpValue,
        });

    localStorage.setItem( 'users' , JSON.stringify(users))
    
    Swal.fire({text: 'Se ha registrado correctamente', icon: 'success'})
    formLogin.classList.remove('inactive');
    formSingUp.classList.add('inactive');
})

//formulario Login
let inputEmailValue = '';
let inputPasswordValue = '';
inputEmail.addEventListener('change', (e) => {
    return inputEmailValue = e.target.value
});
inputPassword.addEventListener('change', (e) => {
    return inputPasswordValue = e.target.value
});

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if(!inputEmailValue || !inputPassword) {
        return Swal.fire({text: 'Por favor completa todos los campos', icon: 'warning'})

    } else{

        const usersInLocalStorage = JSON.parse(localStorage.getItem('users'));

        if(!usersInLocalStorage){
            return Swal.fire({text: 'Sus datos no son correctos o no tiene una cuenta registrada', icon: 'warning'})
        } else {
        let isUserInLocalStorage = usersInLocalStorage.find(user => user.email === inputEmailValue && user.password === inputPasswordValue)

        if(!isUserInLocalStorage){
            Swal.fire({text: 'Sus datos no son correctos', icon: 'warning'})
        } else{
            Swal.fire({text: 'Ha iniciado sesion correctamente', icon: 'success'})
            location = 'pages/home.html';
        }
        }
    }
})



