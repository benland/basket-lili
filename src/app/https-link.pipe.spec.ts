import { HttpsLinkPipe } from './https-link.pipe';

describe('HttpsLinkPipe', () => {
  it('should replace http:// with https://', () => {
    const pipe = new HttpsLinkPipe();
    expect(pipe.transform('http://www.google.com/')).toBe('https://www.google.com/');
  });

  it('should replace HTTP:// with https://', () => {
    const pipe = new HttpsLinkPipe();
    expect(pipe.transform('HTTP://www.google.com/')).toBe('https://www.google.com/');
  });

  it('should not modify URLs already starting with https', () => {
    const pipe = new HttpsLinkPipe();
    expect(pipe.transform('HTTPs://www.google.com/')).toBe('HTTPs://www.google.com/');
  });
});
