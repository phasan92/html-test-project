define(["app", "tpl!apps/auth/login/templates/resetPassword.html"],
    function (Ration, resetTpl) {
        Ration.module("AuthApp.ResetPassword.View", function (View, Ration, Backbone, Marionette, $, _) {

            View.Form = Marionette.ItemView.extend({
                template: resetTpl,
                templateHelpers: Ration,
                events: {
                    "click #resetButton": "reset"
                },


                ui: {
                    inputEmail: "input#email"
                },

                reset: function (e) {
                    e.preventDefault();
                    var data = {Email: $(this.ui.inputEmail).val()};
                    this.trigger("form:submit", data);
                }
            });
        });

        return Ration.AuthApp.ResetPassword.View;
    }
);