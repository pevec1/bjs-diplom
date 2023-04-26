"use strict";
let user = new UserForm();
let data = {};
//let data = {login: "vladimir@demo.ru", password: "demo"}
user.loginFormCallback = function(data){
    ApiConnector.login(data, (error, data) => 
    {
        if (error.success === false) throw error;
        try{
            console.log(data);
            setTimeout(() => location.reload(), 1000);
        } catch {
            console.log(error);
        }
    })
}

user.registerFormCallback = function(data){
    ApiConnector.register(data);
}
