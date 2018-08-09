/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Factory for controller NgRepeatTableController.
 */

(function () {
    "use strict";
    angular.module("aNgRepeatFactoryModule", [[]])
        .factory("abNgRepeatTableSvc", ["$q", "$http", function ($q, $http) {
            var statusCodeEnum =
                {
                    OK: 200,
                    NoContent: 204,
                    BadRequest: 400,
                    Forbidden: 403
                };
            // Static basedata for ngRepeat
            var baseData = [
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "eberardo",
                    last: "cardoso"
                },
                email: "eberardo.cardoso@example.com",
                cell: "(87) 8391-0624",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/23.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "miss",
                    first: "amber",
                    last: "rivera"
                },
                email: "amber.rivera@example.com",
                cell: "0715-686-650",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/34.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "liam",
                    last: "green"
                },
                email: "liam.green@example.com",
                cell: "(438)-431-4722",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "ms",
                    first: "sophia",
                    last: "hunter"
                },
                email: "sophia.hunter@example.com",
                cell: "0701-371-836",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/16.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "miss",
                    first: "maria",
                    last: "clarke"
                },
                email: "maria.clarke@example.com",
                cell: "(004)-143-9977",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/14.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "juho",
                    last: "wallo"
                },
                email: "juho.wallo@example.com",
                cell: "042-085-13-59",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/98.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "mademoiselle",
                    first: "lily",
                    last: "blanchard"
                },
                email: "lily.blanchard@example.com",
                cell: "(872)-070-2897",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/55.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "anton",
                    last: "andersen"
                },
                email: "anton.andersen@example.com",
                cell: "15810954",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/94.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "lucien",
                    last: "lefevre"
                },
                email: "lucien.lefevre@example.com",
                cell: "06-08-88-63-60",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/13.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "viljami",
                    last: "laurila"
                },
                email: "viljami.laurila@example.com",
                cell: "043-368-27-47",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/24.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "miss",
                    first: "jenny",
                    last: "davies"
                },
                email: "jenny.davies@example.com",
                cell: "0763-010-825",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/36.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "ms",
                    first: "lorena",
                    last: "torres"
                },
                email: "lorena.torres@example.com",
                cell: "680-809-756",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/95.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "mrs",
                    first: "gabriella",
                    last: "knight"
                },
                email: "gabriella.knight@example.com",
                cell: "(425)-904-5768",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/64.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "mademoiselle",
                    first: "manon",
                    last: "leclerc"
                },
                email: "manon.leclerc@example.com",
                cell: "(841)-776-6296",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/4.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "armando",
                    last: "kim"
                },
                email: "armando.kim@example.com",
                cell: "(075)-752-2512",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/28.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "lorenzo",
                    last: "suarez"
                },
                email: "lorenzo.suarez@example.com",
                cell: "607-047-777",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/25.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "eeli",
                    last: "sakala"
                },
                email: "eeli.sakala@example.com",
                cell: "048-176-97-12",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/7.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "mille",
                    last: "thomsen"
                },
                email: "mille.thomsen@example.com",
                cell: "21518839",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg"
                }
            },
            {
                gender: "male",
                name: {
                    title: "mr",
                    first: "jonathan",
                    last: "thomsen"
                },
                email: "jonathan.thomsen@example.com",
                cell: "30036540",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/men/51.jpg"
                }
            },
            {
                gender: "female",
                name: {
                    title: "miss",
                    first: "meral",
                    last: "erberk"
                },
                email: "meral.erberk@example.com",
                cell: "(118)-282-6857",
                picture: {
                    thumbnail: "https://randomuser.me/api/portraits/thumb/women/18.jpg"
                }
            }];
            var get = function () {
                var deferred = $q.defer();
                $http.get("https://randomuser.me/api/?results=20&noinfo&exc=login,id,nat,registered,location,dob,phone")
                    .then(function (data) {
                        deferred.resolve(data);
                    },
                        function (data) {
                            if (data.status === statusCodeEnum.BadRequest) {
                                deferred.reject(data.data.message);
                            } else {
                                deferred.reject(data.statusText);
                            }
                        });

                return deferred.promise;
            };
            var getPage = function (page) {
                var deferred = $q.defer();
                $http.get("https://randomuser.me/api/?results=5&exc=login,id,nat,registered,location,dob,phone,&page=" + page)
                    .then(function (data) {
                        deferred.resolve(data);
                    },
                        function (data) {
                            if (data.status === statusCodeEnum.BadRequest) {
                                deferred.reject(data.data.message);
                            } else {
                                deferred.reject(data.statusText);
                            }
                        });

                return deferred.promise;
            }
            return {
                baseData: baseData,
                get: get,
                getPage: getPage
            };
        }]);
})();