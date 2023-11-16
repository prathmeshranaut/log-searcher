# Log searcher

Searches logs from files located in `logs/` directory and presents them using a REST API. 

Used `logs/` directory instead of `/var/log` because it makes it easier to test/demo with sample log files. 
In order to read from `/var/log/`, change the `filePath` variable in `search/controllers/search.controller.js` which also works.

# Prerequisites
Requires: Node.js 18.

Tested on Node.js `18.17.1`

NPM Version: `10.2.3`

# Instructions to run

1. `npm install`
2. `npm run start`
3. I have included a sample access log files in `logs/` folder.
   1. `access_log_1.log` (22MB)
   2. Due to limitation of file size in a Github Repository, I couldn't upload larger files. Generate larger log files by running the commands: 
      1. ```for i in `seq 1 10`; do cat access_log_1.log >> access_log_2.log; done```. Results in 663 MB file
      2. ```for i in `seq 1 20`; do cat access_log_1.log >> access_log_3.log; done```. Results in 2.21GB file
4. The app by default reads those files placed in the `logs` folder. In order to read from `/var/log/`, change the `filePath` variable in `search/controllers/search.controller.js`.  
5. The app server will be running on http://localhost:3000/. This can be validated in the browser.

# API Details

| Endpoint       | Description                                                                                                                                                                                                          |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST `/search` | Body Params accepted as JSON: <br> `fileName`(string): Name of the file with extension <br> `line_count`(number): Min(1), Max(50), Default(10) <br> `query`(string): (Optional) text for basic name/keyword matching |

## Test Cases

