define(["app", "isotope",
    "tpl!apps/userAccount/list/templates/userAccount_details.html",
    "tpl!apps/common/templates/filter_layout.html",
    "tpl!apps/userAccount/list/templates/userAccount_panel.html"],
    function (Ration, Isotope, userAccountDetails, filterLayout, userAccountPanel) {
        Ration.module("UserAccountApp.List.View", function (View, Ration, Backbone, Marionette, $, _) {
            var iso;
            var filter = "*";

            View.Layout = Marionette.Layout.extend({
                template: filterLayout,

                regions : {
                    panelRegion: "#panel-region",
                    detailsRegion: "#details-region"
                }
            });

            View.Panel = Marionette.ItemView.extend({
                template: userAccountPanel,
                events: {
                    "click button.js-new": "newUserAccount",
                    "click button.js-filter": "filter"
                },

                newUserAccount: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('userAccount:new');
                },

                filter: function (ev) {
                    var button = $(ev.currentTarget);
                    var criterion = button.data('filter');

                    this.trigger("filter", criterion);
                }
            });

            View.UserAccount = Marionette.ItemView.extend({
                template: userAccountDetails,
                events: {
                    "click": "getDetails",
                    "click .js-edit": "editUserAccount",
                    "click .js-delete": "deleteUserAccount",
                },
                modelEvents: {
                    "change": "modelChanged"
                },

                editUserAccount: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    Ration.trigger('userAccount:edit', this.model);
                },

                deleteUserAccount: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    Ration.trigger('userAccount:delete', this.model);
                },

                getDetails: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var id = this.model.get('EntityID');

                    Ration.trigger('userAccount:showDetails', id);
                },
                onRender: function() {
                    this.$el.addClass('js-item userAccountDetails defaultTile');
                },

                modelChanged: function() {
                    this.render();
                }
            });

            View.UserAccounts = Marionette.CollectionView.extend({
                itemView: View.UserAccount,

                createIsotope: function () {
                    iso = new Isotope(this.$el[0], {
                        itemSelector: '.js-item',
                        layoutMode: 'masonry',
                        masonry: {
                            gutter: 5
                }
                    });
                    if (filter !== "*") {
                        iso.arrange({ filter: filter });
                    }
                },
                onShow: function() {
                    this.createIsotope();
                },
                onRender: function() {
                    this.createIsotope();
                },

                filterView: function (criterion) {
                    $('#filters .btn').removeClass('active');
                    if (criterion === "*") {
                        filter = "*";
                    } else {
                        filter = ".js-" + criterion;
                    }

                    var button = $("button").filter(function () { return $(this).data('filter') === criterion; });

                    button.addClass('active');
                    if (iso) {
                        iso.arrange({ filter: filter });
                    }
                }
            });
        });

        return Ration.UserAccountApp.List.View;
    }
);
