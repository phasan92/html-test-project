define(["app", "apps/auth/login/login_view", "apps/auth/login/register_view", "apps/auth/login/reset_view", "jquery-ui"], function (Ration, LoginView, RegisterView, ResetPasswordView) {
    Ration.module("AuthApp.Login", function (Login, Ration, Backbone, Marionette, $, _) {

        Login.Controller = {
            showLogin: function (route) {

                //var myTest = window.open("about:blank", "", "directories=no,height=100,width=100,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");
                //if (!myTest) {
                //    alert("Please enable pop-ups for this site and refresh the page.");
                //    return;
                //} else {
                //    myTest.close();
                //}
                
                var loginView = new LoginView.Form();

                loginView.on("show", function() {
                    this.$el.dialog({
                        modal: true,
                        width: "auto",
                        title: "Login",
                        closeOnEscape: false,
                        open: function () { $(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide(); }
                    });
                });

                loginView.on('form:submit', function (data) {
                    $.ajax({
                        url: Ration.url('login'),
                        method: 'POST',
                        data: data,
                        success: function (result) {
                            processLogin(result);
                        }
                    });
                });

                loginView.on('linkedIn:login', function (linkedInToken) {
                    var data = { "Provider": "LinkedIn", "Token": linkedInToken };

                    $.ajax({
                        url: Ration.url('oauth'),
                        method: 'POST',
                        data: data,
                        success: function (result) {
                            processLogin(result);
                        }
                    });
                });

                loginView.on('register', function () {
                    loginView.close();
                    
                    var registerView = new RegisterView.Form();

                    registerView.on("show", function () {
                        this.$el.dialog({
                            modal: true,
                            width: "auto",
                            title: "Register",
                            closeOnEscape: false,
                            open: function () { $(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide(); }
                        });
                    });

                    registerView.on('form:submit', function(data) {
                        $.ajax({
                            url: Ration.url('registration'),
                            method: 'POST',
                            data: data,
                            success: function (authModel) {
                                registerView.close();
                                processLogin(authModel);
                            }
                        });
                    });

                    Ration.dialogRegion.show(registerView);
                });
                
                loginView.on('resetPassword', function () {
                    loginView.close();

                    var resetPasswordView = new ResetPasswordView.Form();

                    resetPasswordView.on("show", function () {
                        this.$el.dialog({
                            modal: true,
                            width: "auto",
                            title: "Reset Password",
                            closeOnEscape: false,
                            open: function () { $(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide(); }
                        });
                    });

                    resetPasswordView.on('form:submit', function (data) {
                        $.ajax({
                            url: Ration.url('resetPassword'),
                            method: 'POST',
                            data: data,
                            success: function () {
                                resetPasswordView.close();
                                Ration.dialogRegion.show(loginView);
                            }
                        });
                    });

                    Ration.dialogRegion.show(resetPasswordView);
                });

                
                loginView.on('linkedIn', function () {
                    var data = {};

                    OAuth.popup('linkedin', function (error, result) {
                        if (error === null) {
                            data.Token = result.oauth_token;
                            data.TokenSecret = result.oauth_token_secret;
                            
                            $.ajax({
                                url: Ration.url('linkedin'),
                                method: 'POST',
                                data: data,
                                success: function (authModel) {
                                    processLogin(authModel);
                                }
                            });
                        } else {
                            $("#login-alert").html('Error with LinkedIn login');
                            $("#login-alert").show();
                        }
                    });
                });

                function processLogin(result) {
                    if (result !== null) {
                        Ration.AuthApp.LoginHash = result.AuthToken;
                        $.cookie('auth', Ration.AuthApp.LoginHash, { expires: 30 });
                        $("#login-alert").hide();
                        loginView.close();
                        window.location.replace('#');
                        Ration.trigger("user:getProfile");
                        if (route !== null && route !== '') {
                            Ration.navigate(route, { trigger: true });
                        } else {
                            Ration.trigger("dashboard:showDashboard");
                        }
                    } else {
                        $("#login-alert").html('Invalid username/password');
                        $("#login-alert").show();
                    }
                }

                Ration.mainRegion.reset();

                Ration.dialogRegion.show(loginView);

            }
        };
    });

    return Ration.AuthApp.Login.Controller;
});