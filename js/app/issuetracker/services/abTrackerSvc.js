/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary 
 */

(function () {
    "use strict";
    angular.module("abTracker", [
            []
        ])
        .factory("abTrackerSvc", ["$filter", function ($filter) {
            var statusEnum = {
                0: "Incative",
                1: "Active",
                2: "Completed",
                3: "Rejected"
            };

            var issueList = [{
                    id: 1,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 2,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 9,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 1,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 10,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 2,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 11,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 0,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 3,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 2,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 4,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 1,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 5,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 2,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 6,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 1,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 7,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 0,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 8,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 1,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                },
                {
                    id: 2,
                    created: {
                        at: "12.02.2018 10:00",
                        by: "Geirr Winnem"
                    },
                    status: 3,
                    assigned: [{
                            id: 1,
                            at: "12.02.2018 10:00",
                            by: "Geirr Winnem"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 10:00",
                            by: "Sindre Winnem"
                        }
                    ],
                    message: "This is the message",
                    actions: [{
                            id: 1,
                            at: "12.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "First Action"
                        },
                        {
                            id: 2,
                            at: "13.02.2018 13:00",
                            by: "Geirr Winnem",
                            comment: "Second action"
                        }
                    ],
                    tags: [{
                        text: "Tag1"
                    }, {
                        text: "Tag2"
                    }]
                }
            ];

            var issues = function () {
                return issueList;
            };
            var issueById = function (id) {
                return $filter('filter')(issueList, {
                    id: id
                })[0];
            };


            return {
                getStatus: statusEnum,
                getIssues: issues,
                getIssueById: issueById
            };
        }]);
})();