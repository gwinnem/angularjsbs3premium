/**
 * abUserProfileCtrl.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Displaying and editing the user profile
 */
(function () {
    "use strict";
    angular.module("abUserProfileModule", [[]])
        .controller("UserProfileController", ["$scope", "$notification", "abUserProfileSvc",
            function ($scope, $notification, abUserProfileSvc) {
                $scope.user = abUserProfileSvc.user;


                // Loading skills for tags autocomplete // Currently not working
                $scope.loadSkill = function (skill) {
                    return abUserProfileSvc.getDefaultSkills.indexOf(skill) > 0;
                }

                $scope.getFollowers = function () {
                    var followers = 0;
                    angular.forEach($scope.user.socialmedia, function (item) {
                        followers += item.followers;
                    });
                    return followers;
                }

                $scope.getFollowing = function () {
                    var following = 0;
                    angular.forEach($scope.user.socialmedia, function (item) {
                        following += item.following;
                    });
                    return following;
                }
                $scope.getPosts = function () {
                    var posts = 0;
                    angular.forEach($scope.user.socialmedia, function (item) {
                        posts += item.posts;
                    });
                    return posts;
                }

                $scope.updateProfile = function () {
                    abUserProfileSvc.updateUser($scope.user);
                    $scope.user = abUserProfileSvc.user;
                    $notification.success("User profile updated", "User Profile", 3000);
                }
                $notification.success("User profile loaded", "User Profile", 3000);
            }]);
})();
