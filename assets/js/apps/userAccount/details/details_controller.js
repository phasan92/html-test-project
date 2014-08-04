define(["app", "apps/userAccount/details/details_view"], function (Ration, View) {
    Ration.module("UserAccountApp.Details", function (Details, Ration, Backbone, Marionette, $, _) {
        Details.Controller = {
            showDetails: function(id) {
                require(["entities/userAccount"], function() {

                    var userAccount = Ration.request("userAccount:entity", id);

                    var view = new View.UserAccount({ model: userAccount });

                    Ration.mainRegion.show(view);
                });
            }
        };

    });

    return Ration.UserAccountApp.Details.Controller;
});
