/**
 * abUserProfileSvc.js
 * @author Geirr Winnem
 * @version 1.0.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Service handling the userprofile module
 */

(function () {
    "use strict";
    angular.module("abUserProfileFactoryModule", [[]])
        .factory("abUserProfileSvc", [function () {
            // In a production environment the data should be pulled from the backend services and stored in a rdbms.
            var user = {
                id: "199",
                username: "gwinnem",
                password: "1234",
                firstname: "Geirr",
                lastname: "Winnem",
                title: "Senior Developer",
                company: "Acme Corp.",
                location: "Vienna AT",
                bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.",
                education: "B.S. in Computer Science from the Technical University of Vienna AT",
                mobile: "+43 699 345 58 90",
                email: "donald@acme.com",
                skills: [
                    { id: 1, text: "Java" },
                    { id: 2, text: "PHP" },
                    { id: 3, text: "ASP Mvc" },
                    { id: 4, text: "MS Sql" },
                    { id: 5, text: "C#" }
                ],
                imageurl: "/assets/img/men/1.jpg",
                socialmedia: [
                    // Should be handled by separate service
                    { name: "LinkedIn", url: "", logourl: "", userid: "199", followers: 0, following: 0, posts: 87 },
                    { name: "Twitter", url: "", logourl: "", userid: "199", followers: 549, following: 127, posts: 800 },
                    { name: "Xing", url: "", logourl: "", userid: "199", followers: 0, following: 0, posts: 0 }
                ],
                // Should be handled by separate service
                blog: { userid: "199", url: "", posts: 192 },
                status: [{ status: "online", date: "10/01/2018" }]
            };

            var defaultSkills = [
                { id: 1, text: "Java" },
                { id: 2, text: "PHP" },
                { id: 3, text: "ASP Mvc" },
                { id: 4, text: "MS Sql" },
                { id: 5, text: "AngularJS" },
                { id: 6, text: "Angular2" },
                { id: 7, text: "CSS3" },
                { id: 8, text: "JSon" },
                { id: 9, text: "JavaScript" },
                { id: 10, text: "TypeScript" }
            ];
            return {
                user: user,
                getDefaultSkills: function () {
                    return defaultSkills;
                },
                updateUser: function (item) {
                    user = item;
                }
            };
        }]);
})();