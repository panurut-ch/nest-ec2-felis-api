import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatService {
  private readonly logger = new Logger(CatService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRandomCatImage(): Promise<any> {
    try {
      const THE_CAT_API = this.configService.get('THE_CAT_API');
      const response = await this.httpService
        .get(`${THE_CAT_API}/images/search?limit=10`)
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

  async getCatDetail(): Promise<any> {
    try {
      const THE_CAT_API = this.configService.get('THE_CAT_API');
      const THE_CAT_API_TOKEN = this.configService.get('THE_CAT_API_TOKEN');
      const response = await this.httpService
        .get(
          `${THE_CAT_API}/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`,
          {
            headers: {
              'x-api-key': THE_CAT_API_TOKEN,
            },
          },
        )
        .toPromise();

      console.log('response.data[0]', response.data[0]);
      const catImageUrl = response.data[0]?.url;
      const catName = response.data[0]?.breeds[0]?.name;
      const catTemperament = response.data[0]?.breeds[0]?.temperament;
      const catOrigin = response.data[0]?.breeds[0]?.origin;
      const catDescription = response.data[0]?.breeds[0]?.description;
      const catWidth = response.data[0]?.width;
      const catHeight = response.data[0]?.height;

      const return_data = {
        catImageUrl: catImageUrl,
        catName: catName,
        catTemperament: catTemperament,
        catOrigin: catOrigin,
        catDescription: catDescription,
        catWidth: catWidth,
        catHeight: catHeight,
      };

      // Log success information
      this.logger.log(`Successfully fetched cat detail: ${catName}`);
      const res = {
        status: HttpStatus.OK,
        data: return_data || 'DefaultFallbackReturnData',
      };
      console.log('res', res);
      return res;
    } catch (error) {
      // Log error and throw a custom message
      this.logger.error(error);
      throw 'An error happened while fetching cat data!';
    }
  }
}
