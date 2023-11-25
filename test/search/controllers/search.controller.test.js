const httpMocks = require('node-mocks-http');
import {
    mockResponseLastRow,
    mockResponseWithEmptyQueryAnd5Logs,
    mockResponseWithSearchQueryForPutRequests,
    mockResponseWithSearchQueryForPutRequestsWith2Lines,
    mockEmptyResponse,
} from '../../mocks';
const searchController = require('../../../src/search/controllers/search.controller');

describe("SearchControllerTest", () => {
    it("should limit the number of results based on line_count parameter passed in request body", async () => {
        let mockRequestWithLineLimit = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: "5"
            }
        });

        let response = httpMocks.createResponse();

        await searchController.search(mockRequestWithLineLimit, response);

        expect(response._getStatusCode()).toBe(200);
        expect(response._getJSONData()).toStrictEqual(mockResponseWithEmptyQueryAnd5Logs);
    });

    it("should return rows that match the search query only", async () => {
        let mockRequestWithSearchQuery = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: "10",
                query: "PUT"
            }
        });

        let response = httpMocks.createResponse();

        await searchController.search(mockRequestWithSearchQuery, response);

        expect(response._getStatusCode()).toBe(200);
        expect(response._getJSONData()).toStrictEqual(mockResponseWithSearchQueryForPutRequests);
    });

    it("should return last row first in response", async () => {
        let mockRequestWithLineCountLimit = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: "5"
            }
        });

        let response = httpMocks.createResponse();

        await searchController.search(mockRequestWithLineCountLimit, response);

        expect(response._getStatusCode()).toBe(200);
        expect(response._getJSONData().data[0]).toBe(mockResponseLastRow);
    });

    it("should return empty data when it could not find anything in the file", async () => {
        let mockRequestWithNonExistentQuery = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: "5",
                query: "Prathmesh",
            }
        });

        let response = httpMocks.createResponse();

        await searchController.search(mockRequestWithNonExistentQuery, response);

        expect(response._getStatusCode()).toBe(200);
        expect(response._getJSONData()).toStrictEqual(mockEmptyResponse);
    });

    it("should return last 5 rows that match the query and skip the rest", async() => {
        let mockRequestWithLineCountAndSearchQuery = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: "2",
                query: "PUT"
            }
        });

        let response = httpMocks.createResponse();

        await searchController.search(mockRequestWithLineCountAndSearchQuery, response);

        expect(response._getStatusCode()).toBe(200);
        expect(response._getJSONData()).toStrictEqual(mockResponseWithSearchQueryForPutRequestsWith2Lines);
    });

    it("should return a 400 response with error if a file does not exist", async () => {
        let mockRequestWithInvalidFilename = httpMocks.createRequest({
            body: {
                file_name: "missing_file.log",
                line_count: "10"
            }
        });

        let response = httpMocks.createResponse();

        await searchController.search(mockRequestWithInvalidFilename, response);

        expect(response._getStatusCode()).toBe(400);
        expect(response._getJSONData().error).toBe("File does not exist");
    });
});