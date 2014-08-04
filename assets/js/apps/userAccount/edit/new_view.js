define(["app", "apps/userAccount/common/form_view"],
    function (Ration) {
        Ration.module("UserAccountApp.New.View", function (View, Ration, Backbone, Marionette, $, _) {

            View.UserAccount = Ration.UserAccountApp.Common.Views.Form.extend({
                initialize: function () {
                    this.title = "New User Account";
                }
            });
        });

        return Ration.UserAccountApp.New.View;
    }
);
