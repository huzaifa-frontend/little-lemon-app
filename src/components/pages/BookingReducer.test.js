import { initializeTimes, updateTimes } from "./BookingPage";
import * as api from "../../api";

jest.mock("../../api", () => ({
  fetchAPI: jest.fn()
}));

describe("Booking reducer tests", () => {
  beforeEach(() => {
    // Set default mocked return value for fetchAPI
    api.fetchAPI.mockReturnValue(['17:00', '18:00', '19:00', '20:00', '21:00']);
  });

  test("initializeTimes returns correct default times", () => {
    const times = initializeTimes();
    expect(times).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00']);
  });

  test("updateTimes returns updated times based on action payload", () => {
    const currentState = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', payload: '2023-12-01' };
    const newState = updateTimes(currentState, action);
    expect(newState).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00']);
  });
});
