import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Little Lemon App Basic Tests', () => {
  test('React testing library is working', () => {
    render(<div>Hello Test</div>);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });

  test('can render a simple component', () => {
    const SimpleComponent = () => (
      <div data-testid="simple">
        <h1>Little Lemon Restaurant</h1>
        <p>Welcome to our restaurant</p>
      </div>
    );

    render(<SimpleComponent />);
    expect(screen.getByTestId('simple')).toBeInTheDocument();
    expect(screen.getByText('Little Lemon Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Welcome to our restaurant')).toBeInTheDocument();
  });

  test('jest-dom matchers work correctly', () => {
    render(
      <div>
        <button disabled>Disabled Button</button>
        <input type="text" value="test" readOnly />
        <img src="test.jpg" alt="Test Image" />
      </div>
    );

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveValue('test');
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  test('basic HTML elements render correctly', () => {
    render(
      <div>
        <header>Header Content</header>
        <nav>Navigation</nav>
        <main>Main Content</main>
        <footer>Footer Content</footer>
      </div>
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  test('links and buttons are interactive elements', () => {
    render(
      <div>
        <a href="/home">Home Link</a>
        <button>Click Me</button>
      </div>
    );

    const link = screen.getByRole('link');
    const button = screen.getByRole('button');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
    expect(button).toBeInTheDocument();
  });
});