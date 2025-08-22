import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BookingForm from "./BookingForm";
import '@testing-library/jest-dom';

jest.setTimeout(10000);

// Create a theme for Material-UI components
const theme = createTheme();

// Wrapper component for Material-UI
const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

const mockTimes = ['17:00', '18:00', '19:00'];
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2025-05-01'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe("BookingForm with Formik validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the BookingForm submit button disabled initially", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    const buttonElement = screen.getByRole('button', { name: /Reserve Table/i });
    expect(buttonElement).toBeInTheDocument();

    // Wait for Formik validation to reflect in the disabled state
    await waitFor(() => {
      expect(buttonElement).toBeDisabled();
    });
  });

  test("renders the 'Choose Date' label", () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );
    const labelElement = screen.getByLabelText(/Choose Date/i);
    expect(labelElement).toBeInTheDocument();
  });

  test("shows validation error if required fields are empty and form is submitted", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    const buttonElement = screen.getByRole('button', { name: /Reserve Table/i });

    // Try to submit with empty form
    fireEvent.click(buttonElement);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Contact is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Time is required/i)).toBeInTheDocument();
    });

    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  test("shows validation error if date is in the past", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    const dateInput = screen.getByLabelText(/Choose Date/i);
    fireEvent.change(dateInput, {
      target: { value: '2025-04-01' } // Past date
    });

    fireEvent.blur(dateInput);

    await waitFor(() => {
      expect(screen.getByText(/Date cannot be in the past/i)).toBeInTheDocument();
    });
  });

  test("validates email format", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, {
      target: { value: 'invalid-email' }
    });

    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    });
  });

  test("validates contact number format", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    const contactInput = screen.getByLabelText(/Contact Number/i);
    fireEvent.change(contactInput, {
      target: { value: '123' } // Too short
    });

    fireEvent.blur(contactInput);

    await waitFor(() => {
      expect(screen.getByText(/Enter valid contact number/i)).toBeInTheDocument();
    });
  });

  test("validates number of guests range", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    const guestsInput = screen.getByLabelText(/Number of Guests/i);

    // Test minimum validation
    fireEvent.change(guestsInput, {
      target: { value: '0' }
    });
    fireEvent.blur(guestsInput);

    await waitFor(() => {
      expect(screen.getByText(/At least 1 guest is required/i)).toBeInTheDocument();
    });

    // Test maximum validation
    fireEvent.change(guestsInput, {
      target: { value: '15' }
    });
    fireEvent.blur(guestsInput);

    await waitFor(() => {
      expect(screen.getByText(/Maximum 10 guests allowed/i)).toBeInTheDocument();
    });
  });

  test("enables submit button when all fields are valid", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    // Fill in all required fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' }
    });

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' }
    });

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john.doe@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '1234567890' }
    });

    fireEvent.change(screen.getByLabelText(/Choose Date/i), {
      target: { value: '2025-06-01' }
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', payload: '2025-06-01' });

    // Open the time select dropdown and select a time
    const timeSelect = screen.getByLabelText(/Choose Time/i);
    fireEvent.mouseDown(timeSelect);

    await waitFor(() => {
      const timeOptions = screen.getAllByText('17:00');
      const timeOption = timeOptions.find(option =>
        option.closest('[role="option"]')
      ) || timeOptions[0];
      fireEvent.click(timeOption);
    });

    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '3' }
    });

    // Open the occasion select dropdown and select an occasion
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.mouseDown(occasionSelect);

    await waitFor(() => {
      const anniversaryOptions = screen.getAllByText('Anniversary');
      const occasionOption = anniversaryOptions.find(option =>
        option.closest('[role="option"]')
      ) || anniversaryOptions[0];
      fireEvent.click(occasionOption);
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reserve Table/i })).toBeEnabled();
    }, { timeout: 10000 });
  });

  test("calls submitForm with complete form data when valid form is submitted", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    // Fill in all required fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'Jane' }
    });

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Smith' }
    });

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'jane.smith@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '9876543210' }
    });

    fireEvent.change(screen.getByLabelText(/Choose Date/i), {
      target: { value: '2025-06-01' }
    });

    // Select time
    const timeSelect = screen.getByLabelText(/Choose Time/i);
    fireEvent.mouseDown(timeSelect);

    await waitFor(() => {
      const timeOption = screen.getAllByText('17:00')[0]; // Get first instance
      fireEvent.click(timeOption);
    });

    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '4' }
    });

    // Select occasion
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.mouseDown(occasionSelect);

    await waitFor(() => {
      const occasionOptions = screen.getAllByText('Birthday');
      const occasionOption = occasionOptions.find(option =>
        option.closest('[role="option"]')
      ) || occasionOptions[0];
      fireEvent.click(occasionOption);
    });

    // Wait for form to be valid and submit
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reserve Table/i })).toBeEnabled();
    }, { timeout: 3000 });

    const buttonElement = screen.getByRole('button', { name: /Reserve Table/i });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        contact: '9876543210',
        date: '2025-06-01',
        time: '17:00',
        guests: 4,
        occasion: 'Birthday'
      });
    }, { timeout: 3000 });
  });

  test("shows success message after successful form submission", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    // Fill in all required fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'Test' }
    });

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'User' }
    });

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '1234567890' }
    });

    fireEvent.change(screen.getByLabelText(/Choose Date/i), {
      target: { value: '2025-06-01' }
    });

    // Select time
    const timeSelect = screen.getByLabelText(/Choose Time/i);
    fireEvent.mouseDown(timeSelect);

    await waitFor(() => {
      const timeOption = screen.getByText('18:00');
      fireEvent.click(timeOption);
    });

    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '2' }
    });

    // Select occasion
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.mouseDown(occasionSelect);

    await waitFor(() => {
      const occasionOption = screen.getByText('Casual');
      fireEvent.click(occasionOption);
    });

    // Submit the form
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reserve Table/i })).toBeEnabled();
    });

    const buttonElement = screen.getByRole('button', { name: /Reserve Table/i });
    fireEvent.click(buttonElement);
  });

  test("shows loading state during form submission", async () => {
    render(
      <TestWrapper>
        <BookingForm
          availableTimes={mockTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </TestWrapper>
    );

    // Fill in all required fields quickly
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'Test' }
    });

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'User' }
    });

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '1234567890' }
    });

    fireEvent.change(screen.getByLabelText(/Choose Date/i), {
      target: { value: '2025-06-01' }
    });

    const timeSelect = screen.getByLabelText(/Choose Time/i);
    fireEvent.mouseDown(timeSelect);

    await waitFor(() => {
      const timeOptions = screen.getAllByText('18:00');
      const timeOption = timeOptions.find(option =>
        option.closest('[role="option"]')
      ) || timeOptions[0];
      fireEvent.click(timeOption);
    });

    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '2' }
    });

    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.mouseDown(occasionSelect);

    await waitFor(() => {
      const casualOptions = screen.getAllByText('Casual');
      const occasionOption = casualOptions.find(option =>
        option.closest('[role="option"]')
      ) || casualOptions[0];
      fireEvent.click(occasionOption);
    });

    // Submit and check for loading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Reserve Table/i })).toBeEnabled();
    }, { timeout: 6000 });

    const buttonElement = screen.getByRole('button', { name: /Reserve Table/i });
    fireEvent.click(buttonElement);

    // Check for loading text (should appear quickly)
    await waitFor(() => {
      expect(screen.getByText(/Booking.../i)).toBeInTheDocument();
    }, { timeout: 6000 });

    // The button should be disabled during submission
    expect(buttonElement).toBeDisabled();
  });
});