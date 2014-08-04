define(["app"], function (Ration) {
    Ration.module("UserApp", function (UserApp, Ration, Backbone, Marionette, $, _) {

        var api = {
            getProfile: function () {
                require(["apps/user/profile/profile_controller"], function (ProfileController) {
                    ProfileController.getProfile();
                });
            }
        };

        Ration.on("user:getProfile", function () {
            api.getProfile();
        });
        
        Ration.on("user:editProfile", function () {
            require(["apps/userAccount/userAccount_app"], function () {
                var fetchingUserAccounts = Ration.request("userAccount:entities");

                $.when(fetchingUserAccounts).done(function () {
                    var userAccount = Ration.request("userAccount:entity", Ration.UserAccountID);
                    Ration.trigger("userAccount:edit", userAccount);
                });
            });
        });
    });

    return Ration.AuthApp;
});
