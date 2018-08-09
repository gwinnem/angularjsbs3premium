/**
 * @author Geirr Winnem
 * @version 1.0.0
 * @summary Factory service for helper functions.
 */

(function () {
    "use strict";
    angular.module("abHelpers", [])
        .factory("abHelpersSvc", ["$q", function ($q) {

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            var getNewGuid = function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }
            var getCountries = function () {
                var countries = [{
                    "id": 1,
                    "niceName": "Afghanistan"
                }, {
                    "id": 2,
                    "niceName": "Albania"
                }, {
                    "id": 3,
                    "niceName": "Algeria"
                }, {
                    "id": 4,
                    "niceName": "American Samoa"
                }, {
                    "id": 5,
                    "niceName": "Andorra"
                }, {
                    "id": 6,
                    "niceName": "Angola"
                }, {
                    "id": 7,
                    "niceName": "Anguilla"
                }, {
                    "id": 8,
                    "niceName": "Antarctica"
                }, {
                    "id": 9,
                    "niceName": "Antigua and Barbuda"
                }, {
                    "id": 10,
                    "niceName": "Argentina"
                }, {
                    "id": 11,
                    "niceName": "Armenia"
                }, {
                    "id": 12,
                    "niceName": "Aruba"
                }, {
                    "id": 13,
                    "niceName": "Australia"
                }, {
                    "id": 14,
                    "niceName": "Austria"
                }, {
                    "id": 15,
                    "niceName": "Azerbaijan"
                }, {
                    "id": 16,
                    "niceName": "Bahamas"
                }, {
                    "id": 17,
                    "niceName": "Bahrain"
                }, {
                    "id": 18,
                    "niceName": "Bangladesh"
                }, {
                    "id": 19,
                    "niceName": "Barbados"
                }, {
                    "id": 20,
                    "niceName": "Belarus"
                }, {
                    "id": 21,
                    "niceName": "Belgium"
                }, {
                    "id": 22,
                    "niceName": "Belize"
                }, {
                    "id": 23,
                    "niceName": "Benin"
                }, {
                    "id": 24,
                    "niceName": "Bermuda"
                }, {
                    "id": 25,
                    "niceName": "Bhutan"
                }, {
                    "id": 26,
                    "niceName": "Bolivia"
                }, {
                    "id": 27,
                    "niceName": "Bosnia and Herzegovina"
                }, {
                    "id": 28,
                    "niceName": "Botswana"
                }, {
                    "id": 29,
                    "niceName": "Bouvet Island"
                }, {
                    "id": 30,
                    "niceName": "Brazil"
                }, {
                    "id": 31,
                    "niceName": "British Indian Ocean Territory"
                }, {
                    "id": 32,
                    "niceName": "Brunei Darussalam"
                }, {
                    "id": 33,
                    "niceName": "Bulgaria"
                }, {
                    "id": 34,
                    "niceName": "Burkina Faso"
                }, {
                    "id": 35,
                    "niceName": "Burundi"
                }, {
                    "id": 36,
                    "niceName": "Cambodia"
                }, {
                    "id": 37,
                    "niceName": "Cameroon"
                }, {
                    "id": 38,
                    "niceName": "Canada"
                }, {
                    "id": 39,
                    "niceName": "Cape Verde"
                }, {
                    "id": 40,
                    "niceName": "Cayman Islands"
                }, {
                    "id": 41,
                    "niceName": "Central African Republic"
                }, {
                    "id": 42,
                    "niceName": "Chad"
                }, {
                    "id": 43,
                    "niceName": "Chile"
                }, {
                    "id": 44,
                    "niceName": "China"
                }, {
                    "id": 45,
                    "niceName": "Christmas Island"
                }, {
                    "id": 46,
                    "niceName": "Cocos (Keeling) Islands"
                }, {
                    "id": 47,
                    "niceName": "Colombia"
                }, {
                    "id": 48,
                    "niceName": "Comoros"
                }, {
                    "id": 49,
                    "niceName": "Congo"
                }, {
                    "id": 50,
                    "niceName": "Congo, the Democratic Republic of the"
                }, {
                    "id": 51,
                    "niceName": "Cook Islands"
                }, {
                    "id": 52,
                    "niceName": "Costa Rica"
                }, {
                    "id": 53,
                    "niceName": "Cote D'Ivoire"
                }, {
                    "id": 54,
                    "niceName": "Croatia"
                }, {
                    "id": 55,
                    "niceName": "Cuba"
                }, {
                    "id": 56,
                    "niceName": "Cyprus"
                }, {
                    "id": 57,
                    "niceName": "Czech Republic"
                }, {
                    "id": 58,
                    "niceName": "Denmark"
                }, {
                    "id": 59,
                    "niceName": "Djibouti"
                }, {
                    "id": 60,
                    "niceName": "Dominica"
                }, {
                    "id": 61,
                    "niceName": "Dominican Republic"
                }, {
                    "id": 62,
                    "niceName": "Ecuador"
                }, {
                    "id": 63,
                    "niceName": "Egypt"
                }, {
                    "id": 64,
                    "niceName": "El Salvador"
                }, {
                    "id": 65,
                    "niceName": "Equatorial Guinea"
                }, {
                    "id": 66,
                    "niceName": "Eritrea"
                }, {
                    "id": 67,
                    "niceName": "Estonia"
                }, {
                    "id": 68,
                    "niceName": "Ethiopia"
                }, {
                    "id": 69,
                    "niceName": "Falkland Islands (Malvinas)"
                }, {
                    "id": 70,
                    "niceName": "Faroe Islands"
                }, {
                    "id": 71,
                    "niceName": "Fiji"
                }, {
                    "id": 72,
                    "niceName": "Finland"
                }, {
                    "id": 73,
                    "niceName": "France"
                }, {
                    "id": 74,
                    "niceName": "French Guiana"
                }, {
                    "id": 75,
                    "niceName": "French Polynesia"
                }, {
                    "id": 76,
                    "niceName": "French Southern Territories"
                }, {
                    "id": 77,
                    "niceName": "Gabon"
                }, {
                    "id": 78,
                    "niceName": "Gambia"
                }, {
                    "id": 79,
                    "niceName": "Georgia"
                }, {
                    "id": 80,
                    "niceName": "Germany"
                }, {
                    "id": 81,
                    "niceName": "Ghana"
                }, {
                    "id": 82,
                    "niceName": "Gibraltar"
                }, {
                    "id": 83,
                    "niceName": "Greece"
                }, {
                    "id": 84,
                    "niceName": "Greenland"
                }, {
                    "id": 85,
                    "niceName": "Grenada"
                }, {
                    "id": 86,
                    "niceName": "Guadeloupe"
                }, {
                    "id": 87,
                    "niceName": "Guam"
                }, {
                    "id": 88,
                    "niceName": "Guatemala"
                }, {
                    "id": 89,
                    "niceName": "Guinea"
                }, {
                    "id": 90,
                    "niceName": "Guinea-Bissau"
                }, {
                    "id": 91,
                    "niceName": "Guyana"
                }, {
                    "id": 92,
                    "niceName": "Haiti"
                }, {
                    "id": 93,
                    "niceName": "Heard Island and Mcdonald Islands"
                }, {
                    "id": 94,
                    "niceName": "Holy See (Vatican City State)"
                }, {
                    "id": 95,
                    "niceName": "Honduras"
                }, {
                    "id": 96,
                    "niceName": "Hong Kong"
                }, {
                    "id": 97,
                    "niceName": "Hungary"
                }, {
                    "id": 98,
                    "niceName": "Iceland"
                }, {
                    "id": 99,
                    "niceName": "India"
                }, {
                    "id": 100,
                    "niceName": "Indonesia"
                }, {
                    "id": 101,
                    "niceName": "Iran, Islamic Republic of"
                }, {
                    "id": 102,
                    "niceName": "Iraq"
                }, {
                    "id": 103,
                    "niceName": "Ireland"
                }, {
                    "id": 104,
                    "niceName": "Israel"
                }, {
                    "id": 105,
                    "niceName": "Italy"
                }, {
                    "id": 106,
                    "niceName": "Jamaica"
                }, {
                    "id": 107,
                    "niceName": "Japan"
                }, {
                    "id": 108,
                    "niceName": "Jordan"
                }, {
                    "id": 109,
                    "niceName": "Kazakhstan"
                }, {
                    "id": 110,
                    "niceName": "Kenya"
                }, {
                    "id": 111,
                    "niceName": "Kiribati"
                }, {
                    "id": 112,
                    "niceName": "Korea, Democratic People's Republic of"
                }, {
                    "id": 113,
                    "niceName": "Korea, Republic of"
                }, {
                    "id": 114,
                    "niceName": "Kuwait"
                }, {
                    "id": 115,
                    "niceName": "Kyrgyzstan"
                }, {
                    "id": 116,
                    "niceName": "Lao People's Democratic Republic"
                }, {
                    "id": 117,
                    "niceName": "Latvia"
                }, {
                    "id": 118,
                    "niceName": "Lebanon"
                }, {
                    "id": 119,
                    "niceName": "Lesotho"
                }, {
                    "id": 120,
                    "niceName": "Liberia"
                }, {
                    "id": 121,
                    "niceName": "Libyan Arab Jamahiriya"
                }, {
                    "id": 122,
                    "niceName": "Liechtenstein"
                }, {
                    "id": 123,
                    "niceName": "Lithuania"
                }, {
                    "id": 124,
                    "niceName": "Luxembourg"
                }, {
                    "id": 125,
                    "niceName": "Macao"
                }, {
                    "id": 126,
                    "niceName": "Macedonia, the Former Yugoslav Republic of"
                }, {
                    "id": 127,
                    "niceName": "Madagascar"
                }, {
                    "id": 128,
                    "niceName": "Malawi"
                }, {
                    "id": 129,
                    "niceName": "Malaysia"
                }, {
                    "id": 130,
                    "niceName": "Maldives"
                }, {
                    "id": 131,
                    "niceName": "Mali"
                }, {
                    "id": 132,
                    "niceName": "Malta"
                }, {
                    "id": 133,
                    "niceName": "Marshall Islands"
                }, {
                    "id": 134,
                    "niceName": "Martinique"
                }, {
                    "id": 135,
                    "niceName": "Mauritania"
                }, {
                    "id": 136,
                    "niceName": "Mauritius"
                }, {
                    "id": 137,
                    "niceName": "Mayotte"
                }, {
                    "id": 138,
                    "niceName": "Mexico"
                }, {
                    "id": 139,
                    "niceName": "Micronesia, Federated States of"
                }, {
                    "id": 140,
                    "niceName": "Moldova, Republic of"
                }, {
                    "id": 141,
                    "niceName": "Monaco"
                }, {
                    "id": 142,
                    "niceName": "Mongolia"
                }, {
                    "id": 143,
                    "niceName": "Montserrat"
                }, {
                    "id": 144,
                    "niceName": "Morocco"
                }, {
                    "id": 145,
                    "niceName": "Mozambique"
                }, {
                    "id": 146,
                    "niceName": "Myanmar"
                }, {
                    "id": 147,
                    "niceName": "Namibia"
                }, {
                    "id": 148,
                    "niceName": "Nauru"
                }, {
                    "id": 149,
                    "niceName": "Nepal"
                }, {
                    "id": 150,
                    "niceName": "Netherlands"
                }, {
                    "id": 151,
                    "niceName": "Netherlands Antilles"
                }, {
                    "id": 152,
                    "niceName": "New Caledonia"
                }, {
                    "id": 153,
                    "niceName": "New Zealand"
                }, {
                    "id": 154,
                    "niceName": "Nicaragua"
                }, {
                    "id": 155,
                    "niceName": "Niger"
                }, {
                    "id": 156,
                    "niceName": "Nigeria"
                }, {
                    "id": 157,
                    "niceName": "Niue"
                }, {
                    "id": 158,
                    "niceName": "Norfolk Island"
                }, {
                    "id": 159,
                    "niceName": "Northern Mariana Islands"
                }, {
                    "id": 160,
                    "niceName": "Norway"
                }, {
                    "id": 161,
                    "niceName": "Oman"
                }, {
                    "id": 162,
                    "niceName": "Pakistan"
                }, {
                    "id": 163,
                    "niceName": "Palau"
                }, {
                    "id": 164,
                    "niceName": "Palestinian Territory, Occupied"
                }, {
                    "id": 165,
                    "niceName": "Panama"
                }, {
                    "id": 166,
                    "niceName": "Papua New Guinea"
                }, {
                    "id": 167,
                    "niceName": "Paraguay"
                }, {
                    "id": 168,
                    "niceName": "Peru"
                }, {
                    "id": 169,
                    "niceName": "Philippines"
                }, {
                    "id": 170,
                    "niceName": "Pitcairn"
                }, {
                    "id": 171,
                    "niceName": "Poland"
                }, {
                    "id": 172,
                    "niceName": "Portugal"
                }, {
                    "id": 173,
                    "niceName": "Puerto Rico"
                }, {
                    "id": 174,
                    "niceName": "Qatar"
                }, {
                    "id": 175,
                    "niceName": "Reunion"
                }, {
                    "id": 176,
                    "niceName": "Romania"
                }, {
                    "id": 177,
                    "niceName": "Russian Federation"
                }, {
                    "id": 178,
                    "niceName": "Rwanda"
                }, {
                    "id": 179,
                    "niceName": "Saint Helena"
                }, {
                    "id": 180,
                    "niceName": "Saint Kitts and Nevis"
                }, {
                    "id": 181,
                    "niceName": "Saint Lucia"
                }, {
                    "id": 182,
                    "niceName": "Saint Pierre and Miquelon"
                }, {
                    "id": 183,
                    "niceName": "Saint Vincent and the Grenadines"
                }, {
                    "id": 184,
                    "niceName": "Samoa"
                }, {
                    "id": 185,
                    "niceName": "San Marino"
                }, {
                    "id": 186,
                    "niceName": "Sao Tome and Principe"
                }, {
                    "id": 187,
                    "niceName": "Saudi Arabia"
                }, {
                    "id": 188,
                    "niceName": "Senegal"
                }, {
                    "id": 189,
                    "niceName": "Serbia and Montenegro"
                }, {
                    "id": 190,
                    "niceName": "Seychelles"
                }, {
                    "id": 191,
                    "niceName": "Sierra Leone"
                }, {
                    "id": 192,
                    "niceName": "Singapore"
                }, {
                    "id": 193,
                    "niceName": "Slovakia"
                }, {
                    "id": 194,
                    "niceName": "Slovenia"
                }, {
                    "id": 195,
                    "niceName": "Solomon Islands"
                }, {
                    "id": 196,
                    "niceName": "Somalia"
                }, {
                    "id": 197,
                    "niceName": "South Africa"
                }, {
                    "id": 198,
                    "niceName": "South Georgia and the South Sandwich Islands"
                }, {
                    "id": 199,
                    "niceName": "Spain"
                }, {
                    "id": 200,
                    "niceName": "Sri Lanka"
                }, {
                    "id": 201,
                    "niceName": "Sudan"
                }, {
                    "id": 202,
                    "niceName": "Suriname"
                }, {
                    "id": 203,
                    "niceName": "Svalbard and Jan Mayen"
                }, {
                    "id": 204,
                    "niceName": "Swaziland"
                }, {
                    "id": 205,
                    "niceName": "Sweden"
                }, {
                    "id": 206,
                    "niceName": "Switzerland"
                }, {
                    "id": 207,
                    "niceName": "Syrian Arab Republic"
                }, {
                    "id": 208,
                    "niceName": "Taiwan, Province of China"
                }, {
                    "id": 209,
                    "niceName": "Tajikistan"
                }, {
                    "id": 210,
                    "niceName": "Tanzania, United Republic of"
                }, {
                    "id": 211,
                    "niceName": "Thailand"
                }, {
                    "id": 212,
                    "niceName": "Timor-Leste"
                }, {
                    "id": 213,
                    "niceName": "Togo"
                }, {
                    "id": 214,
                    "niceName": "Tokelau"
                }, {
                    "id": 215,
                    "niceName": "Tonga"
                }, {
                    "id": 216,
                    "niceName": "Trinidad and Tobago"
                }, {
                    "id": 217,
                    "niceName": "Tunisia"
                }, {
                    "id": 218,
                    "niceName": "Turkey"
                }, {
                    "id": 219,
                    "niceName": "Turkmenistan"
                }, {
                    "id": 220,
                    "niceName": "Turks and Caicos Islands"
                }, {
                    "id": 221,
                    "niceName": "Tuvalu"
                }, {
                    "id": 222,
                    "niceName": "Uganda"
                }, {
                    "id": 223,
                    "niceName": "Ukraine"
                }, {
                    "id": 224,
                    "niceName": "United Arab Emirates"
                }, {
                    "id": 225,
                    "niceName": "United Kingdom"
                }, {
                    "id": 226,
                    "niceName": "United States"
                }, {
                    "id": 227,
                    "niceName": "United States Minor Outlying Islands"
                }, {
                    "id": 228,
                    "niceName": "Uruguay"
                }, {
                    "id": 229,
                    "niceName": "Uzbekistan"
                }, {
                    "id": 230,
                    "niceName": "Vanuatu"
                }, {
                    "id": 231,
                    "niceName": "Venezuela"
                }, {
                    "id": 232,
                    "niceName": "Viet Nam"
                }, {
                    "id": 233,
                    "niceName": "Virgin Islands, British"
                }, {
                    "id": 234,
                    "niceName": "Virgin Islands, U.s."
                }, {
                    "id": 235,
                    "niceName": "Wallis and Futuna"
                }, {
                    "id": 236,
                    "niceName": "Western Sahara"
                }, {
                    "id": 237,
                    "niceName": "Yemen"
                }, {
                    "id": 238,
                    "niceName": "Zambia"
                }, {
                    "id": 239,
                    "niceName": "Zimbabwe"
                }];
                // async operation would be a call to a server side operation in a real world scenario.
                var deferred = $q.defer();
                try {
                    deferred.resolve(countries);
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };


            return {
                getNewGuid: getNewGuid,
                getCountries: getCountries
            };
        }]);
})();