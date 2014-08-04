define(["app","pusher","toasty"], function (Ration) {
    Ration.module("RealtimeApp", function (SalesApp, Ration, Backbone, Marionette, $, _) {

        Ration.addInitializer(function () {
            var pusher = new Pusher('3ea0911334b61a35ba30');
            var channel = pusher.subscribe('test_channel');
            channel.bind('my_event', function (data) {
                $().toasty({
                    message: data.message,
                    position: data.position,
                    autoHide: data.autoHide,
                    modal: data.modal
                });
            });

            var brandChannel = pusher.subscribe('brand');

            brandChannel.bind('edited', function (data) {
                var brandModel = JSON.parse(data);
                var brand = new Ration.Entities.Brand(brandModel);
                Ration.trigger('brand:edited', brand);
                if (brandModel.ChangedByID != Ration.UserAccountID) {
                    Ration.showMessage(brandModel.ChangedBy + ' edited ' + brandModel.Name, 3000);
                }
            });

            brandChannel.bind('deleted', function (data) {
                var deleteModel = JSON.parse(data);
                Ration.trigger('brand:deleted', deleteModel);
                if (deleteModel.ChangedByID != Ration.UserAccountID) {
                    Ration.showMessage(deleteModel.ChangedBy + ' deleted ' + deleteModel.Name, 4000);
                }
            });
        });
    });

    return Ration.RealtimeApp;
});
