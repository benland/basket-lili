import { HttpsLinkPipe } from './https-link.pipe';

describe('HttpsLinkPipe', () => {
  it('create an instance', () => {
    const pipe = new HttpsLinkPipe();
    expect(pipe).toBeTruthy();
  });
});
