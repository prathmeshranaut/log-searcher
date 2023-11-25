const httpMocks = require("node-mocks-http");
const validationMiddleware = require("../../../src/common/middlewares/validation.middleware");
const {mockResponseWithEmptyQueryAnd5Logs} = require("../../mocks");
describe("ValidationMiddlewareTest", () => {
    let nextMock = jest.fn();

    it("should throw an error if line_count is set greater than 50 in request", async () => {
        let mockRequestWithExcessLineCount = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: 51
            }
        });

        let response = httpMocks.createResponse();

        await validationMiddleware.validateSearch(mockRequestWithExcessLineCount, response, nextMock);

        expect(response._getStatusCode()).toBe(400);
        expect(response._getJSONData().error).toBe('\"line_count\" must be less than or equal to 50');
    });

    it("should throw an error if line_count is set less than 1 in request", async () => {
        let mockRequestWithExcessLineCount = httpMocks.createRequest({
            body: {
                file_name: "access_log_test.log",
                line_count: -1
            }
        });

        let response = httpMocks.createResponse();

        await validationMiddleware.validateSearch(mockRequestWithExcessLineCount, response, nextMock);

        expect(response._getStatusCode()).toBe(400);
        expect(response._getJSONData().error).toBe('\"line_count\" must be larger than or equal to 1');
    });

    it("should throw an error if file_name is missing in request", async () => {
        let mockRequestWithExcessLineCount = httpMocks.createRequest({
            body: {
                line_count: 10
            }
        });

        let response = httpMocks.createResponse();

        await validationMiddleware.validateSearch(mockRequestWithExcessLineCount, response, nextMock);

        expect(response._getStatusCode()).toBe(400);
        expect(response._getJSONData().error).toBe('\"file_name\" is required');
    });
});