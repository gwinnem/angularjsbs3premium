/**
 * abDataService.js
 * @author Geirr Winnem
 * @version 0.1.0
 * @link http://www.abadmin.com
 * @license MIT
 * @summary Wrapper for all http calls
 */
(function () {
    angular.module("abDataService", [])
        .factory("abDataSvc", ["$http", "$q", "config", function ($http, $q, config) {
            var httpStatus = {
                OK: 200,
                NoContent: 204,
                BadRequest: 400,
                Forbidden: 403,
                Internal: 500
            };

            var get = function (url, params) {
                url = config.baseUrl + url;
                var deferred = $q.defer();
                $http.get(url, params)
                    .then(function (data) {
                        var res = data;
                        if (res.data.result !== undefined) {
                            res = res.data.result;
                        }
                        deferred.resolve(res);
                    }).catch(function (data) {
                        if (data.status === httpStatus.BadRequest) {
                            deferred.reject(data.data.message);
                        } else {
                            deferred.reject(data.statusText);
                        }
                    });

                return deferred.promise;
            };

            var post = function (url, params) {
                url = config.baseUrl + url;
                var deferred = $q.defer();
                $http.post(url, params)
                    .then(function (data, status) {
                        if (status === httpStatus.OK || data.status === httpStatus.OK) {
                            var res = data;
                            if (res.data.result !== undefined) {
                                res = res.data.result;
                            }
                            deferred.resolve(res);
                        } else {
                            deferred.reject(data.message, status);
                        }
                    }).catch(function (data, status) {
                        deferred.reject({ message: data, status: status });
                    });
                return deferred.promise;
            };

            var del = function (url) {
                url = config.baseUrl + url;
                var deferred = $q.defer();
                $http.delete(url)
                    .then(function (data, status) {
                        if (status === httpStatus.OK || data.status === httpStatus.OK) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject(data.message);
                        }
                    }).catch(function (data) {
                        deferred.reject(data.message);
                    });
                return deferred.promise;
            };

            var put = function (url, model) {
                url = config.baseUrl + url;
                var deferred = $q.defer();
                $http.put(url, model)
                    .then(function (data, status) {
                        if (status === httpStatus.OK || data.status === httpStatus.OK) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject(data.message);
                        }
                    }).catch(function (data) {
                        deferred.reject(data.message);
                    });
                return deferred.promise;
            };

            var fileUpload = function (url, file) {
                var fd = new FormData();
                fd.append("file", file);
                url = config.baseUrl + url;
                var deferred = $q.defer();
                $http.post(url, fd, {
                    headers: { 'Content-Type': undefined }
                })
                    .then(function (data, status) {
                        if (status === httpStatus.OK || data.status === httpStatus.OK) {
                            deferred.resolve(data, status);
                        } else {
                            deferred.reject(data, status);
                        }
                    }).catch(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
            return {
                get: get,
                post: post,
                del: del,
                put: put,
                httpStatus: httpStatus,
                fileUpload: fileUpload
            };
        }
        ]);
})();