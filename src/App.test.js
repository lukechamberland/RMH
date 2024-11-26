import { render, screen } from '@testing-library/react';
import App from './App';
import Card from './components/Card';

describe('Test for card', () => {
  test('Class should be highlight-card', () => {
    render(<Card suit="hearts" rank="2" flip={false} buy={true} index={0} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('highlight-card');
  });

  test('Class should be card', () => {
    render(<Card suit="hearts" rank="2" flip={false} buy={true} index={1} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('card');
  });
});
