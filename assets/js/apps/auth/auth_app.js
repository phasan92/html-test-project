define(["app", "oauth", "jquery-cookies"], function (Ration) {
    Ration.module("AuthApp", function (AuthApp, Ration, Backbone, Marionette, $, _) {

        AuthApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "login": "login",
                "register" : "register"
            }
        });

        var api = {
            login: function (route) {
                require(["apps/auth/login/login_controller"], function (loginController) {
                    Ration.resetWindow();
                    loginController.showLogin(route);
                });
            },
            register : function() {
                alert('Register!');
            }
        };

        AuthApp.GetLoginHash = function () {
            if (AuthApp.LoginHash === undefined) {
                AuthApp.LoginHash = $.cookie('auth');
            }
            return AuthApp.LoginHash;
        };

        Ration.on("auth:login", function (route) {
            Ration.resetWindow();
            api.login(route);
        });
        
        Ration.on("auth:register", function () {
            Ration.resetWindow();
            api.register();
        });

        Ration.on("auth:logout", function () {
            $.removeCookie('auth');
            Ration.resetWindow();
            Ration.navigate("login", { trigger: true });
        });

        Ration.addInitializer(function () {
            new AuthApp.Router({
                controller: api
            });
           

            $.ajaxSetup({
                statusCode: {
                    401: function() {
                        Ration.trigger("auth:login");
                    }
                }
            });
        });
    });

    return Ration.AuthApp;
});