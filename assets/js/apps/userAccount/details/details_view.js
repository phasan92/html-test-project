define(["app", "tpl!apps/userAccount/details/templates/userAccount_details.html"],
    function (Ration, userAccountDetails) {
        Ration.module("UserAccountApp.Details.View", function (View, Ration, Backbone, Marionette, $, _) {

            View.UserAccount = Marionette.ItemView.extend({
                template: userAccountDetails,
                events: {
                    "click .js-edit": "editUserAccount",
                    "click .js-delete": "deleteUserAccount",
                },
                modelEvents: {
                    "change": "modelChanged"
                },

                editUserAccount: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    Ration.trigger('userAccount:edit', this.model);
                },

                deleteUserAccount: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    Ration.trigger('userAccount:delete', this.model);
                },

                modelChanged: function () {
                    this.render();
                }
            });
        });

        return Ration.UserAccountApp.Details.View;
    }
);
