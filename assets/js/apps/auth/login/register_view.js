define(["app", "tpl!apps/auth/login/templates/register.html"],
    function (Ration, registerTpl) {
        Ration.module("AuthApp.Register.View", function (View, Ration, Backbone, Marionette, $, _) {

            View.Form = Marionette.ItemView.extend({
                template: registerTpl,
                templateHelpers: Ration,
                events: {
                    "click #registerButton": "register"
                },
                

                ui: {
                    inputEmail: "input#email",
                    inputPassword: "input#password",
                    inputFirstName: "input#firstname",
                    inputLastName: "input#lastname"
                },

                register: function (e) {
                    e.preventDefault();
                    var data = {
                        Email: $(this.ui.inputEmail).val(), Password: $(this.ui.inputPassword).val(),
                        FirstName: $(this.ui.inputFirstName).val(), LastName: $(this.ui.inputLastName).val()
                    };
                    this.trigger("form:submit", data);
                }
            });
        });

        return Ration.AuthApp.Register.View;
    }
);