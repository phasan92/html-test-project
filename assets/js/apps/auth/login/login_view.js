define(["app","tpl!apps/auth/login/templates/login.html"],
    function (Ration, loginTpl) {
        Ration.module("AuthApp.Login.View", function (View, Ration, Backbone, Marionette, $, _) {

            View.Form = Marionette.ItemView.extend({
                template: loginTpl,
                templateHelpers: Ration,
                events: {
                    "click #loginButton": "login",
                    "click #login-linkedIn": "loginLinkedIn",
                    "click #register-linkedIn": "registerLinkedIn",
                    "click #register": "register",
                    "click #resetPassword" : "resetPassword"
                        
                },
                loginLinkedIn: function () {
                    this.trigger("linkedIn");
                },
               
                registerLinkedIn: function () {
                    this.trigger("linkedIn");
                },
                
                register: function () {
                    this.trigger("register");
                },
                
                resetPassword: function () {
                    this.trigger("resetPassword");
                },

                ui: {
                    inputEmail: "input#username",
                    inputPassword: "input#password",
                    loginButton: "button#loginButton"
                },

                login: function (e) {
                    e.preventDefault();
                    var data = { username: $(this.ui.inputEmail).val(), password: $(this.ui.inputPassword).val() };
                    this.trigger("form:submit", data);
                }
            });
        });

        return Ration.AuthApp.Login.View;
    }
);