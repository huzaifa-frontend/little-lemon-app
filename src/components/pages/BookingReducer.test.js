import { initializeTimes, updateTimes } from "./BookingPage";

describe("Booking reducer tests", () => {
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
