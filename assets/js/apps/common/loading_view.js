define(["app", "tpl!apps/common/templates/loading.html"],
    function (Ration, loading) {
        Ration.module("Common.Views", function (Views, Ration, Backbone, Marionette, $, _) {

            Views.Loading = Marionette.ItemView.extend({
                template: loading
            });
        });

        return Ration.Common.Views;
    }
);
