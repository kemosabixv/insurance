import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../ProductCard';

describe('ProductCard Component', () => {
  test('renders product card with correct data', () => {
    render(
      <ProductCard
        name="Test Insurance"
        type="Health"
        coverage="Comprehensive health coverage"
        price={99.99}
      />
    );

    expect(screen.getByText(/test insurance/i)).toBeInTheDocument();
    const healthElements = screen.getAllByText(/health/i);
    expect(healthElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/comprehensive health coverage/i)).toBeInTheDocument();
    expect(screen.getByText(/\$99.99/)).toBeInTheDocument();
  });
});
