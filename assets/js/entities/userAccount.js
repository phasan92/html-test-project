define(["app"], function(Ration) {
    
    Ration.module("Entities", function (Entities, Ration, Backbone, Marionette, $, _) {

        Entities.UserAccount = Backbone.Model.extend({
            urlRoot: Ration.url("UserAccount"),
            defaults: { "DisplayName": "", "FirstName": "", "LastName": "", "Email": "", "Phone": "", "Password": "" },
            idAttribute: "EntityID"
        });

        Entities.UserAccountCollection = Backbone.Collection.extend({
            url: Ration.url("UserAccount"),
            model: Entities.UserAccount,
            comparator: "name"
        });


        var userAccounts;

        var api = {
            getUserAccounts: function () {
                var defer = $.Deferred();

                if (userAccounts !== undefined && userAccounts.length > 0) {
                    defer.resolve(userAccounts);
                } else {
                    userAccounts = new Entities.UserAccountCollection();

                    userAccounts.fetch({
                        success: function(data) {
                            defer.resolve(data);
                        }
                    });
                }

                return defer.promise();
            }
        };

        Ration.reqres.setHandler("userAccount:entities", function () { return api.getUserAccounts(); });

        Ration.reqres.setHandler("userAccount:entity", function (id) {
            var userAccount = userAccounts.where({ EntityID: id });
            if (userAccount.length > 0) {
                return userAccount[0];
            } else {
                return undefined;
            }
        });

        Ration.on("userAccount:added", function (userAccount) {
            userAccounts.set(userAccount, { remove: false });
            userAccounts.trigger('reset');
        });

    });

    return Ration.Entities.UserAccount;
});

