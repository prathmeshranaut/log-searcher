export const mockResponseWithEmptyQueryAnd10Logs = {
    "data": [
        "255.216.250.250 - - [19/May/2024:03:34:45 -0500] \"POST /list HTTP/1.0\" 200 5099 \"http://www.rice-may.org/\" \"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_4) AppleWebKit/5341 (KHTML, like Gecko) Chrome/15.0.863.0 Safari/5341\"",
        "106.89.252.231 - - [19/May/2024:03:32:14 -0500] \"GET /wp-admin HTTP/1.0\" 404 4953 \"http://wright.info/explore/privacy/\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5331 (KHTML, like Gecko) Chrome/13.0.894.0 Safari/5331\"",
        "140.120.218.23 - - [19/May/2024:03:29:12 -0500] \"GET /wp-admin HTTP/1.0\" 200 4839 \"http://www.white.com/privacy/\" \"Mozilla/5.0 (Windows NT 6.1; en-US; rv:1.9.0.20) Gecko/2023-08-05 03:24:21 Firefox/14.0\"",
        "187.146.222.0 - - [19/May/2024:03:26:38 -0500] \"DELETE /wp-content HTTP/1.0\" 404 5042 \"http://www.haas.biz/about/\" \"Opera/8.20.(X11; Linux x86_64; en-US) Presto/2.9.181 Version/11.00\"",
        "148.0.168.100 - - [19/May/2024:03:24:10 -0500] \"GET /explore HTTP/1.0\" 200 5057 \"http://shelton.com/post.php\" \"Mozilla/5.0 (Macintosh; PPC Mac OS X 10_7_0; rv:1.9.2.20) Gecko/2016-09-17 10:26:23 Firefox/3.8\"",
        "212.241.217.217 - - [19/May/2024:03:23:16 -0500] \"GET /apps/cart.jsp?appID=5720 HTTP/1.0\" 200 5076 \"http://www.hall.info/search/app/categories/login/\" \"Mozilla/5.0 (Macintosh; PPC Mac OS X 10_5_8; rv:1.9.6.20) Gecko/2016-04-13 05:58:46 Firefox/3.8\"",
        "24.135.167.143 - - [19/May/2024:03:18:50 -0500] \"PUT /wp-admin HTTP/1.0\" 200 5053 \"http://johnson.com/terms/\" \"Mozilla/5.0 (X11; Linux i686; rv:1.9.7.20) Gecko/2015-12-21 21:45:46 Firefox/9.0\"",
        "155.173.128.195 - - [19/May/2024:03:15:13 -0500] \"PUT /wp-admin HTTP/1.0\" 200 5036 \"http://www.frederick.org/terms/\" \"Mozilla/5.0 (X11; Linux i686; rv:1.9.7.20) Gecko/2013-12-25 17:06:29 Firefox/3.6.19\"",
        "114.105.214.44 - - [19/May/2024:03:12:20 -0500] \"PUT /search/tag/list HTTP/1.0\" 200 4996 \"http://howell-kim.biz/search.html\" \"Mozilla/5.0 (X11; Linux i686) AppleWebKit/5312 (KHTML, like Gecko) Chrome/15.0.852.0 Safari/5312\"",
        "132.239.131.31 - - [19/May/2024:03:08:02 -0500] \"GET /search/tag/list HTTP/1.0\" 200 4965 \"http://www.barnes-cox.com/\" \"Mozilla/5.0 (Windows NT 5.0; en-US; rv:1.9.2.20) Gecko/2017-07-31 03:47:44 Firefox/3.8\""
    ]
}

export const mockResponseWithEmptyQueryAnd5Logs = {
    "data": mockResponseWithEmptyQueryAnd10Logs.data.slice(0, 5)
}

export const mockResponseWithSearchQueryForPutRequests = {
    "data": [
        "24.135.167.143 - - [19/May/2024:03:18:50 -0500] \"PUT /wp-admin HTTP/1.0\" 200 5053 \"http://johnson.com/terms/\" \"Mozilla/5.0 (X11; Linux i686; rv:1.9.7.20) Gecko/2015-12-21 21:45:46 Firefox/9.0\"",
        "155.173.128.195 - - [19/May/2024:03:15:13 -0500] \"PUT /wp-admin HTTP/1.0\" 200 5036 \"http://www.frederick.org/terms/\" \"Mozilla/5.0 (X11; Linux i686; rv:1.9.7.20) Gecko/2013-12-25 17:06:29 Firefox/3.6.19\"",
        "114.105.214.44 - - [19/May/2024:03:12:20 -0500] \"PUT /search/tag/list HTTP/1.0\" 200 4996 \"http://howell-kim.biz/search.html\" \"Mozilla/5.0 (X11; Linux i686) AppleWebKit/5312 (KHTML, like Gecko) Chrome/15.0.852.0 Safari/5312\"",
        "31.101.117.177 - - [19/May/2024:03:04:25 -0500] \"PUT /wp-admin HTTP/1.0\" 200 4927 \"http://www.mathews.com/\" \"Mozilla/5.0 (Macintosh; PPC Mac OS X 10_6_5) AppleWebKit/5342 (KHTML, like Gecko) Chrome/14.0.884.0 Safari/5342\"",
        "131.58.84.178 - - [19/May/2024:02:58:14 -0500] \"PUT /apps/cart.jsp?appID=2411 HTTP/1.0\" 200 4954 \"http://kramer.info/category.php\" \"Mozilla/5.0 (Windows NT 5.1; it-IT; rv:1.9.1.20) Gecko/2020-04-28 17:22:17 Firefox/3.8\"",
        "73.156.249.57 - - [19/May/2024:02:47:38 -0500] \"PUT /search/tag/list HTTP/1.0\" 200 4971 \"http://www.owens.org/register.html\" \"Mozilla/5.0 (Windows 98; Win 9x 4.90) AppleWebKit/5342 (KHTML, like Gecko) Chrome/13.0.856.0 Safari/5342\"",
    ]
}

export const mockResponseWithSearchQueryForPutRequestsWith2Lines = {
    data: mockResponseWithSearchQueryForPutRequests.data.slice(0, 2)
}

export const mockResponseLastRow = "255.216.250.250 - - [19/May/2024:03:34:45 -0500] \"POST /list HTTP/1.0\" 200 5099 \"http://www.rice-may.org/\" \"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_4) AppleWebKit/5341 (KHTML, like Gecko) Chrome/15.0.863.0 Safari/5341\"";

export const mockEmptyResponse = { "data": [] }