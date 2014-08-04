define(["app", "apps/userAccount/common/form_view"],
    function (Ration) {
        Ration.module("UserAccountApp.Edit.View", function (View, Ration, Backbone, Marionette, $, _) {

            View.UserAccount = Ration.UserAccountApp.Common.Views.Form.extend({
                initialize: function() {
                    this.title = "Edit " + this.model.get('DisplayName');
                    this.mode = "edit";
                }
            });
        });

        return Ration.UserAccountApp.Edit.View;
    }
);
