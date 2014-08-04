define(["app"], function (Ration) {

    Ration.module("Entities", function (Entities, Ration, Backbone, Marionette, $, _) {

        Entities.UserProfile = Backbone.Model.extend({
            urlRoot: Ration.url("Profile")
        });

        var profile;

        var api = {
            getProfile: function () {

                var defer = $.Deferred();

                profile = new Entities.UserProfile();

                profile.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });

                return defer.promise();
            }
        };

        Ration.reqres.setHandler("userProfile:entity", function () { return api.getProfile(); });
    });

    return Ration.Entities.UserProfile;
});

