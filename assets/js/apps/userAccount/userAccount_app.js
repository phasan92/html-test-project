define(["app", "entities/userAccount"], function (Ration) {
    Ration.module("UserAccountApp", function (UserAccountApp, Ration, Backbone, Marionette, $, _) {

        UserAccountApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "userAccounts(/filter/criterion::criterion)": "showUserAccounts",
                "userAccounts/:id": "showDetails"
            }
        });

        var api = {
            showUserAccounts: function (criterion) {
                require(["apps/userAccount/list/list_controller"], function (ListController) {
                    Ration.makeIconActive("userAccounts-main");
                    ListController.showUserAccounts(criterion);
                });
            },
            showDetails: function (id) {
                require(["apps/userAccount/details/details_controller"], function (DetailsController) {
                    Ration.makeIconActive("userAccounts-main");
                    DetailsController.showDetails(id);
                });
            },
            editUserAccount: function (userAccount) {
                require(["apps/userAccount/list/list_controller"], function (ListController) {
                    Ration.makeIconActive("userAccounts-main");
                    ListController.editUserAccount(userAccount);
                });
            }
        };

        Ration.on("userAccount:showUserAccounts", function (criterion) {
            Ration.navigate("userAccounts");
            api.showUserAccounts(criterion);
        });

        Ration.on("userAccount:showDetails", function (id) {
            Ration.navigate("userAccounts/" + id);
            api.showDetails(id);
        });
        
        Ration.on('userAccount:edit', function (userAccount) {
            api.editUserAccount(userAccount);
        });

        Ration.addInitializer(function () {
            new UserAccountApp.Router({
                controller: api
            });
        });
    });

    return Ration.UserAccountApp;
});
