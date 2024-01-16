import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CatService {
  private readonly logger = new Logger(CatService.name);

  constructor(private readonly httpService: HttpService) {}

  async getRandomCatImage(): Promise<any> {
    try {
      const response = await this.httpService
        .get('https://api.thecatapi.com/v1/images/search?limit=10')
        .toPromise();

      const catImageUrl = response.data[0]?.url;

      // Log success information
      this.logger.log(`Successfully fetched cat image: ${catImageUrl}`);
      const res = {
        data: catImageUrl || 'DefaultFallbackImageUrl',
      };
      return res;
    } catch (error) {
      // Log error and throw a custom message
      this.logger.error(error);
      throw 'An error happened while fetching cat image!';
    }
  }
}
