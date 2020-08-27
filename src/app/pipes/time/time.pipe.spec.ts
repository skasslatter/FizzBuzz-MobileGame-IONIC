import { TimePipe } from './time.pipe';

describe('TimeConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });
});
