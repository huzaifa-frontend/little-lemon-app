import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

const mockTimes = ['17:00', '18:00', '19:00'];
const mockDispatch = jest.fn();

test("renders the BookingForm submit button", () => {
  render(<BookingForm availableTimes={mockTimes} dispatch={mockDispatch} />);
  const buttonElement = screen.getByText(/Book Now/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders the 'Choose date' label", () => {
  render(<BookingForm availableTimes={mockTimes} dispatch={mockDispatch} />);
  const labelElement = screen.getByLabelText(/Choose date/i);
  expect(labelElement).toBeInTheDocument();
});
