import {afterAll, afterEach, beforeAll} from 'vitest';
import {mockServer} from "./src/lib/http/mock-server";

// Start server before all tests
beforeAll(() => {
    mockServer.listen({onUnhandledRequest: 'error'})
})

//  Close server after all tests
afterAll(() => mockServer.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => mockServer.resetHandlers())