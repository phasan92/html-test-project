define(["app", "tpl!apps/userAccount/common/templates/userAccount_form.html", "syphon"],
    function (Ration, userAccountEdit) {
        Ration.module("UserAccountApp.Common.Views", function (Views, Ration, Backbone, Marionette, $, _) {

            Views.Form = Marionette.ItemView.extend({
                template: userAccountEdit,
                events: {
                    "click button.js-submit": "submitClicked"
                },

                submitClicked: function (e) {
                    e.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    this.trigger("form:submit", data);
                },
                onRender: function() {
                    if (!this.options.asModal) {
                        var $title = $("<h1>", { text: this.title });
                        this.$el.prepend($title);
                    }
                },

                onShow: function () {
                    if (this.options.asModal) {
                        this.$el.dialog({
                            modal: true,
                            width: "auto",
                            title: this.title
                        });
                    }
                    
                    if (this.mode === "edit") {
                        $('#userAccount-Email').attr("disabled", true);
                    }
                }
            });
        });

        return Ration.UserAccountApp.Common.Views;
    }
);
