import { FormatCreditCardPipe } from './format-credit-card.pipe';

describe('FormatCreditCardPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatCreditCardPipe();
    expect(pipe).toBeTruthy();
  });
});
