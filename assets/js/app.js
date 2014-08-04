define(["marionette", "custom", "oauth"], function (Marionette) {
    var Ration = new Marionette.Application();

    Ration.addRegions({
        navigationRegion: "#navigation-region",
        mainRegion: "#main-region",
        dialogRegion: "#dialog-region"
    });

    Ration.url = function (relativePath) {
        return "http://localhost/api/" + relativePath;
    };


    Ration.addNavigation = function(icon, title, eventPath, name) {
        var navElement = $('<li/>');

        var link = $('<a/>').attr('href', '#').click(function (e) {
            e.preventDefault();
            Ration.trigger(eventPath);
        });

        var iconElement = $('<i/>').addClass('fa').addClass(icon);
        var span = $('<span/>').html(title);

        link.append(iconElement).append(span);

        navElement.addClass("js-navigation");
        navElement.addClass("js-" + name);
        navElement.append(link);

        $(Ration.navigationRegion.el).append(navElement);
    };

    Ration.makeIconActive = function(name) {
        $(".js-navigation").removeClass("active");
        $(".js-" + name).addClass("active");
    };

    Ration.resetWindow = function() {
        $('.js-profile_fullName').html('');
        $('.js-profile_photo').attr('src', 'images/photos/loggeduser.png');
        $(".js-navigation").removeClass("active");
        $(Ration.navigationRegion.el).html('');
        window.location.replace('#');
    };

    Ration.showMessage = function(message, autoHide) {
        $().toasty({
            message: message,
            position: "br",
            autoHide: autoHide
        });
    };

    Ration.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    Ration.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    Ration.getDateString = function(input){
        if (input === "all" || input === undefined || input === null){
            return "";
        }else{
            return input.substring(0,2) + "/" + input.substring(2,4) + "/" + input.substring(4,9);
        }
    }

    Ration.getStringFromDate = function (input) {
        if (input === "all" || input === undefined || input === null) {
            return "";
        } else {
            return input.getFullYear() + '-' + ('0' + (input.getMonth() + 1)).slice(-2) + '-' + ('0' + input.getDate()).slice(-2);
        }
    }

    Ration.replaceBlankWithAll = function (value) {
        if (value === undefined || value === null || value === '') {
            return 'all';
        }

        return value;
    }

    function addSignOutHandler() {
        $('.js-signOut').click(function (e) {
            e.preventDefault();
            Ration.trigger("auth:logout");
        });
    };
    
    function addProfileEditHandler() {
        $('.js-editProfile').click(function (e) {
            e.preventDefault();
            Ration.trigger("user:editProfile");
        });
    };
    
    Ration.displayNavigation = function () {
        Ration.addNavigation('fa-users', 'UserAccounts', 'userAccount:showUserAccounts', 'userAccounts-main');
    };

    Ration.on("initialize:after", function () {
        $.ajaxPrefilter(function (options) {
            if (!options.beforeSend && options.url.indexOf("/login") < 0 && options.url.indexOf("/oauth") < 0 && options.url.indexOf("/registration") < 0 && options.url.indexOf("/linkedin") < 0) {
                options.beforeSend = function (xhr) {
                    var loginHash = Ration.AuthApp.GetLoginHash();
                    if (loginHash !== undefined && loginHash !== null) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + loginHash);
                    } else {
                        xhr.abort();
                    }
                };
            }
        });

        if (Backbone.history) {
            OAuth.initialize('vIVI11ryaqS-OJ0WzMz52cPkjPg');

            require(["apps/auth/auth_app",
                "apps/user/user_app",
                "entities/common",
                "apps/realtime/realtime_app",
                "apps/userAccount/userAccount_app",
                "apps/common/loading_view"], function () {
                Backbone.history.start();

                addSignOutHandler();

                addProfileEditHandler();

                var loginHash = Ration.AuthApp.GetLoginHash();
                if (loginHash === undefined || loginHash === null) {
                    Ration.trigger("auth:login", Ration.getCurrentRoute());
                } else {
                    Ration.trigger("user:getProfile");
                }
            });
        }
    });

    return Ration;
});