| Test case                                                    | Query                                                                                                           | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fetch 5 lines from log searcher which contains keyword `188` | <pre>{ <br>  "file_name": "access_log_1.log",<br>  "line_count": 5,<br>  "query": "188" <br>} </pre>            | <pre> {<br> "data": [<br>    "65.162.188.151 - - [19/May/2024:02:07:13 -0500] "GET /search/tag/list HTTP/1.0" 200 4991 "http://williams.com/\" "Mozilla/5.0 (Windows CE; sl-SI; rv:1.9.0.20) Gecko/2020-04-18 21:26:55 Firefox/3.6.15"",<br>    "98.188.61.247 - - [18/May/2024:22:14:01 -0500] "POST /search/tag/list HTTP/1.0" 200 5010 "http://www.shields-jarvis.com/posts/categories/faq.jsp\" "Mozilla/5.0 (Macintosh; PPC Mac OS X 10_6_3; rv:1.9.3.20) Gecko/2023-04-18 23:34:30 Firefox/3.8"",<br>     "191.111.74.202 - - [18/May/2024:21:20:23 -0500] "DELETE /app/main/posts HTTP/1.0" 200 5024 "http://parsons.net/terms.htm\" "Opera/8.81.(X11; Linux i686; en-US) Presto/2.9.188 Version/12.00"",<br>     "92.144.188.217 - - [18/May/2024:12:00:37 -0500] "GET /list HTTP/1.0" 200 5014 "http://www.ramirez-morrison.com/list/author.php\" "Mozilla/5.0 (X11; Linux i686; rv:1.9.6.20) Gecko/2017-11-14 00:21:51 Firefox/3.6.9"",<br>    "188.10.248.90 - - [18/May/2024:11:07:11 -0500] "PUT /explore HTTP/1.0" 200 4969 "http://www.bryant-wilson.com/tag/app/terms.jsp\" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_5; rv:1.9.2.20) Gecko/2018-01-11 23:46:40 Firefox/3.6.10""<br>  ]<br>}                      </pre> |
| Fetching with empty query should return last n lines         | <pre>{ <br>  "file_name": "access_log_1.log",<br>  "line_count": 5,<br>  "query": "" <br>} </pre>               | <pre> {<br>  "data": [<br>    "255.216.250.250 - - [19/May/2024:03:34:45 -0500] \"POST /list HTTP/1.0\" 200 5099 \"http://www.rice-may.org/\" \"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_4) AppleWebKit/5341 (KHTML, like Gecko) Chrome/15.0.863.0 Safari/5341\"",<br>    "106.89.252.231 - - [19/May/2024:03:32:14 -0500] \"GET /wp-admin HTTP/1.0\" 404 4953 \"http://wright.info/explore/privacy/\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5331 (KHTML, like Gecko) Chrome/13.0.894.0 Safari/5331\"",<br>    "140.120.218.23 - - [19/May/2024:03:29:12 -0500] \"GET /wp-admin HTTP/1.0\" 200 4839 \"http://www.white.com/privacy/\" \"Mozilla/5.0 (Windows NT 6.1; en-US; rv:1.9.0.20) Gecko/2023-08-05 03:24:21 Firefox/14.0\"",<br>    "187.146.222.0 - - [19/May/2024:03:26:38 -0500] \"DELETE /wp-content HTTP/1.0\" 404 5042 \"http://www.haas.biz/about/\" \"Opera/8.20.(X11; Linux x86_64; en-US) Presto/2.9.181 Version/11.00\"",<br>    "148.0.168.100 - - [19/May/2024:03:24:10 -0500] \"GET /explore HTTP/1.0\" 200 5057 \"http://shelton.com/post.php\" \"Mozilla/5.0 (Macintosh; PPC Mac OS X 10_7_0; rv:1.9.2.20) Gecko/2016-09-17 10:26:23 Firefox/3.8\""<br>  ]<br>}                                    </pre> |
| Fetching a non-matching string should return empty list      | <pre>{ <br>  "file_name": "access_log_1.log",   <br>  "line_count": 5,  <br>  "query": "Prathmesh" <br>} </pre> | <pre> {<br>  "data": []<br>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </pre> |
| Fetching a file that does not exist should return an error   | <pre>{ <br>  "file_name": "unknown_file.log",  "line_count": 5} </pre>                                          | <pre> {<br>  "error": "File does not exist"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </pre> |
| Fetching more than 50 rows should return an error            | <pre>{ <br>  "file_name": "access_log_1.log",<br>  "line_count": 51<br>} </pre>                                 | <pre> {<br>  "error": "\"line_count\" must be less than or equal to 50"<br>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </pre> |
| Fetching data from a large file(3GB)                         | <pre>{<br>  "file_name": "access_log_3.log",<br>  "line_count": 5,<br>  "query": "wp-admin"<br>} </pre>         | <pre> {<br>  "data": [<br>     "188.47.141.133 - - [26/Apr/2034:07:21:07 -0500] \"GET /wp-admin HTTP/1.0\" 200 4985 \"http://spencer.com/privacy.html\" \"Mozilla/5.0 (Windows 98; sl-SI; rv:1.9.1.20) Gecko/2020-04-11 04:26:28 Firefox/4.0\"",<br>     "89.182.36.4 - - [26/Apr/2034:07:12:55 -0500] \"DELETE /wp-admin HTTP/1.0\" 301 4973 \"http://sanchez.com/post.html\" \"Mozilla/5.0 (Windows 98; Win 9x 4.90; en-US; rv:1.9.0.20) Gecko/2016-04-16 16:39:06 Firefox/11.0\"",<br>     "114.146.171.14 - - [26/Apr/2034:07:05:03 -0500] \"GET /wp-admin HTTP/1.0\" 200 5042 \"http://www.finley.com/\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_7) AppleWebKit/5320 (KHTML, like Gecko) Chrome/15.0.872.0 Safari/5320\"",<br>     "197.138.26.56 - - [26/Apr/2034:07:03:24 -0500] \"GET /wp-admin HTTP/1.0\" 200 4948 \"http://www.duarte.com/terms/\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_6; rv:1.9.4.20) Gecko/2015-06-29 12:55:50 Firefox/3.6.3\"",<br>     "254.47.33.129 - - [26/Apr/2034:04:42:53 -0500] \"GET /wp-admin HTTP/1.0\" 200 5018 \"http://www.powell-henry.biz/app/about.htm\" \"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/5332 (KHTML, like Gecko) Chrome/13.0.801.0 Safari/5332\""<br>  ]<br>} </pre> |