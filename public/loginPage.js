"use strict";
let user = new UserForm();
let data = {};
//let data = {login: "vladimir@demo.ru", password: "demo"}
user.loginFormCallback = function(data){
    ApiConnector.login(data, (response, data) => 
    {
        if (response.success === false) {
            user.setLoginErrorMessage(response.error);
        } else{
            console.log(response);
            setTimeout(() => location.reload(), 1000);
        }
    })
}

user.registerFormCallback = function(data){
    ApiConnector.register(data, (response, data) => 
    {
        if (response.success === false) {
            user.setRegisterErrorMessage(response.error);
        } else {

            console.log(response);
            location.reload()
        }
    });
}
