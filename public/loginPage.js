"use strict";
let user = new UserForm();

//let data = {login: "vladimir@demo.ru", password: "demo"}
user.loginFormCallback = function(data){
    ApiConnector.login(data, (response) => 
    {
        if (response.success === false) {
            user.setLoginErrorMessage(response.error);
        } else{
           // console.log(response);
            location.reload();
        }
    })
}

user.registerFormCallback = function(data){
    ApiConnector.register(data, (response) => 
    {
        if (response.success === false) {
            user.setRegisterErrorMessage(response.error);
        } else {

            //console.log(response);
            location.reload()
        }
    });
}
