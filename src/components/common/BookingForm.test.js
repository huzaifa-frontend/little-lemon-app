import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingForm from "./BookingForm";
import '@testing-library/jest-dom';

const mockTimes = ['17:00', '18:00', '19:00'];
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2025-05-01'));
});

describe("BookingForm with Formik validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the BookingForm submit button disabled initially", async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const buttonElement = screen.getByRole('button', { name: /Book Now/i });
    expect(buttonElement).toBeInTheDocument();

    // ✅ Wait for Formik validation to reflect in the disabled state
    await waitFor(() => {
      expect(buttonElement).toBeDisabled();
    });
  });

  test("renders the 'Choose date' label", () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );
    const labelElement = screen.getByLabelText(/Choose date/i);
    expect(labelElement).toBeInTheDocument();
  });

  test("shows validation error if date is empty and form is submitted", async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );
    const buttonElement = screen.getByRole('button', { name: /Book Now/i });
    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText(/Date is required/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  test("enables submit button when all fields are valid", async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    fireEvent.change(screen.getByLabelText(/Choose date/i), {
      target: { value: '2025-06-01' }
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', payload: '2025-06-01' });

    fireEvent.change(screen.getByLabelText(/Choose time/i), {
      target: { value: '17:00' }
    });

    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '3' }
    });

    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: 'Anniversary' }
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Book Now/i })).toBeEnabled();
    });
  });

  test("calls submitForm with form data when valid form is submitted", async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    fireEvent.change(screen.getByLabelText(/Choose date/i), {
      target: { value: '2025-06-01' }
    });
    fireEvent.change(screen.getByLabelText(/Choose time/i), {
      target: { value: '17:00' }
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '4' }
    });
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: 'Birthday' }
    });

    const buttonElement = screen.getByRole('button', { name: /Book Now/i });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        date: '2025-06-01',
        time: '17:00',
        guests: 4,
        occasion: 'Birthday'
      });
    });
  });
});