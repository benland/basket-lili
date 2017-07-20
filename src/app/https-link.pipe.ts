import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'httpsLink'
})
export class HttpsLinkPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/^http:\/\//i, 'https://');
  }
}
