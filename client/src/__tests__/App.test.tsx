
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders navbar and routes', () => {
    render(<App />);
    expect(screen.getByText(/Senvia Niryat AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Documents/i)).toBeInTheDocument();
  });
});
