/**
 * Mock service for Inboxes
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Generating fake data for the different mailbox folders.
 */

(function () {
    "use strict";
    angular.module("abMailSvc", [["js/plugins/faker.js/faker.min.js"]])
        .factory("abMailSvc", ["$q", "$rootScope", function ($q, $rootScope) {
            faker.locale = "en";
            // Generating fake emails for the folders.
            var generateFolders = function (items) {
                var folder = [];
                for (var index = 0; index < items; index++) {
                    folder.push(
                        {
                            id: faker.random.uuid(),
                            from: faker.name.findName(),
                            to: faker.name.findName(),
                            email: faker.internet.email(),
                            received: faker.date.recent(),
                            created: faker.date.recent(),
                            sent: faker.date.recent(),
                            subject: faker.lorem.sentence(),
                            message: faker.lorem.paragraphs(10),
                            isRead: faker.random.boolean(),
                            isChecked: false,
                            isStarred: faker.random.boolean(),
                            isFlagged: faker.random.boolean(),
                            hasAttachment: faker.random.boolean()
                        }
                    );
                }
                return folder;
            };
            // Container for the fake data
            var folders = {
                inbox: generateFolders(15),
                sent: generateFolders(10),
                drafts: generateFolders(3),
                spam: generateFolders(4),
                trash: generateFolders(7),
                archive: generateFolders(8)
            };
            // Setting all items in the sent folder to read.
            angular.forEach(folders.sent, function (item) {
                item.isRead = true;
            });
            // Removing data from drafts mails
            angular.forEach(folders.drafts, function (item) {
                item.isChecked = false;
                item.isFlagged = false;
                item.isRead = false;
                item.isStarred = false;
                item.email = "";
                item.to = "";
                item.received = null;
                item.sent = null;
                item.from = "";
                item.isDraft = true;
            });

            // Different event names used for broadcasts
            var events = {
                updateFoldersCount: "updateFoldersCount"
            };

            // Helper enum for returning a http status code after a async call.
            var httpStatus = {
                OK: 200,
                NoContent: 204,
                BadRequest: 400,
                Forbidden: 403,
                InternalServerError: 500
            };

            // Inbox functions ----------------------------------------
            var deleteFromInbox = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Delete from inbox folder
                    var index = folders.inbox.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.inbox.splice(index, 1);
                        // Push to trash folder
                        item.isChecked = false;
                        folders.trash.push(item);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.inbox, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var updateFlagMailInbox = function (mail) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var index = folders.inbox.findIndex((obj => obj.id === mail.id));
                if (index >= 0) {
                    folders.inbox[index].isFlagged = mail.isFlagged;
                    deferred.resolve(httpStatus.NoContent);
                    return deferred.promise;
                } else {
                    deferred.reject();
                    return deferred.promise;
                }
            }
            var getInbox = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var tmp = [];
                angular.copy(folders.inbox, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            }
            var markInboxEmailsAsRead = function (ids) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    angular.forEach(ids, function (id) {
                        var index = folders.inbox.findIndex((obj => obj.id === id));
                        folders.inbox[index].isRead = true;
                        folders.inbox[index].isChecked = false;
                    });
                    deferred.resolve(httpStatus.NoContent);
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            }
            var archiveInbox = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    angular.forEach(mails, function (mail) {
                        var index = folders.inbox.findIndex((obj => obj.id === mail.id));
                        if (index < 0) {
                            mail.isChecked = false;
                            deferred.reject("Not able to find email from: " + mail.from);
                            return deferred.promise;
                        }
                        // Remove from inbox
                        folders.inbox.splice(index, 1);
                        //Update archive
                        folders.archive.push(mail);
                    });
                    var tmp = [];
                    angular.copy(folders.inbox, tmp);
                    deferred.resolve(tmp);
                } catch (e) {
                    deferred.reject(e);
                }

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });
                return deferred.promise;
            }
            var updateInboxStarred = function (mail) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var index = folders.inbox.findIndex((obj => obj.id === mail.id));
                    if (index < 0) {
                        deferred.reject("Not able to update mail !");
                    } else {
                        folders.inbox[index].isStarred = mail.isStarred;
                        deferred.resolve(httpStatus.NoContent);
                    }

                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            }
            var markInboxMailAsRead = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var index = folders.inbox.findIndex(obj => obj.id === id);
                    if (index < 0) {
                        deferred.reject("Not able to update mail !");
                    } else {
                        folders.inbox[index].isRead = true;
                        deferred.resolve(httpStatus.NoContent);
                    }
                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            }


            // Sent functions -----------------------------------------
            var getSent = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var tmp = [];
                angular.copy(folders.sent, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            }
            var archiveSent = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    angular.forEach(mails, function (mail) {
                        var index = folders.sent.findIndex((obj => obj.id === mail.id));
                        if (index < 0) {
                            mail.isChecked = false;
                            deferred.reject("Not able to find email from: " + mail.from);
                            return deferred.promise;
                        }
                        // Remove from sent
                        folders.sent.splice(index, 1);
                        //Update archive
                        folders.archive.push(mail);
                    });
                    var tmp = [];
                    angular.copy(folders.sent, tmp);
                    deferred.resolve(tmp);
                } catch (e) {
                    deferred.reject(e);
                }

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });
                return deferred.promise;
            }
            var deleteSent = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Delete from sent folder
                    var index = folders.sent.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.sent.splice(index, 1);
                        // Push to trash folder
                        item.isChecked = false;
                        folders.trash.push(item);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.sent, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };


            // Drafts functions ---------------------------------------
            var getDrafts = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var tmp = [];
                angular.copy(folders.drafts, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var deleteDraftsChecked = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Delete from sent folder
                    var index = folders.drafts.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.drafts.splice(index, 1);
                        // Push to trash folder
                        item.isChecked = false;
                        folders.trash.push(item);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.drafts, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var getDraftById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = folders.drafts.find(obj => obj.id === id);
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Email not found");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            }
            var saveAsDraft = function (mail) {
                mail.isDraft = true;
                var deferred = $q.defer();
                try {
                    folders.drafts.push(mail);
                    deferred.resolve();
                } catch (e) {
                    deferred.reject(e);
                }
                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });
                return deferred.promise;
            }

            // Spam functions -----------------------------------------
            var getSpam = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var tmp = [];
                angular.copy(folders.spam, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var deleteFromSpam = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Delete from spam folder
                    var index = folders.spam.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.spam.splice(index, 1);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.spam, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var markspamMailAsRead = function (mail) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var index = folders.spam.findIndex(obj => obj.id === mail.id);
                    if (index < 0) {
                        deferred.reject("Not able to update mail !");
                    } else {
                        folders.spam[index].isRead = true;
                    }
                    deferred.resolve(httpStatus.NoContent);
                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            };
            var moveSpamToInbox = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Moving mail to inbox
                    folders.inbox.push(item);
                    // Delete from spam folder
                    var index = folders.spam.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.spam.splice(index, 1);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.spam, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };


            // Trash functions ----------------------------------------
            var getTrash = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var tmp = [];
                angular.copy(folders.trash, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var deleteFromTrash = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Delete from sent folder
                    var index = folders.trash.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.trash.splice(index, 1);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.trash, tmp);
                deferred.resolve(tmp);
                return deferred.promise;

            };
            var markTrashMailAsRead = function (mail) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var index = folders.trash.findIndex(obj => obj.id === mail.id);
                    if (index < 0) {
                        deferred.reject("Not able to update mail !");
                    } else {
                        folders.trash[index].isRead = true;
                    }
                    deferred.resolve(httpStatus.NoContent);
                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            };


            // Archive functions --------------------------------------
            var getArchive = function () {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var tmp = [];
                angular.copy(folders.archive, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var deleteFromArchive = function (mails) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                angular.forEach(mails, function (item) {
                    // Delete from sent folder
                    var index = folders.archive.findIndex((obj => obj.id === item.id));
                    if (index >= 0) {
                        folders.archive.splice(index, 1);
                        // Push to trash folder
                        item.isChecked = false;
                        folders.trash.push(item);
                    }
                });

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });

                var tmp = [];
                angular.copy(folders.archive, tmp);
                deferred.resolve(tmp);
                return deferred.promise;
            };
            var markArchiveMailAsRead = function (items) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    angular.forEach(items, function (item) {
                        var index = folders.archive.findIndex(obj => obj.id === item.id);
                        if (index < 0) {
                            deferred.reject("Not able to update mail !");
                        } else {
                            folders.archive[index].isRead = true;
                        }
                    });
                    deferred.resolve(httpStatus.NoContent);
                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            };
            var updateFlagMailArchive = function (mail) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                var index = folders.archive.findIndex((obj => obj.id === mail.id));
                if (index >= 0) {
                    folders.archive[index].isFlagged = mail.isFlagged;
                    deferred.resolve(httpStatus.NoContent);
                    return deferred.promise;
                } else {
                    deferred.reject();
                    return deferred.promise;
                }
            };
            var updateArchiveStarred = function (mail) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var index = folders.archive.findIndex((obj => obj.id === mail.id));
                    if (index < 0) {
                        deferred.reject("Not able to update mail !");
                    } else {
                        folders.archive[index].isStarred = mail.isStarred;
                        deferred.resolve(httpStatus.NoContent);
                    }

                } catch (e) {
                    deferred.reject(e);
                }

                return deferred.promise;
            };


            // Read Email functions -----------------------------------
            var getEmailFromInboxById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = folders.inbox.find(obj => obj.id === id);
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Email not found");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };
            var getEmailFromSentById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = folders.sent.find(obj => obj.id === id);
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Email not found");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };
            var getEmailFromTrashById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = folders.trash.find(obj => obj.id === id);
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Email not found");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };
            var getEmailFromArchiveById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = folders.archive.find(obj => obj.id === id);
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Email not found");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };
            var getEmailFromSpamById = function (id) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    var result = folders.spam.find(obj => obj.id === id);
                    if (result !== undefined) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject("Email not found");
                    }

                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

            // Send Email functions -----------------------------------
            var sendEmail = function (email) {
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                folders.sent.push(email);

                // Telling folders directive to update the counters and returning the data in the event.
                $rootScope.$broadcast(events.updateFoldersCount, {
                    inbox: folders.inbox.length,
                    sent: folders.sent.length,
                    drafts: folders.drafts.length,
                    spam: folders.spam.length,
                    trash: folders.trash.length,
                    archive: folders.archive.length
                });
                deferred.resolve();
                return deferred.promise;
            }

            // Helper functions ---------------------------------------
            var getGuid = function () {
                var d = new Date().getTime();
                if (Date.now) {
                    d = Date.now(); //high-precision timer
                }
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            }



            return {
                events: events,
                httpStatus: httpStatus,
                getInbox: getInbox,
                deleteFromInbox: deleteFromInbox,
                updateFlagMailInbox: updateFlagMailInbox,
                markInboxEmailsAsRead: markInboxEmailsAsRead,
                archiveInbox: archiveInbox,
                updateInboxStarred: updateInboxStarred,
                markInboxMailAsRead: markInboxMailAsRead,

                getSent: getSent,
                archiveSent: archiveSent,
                deleteSent: deleteSent,

                deleteDraftsChecked: deleteDraftsChecked,
                getDrafts: getDrafts,
                getDraftById: getDraftById,
                saveAsDraft: saveAsDraft,

                getSpam: getSpam,
                deleteFromSpam: deleteFromSpam,
                markspamMailAsRead: markspamMailAsRead,
                moveSpamToInbox: moveSpamToInbox,

                getTrash: getTrash,
                deleteFromTrash: deleteFromTrash,
                markTrashMailAsRead: markTrashMailAsRead,

                getArchive: getArchive,
                deleteFromArchive: deleteFromArchive,
                markArchiveMailAsRead: markArchiveMailAsRead,
                updateFlagMailArchive: updateFlagMailArchive,
                updateArchiveStarred: updateArchiveStarred,

                getEmailFromInboxById: getEmailFromInboxById,
                getEmailFromSentById: getEmailFromSentById,
                getEmailFromTrashById: getEmailFromTrashById,
                getEmailFromArchiveById: getEmailFromArchiveById,
                getEmailFromSpamById: getEmailFromSpamById,

                sendEmail: sendEmail,

                // guid generator
                getGuid: getGuid,

                //Used by folders directive
                getCounters: function () {
                    return {
                        inbox: folders.inbox.length,
                        sent: folders.sent.length,
                        drafts: folders.drafts.length,
                        spam: folders.spam.length,
                        trash: folders.trash.length,
                        archive: folders.archive.length
                    }
                }
            };
        }]);
})();