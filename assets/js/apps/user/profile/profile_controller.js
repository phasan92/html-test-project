define(["app"], function (Ration) {
    Ration.module("UserApp.Profile", function (Profile, Ration, Backbone, Marionette, $, _) {
        Profile.Controller = {
            getProfile: function() {
                require(["entities/userProfile"], function() {

                    var fetchingProfile = Ration.request("userProfile:entity");

                    var promises = [fetchingProfile];

                    $.when.apply($, promises).then(function(data) {
                        $('.js-profile_fullName').html(data.get('DisplayName'));
                        $('.js-profile_photo').attr('src', 'http://www.gravatar.com/avatar/' + data.get('EmailHash') + '?d=identicon');
                        Ration.DisplayName = data.get('DisplayName');
                        Ration.Email = data.get('Email');
                        Ration.UserAccountID = data.get('UserAccountID');
                        Ration.displayNavigation();

                        UserVoice.push(['identify', {
                            email:      Ration.Email,
                            name:       Ration.DisplayName,
                            id:         Ration.UserAccountID
                        }]);
                    });
                });
            }
        };
    });

    return Ration.UserApp.Profile.Controller;
});
