define(["app", "apps/userAccount/list/list_view"], function (Ration, View) {
    Ration.module("UserAccountApp.List", function (List, Ration, Backbone, Marionette, $, _) {
        List.Controller = {
            showUserAccounts: function (criterion) {
                require(["entities/userAccount"], function () {

                    var fetchinguserAccounts = Ration.request("userAccount:entities");

                    var userAccountLayout = new View.Layout();
                    var panelLayout = new View.Panel();

                    $.when(fetchinguserAccounts).done(function (userAccounts) {
                        var userAccountListView = new View.UserAccounts({ collection: userAccounts });

                        userAccountLayout.on("show", function () {
                            userAccountLayout.panelRegion.show(panelLayout);
                            userAccountLayout.detailsRegion.show(userAccountListView);
                        });

                        Ration.mainRegion.show(userAccountLayout);

                        if (!criterion) {
                            criterion = "*";
                        }

                        userAccountListView.filterView(criterion);

                        panelLayout.on("filter", function (filterCriterion) {
                            userAccountListView.filterView(filterCriterion);
                            if (filterCriterion === "*") {
                                Ration.navigate('userAccounts');
                            } else {
                                Ration.navigate('userAccounts/filter/criterion:' + filterCriterion);
                            }
                        });

                        Ration.on('userAccount:delete', function (userAccount) {
                            if (confirm('Are you sure you want to delete ' + userAccount.get('name'))) {
                                userAccount.destroy();
                            }
                        });

                        panelLayout.on('userAccount:new', function () {
                            require(["apps/userAccount/edit/new_view"], function (newView) {
                                var newUserAccount = new Ration.Entities.UserAccount();
                                var view = new newView.UserAccount({ model: newUserAccount, asModal: true });

                                view.on('form:submit', function(data) {
                                    newUserAccount.save(data, {
                                        success: function() {
                                            view.close();
                                        },
                                        wait: true
                                    });

                                });

                                Ration.dialogRegion.show(view);
                            });
                        });

                    });
                });
            },

            editUserAccount: function (userAccount) {
                require(["apps/userAccount/edit/edit_view"], function (editView) {
                    var view = new editView.UserAccount({ model: userAccount, asModal: true });

                    view.on('form:submit', function (data) {
                        userAccount.save(data, {
                            success: function () {
                                Ration.showMessage("Account changes saved", 3000);
                                if (userAccount.get('EntityID') === Ration.UserAccountID && data.Password !== null && data.Password !== '') {
                                    $.ajax({
                                        url: Ration.url('login'),
                                        method: 'POST',
                                        data: { username: userAccount.get('Email'), password: data.Password },
                                        success: function (result) {
                                            if (result !== null) {
                                                Ration.AuthApp.LoginHash = result.AuthToken;
                                                $.cookie('auth', Ration.AuthApp.LoginHash, { expires: 30 });
                                            }
                                        }
                                    });
                                }

                                view.close();
                            }
                        });

                    });

                    Ration.dialogRegion.show(view);
                });
            }
        };

    });

    return Ration.UserAccountApp.List.Controller;
});
