import type { APIRequestContext } from '@playwright/test';
import { urls } from '../../../config/urls';

// [Nicolas] Idea to centralise API + POM-style client; choice of endpoint and body shape.
// [AI-assisted] Class structure, types, getDefaultSearchBody(), search() with headers/urls from config.

export type SearchRequestBody = {
  aggregationType: string[];
  constructionType: string[];
  offeringType: string[];
  price: { priceRangeType: string; lowerBound: number; upperBound: number | null };
  geoInformation: string;
  zoning: string[];
  cultureInfo: string;
  page: number;
};
  
export class SearchApi {
  constructor(private readonly request: APIRequestContext) {}

  private defaultBody: SearchRequestBody = {
    aggregationType: ['listing'],
    constructionType: [],
    offeringType: ['buy'],
    price: {
      priceRangeType: 'SalePrice',
      lowerBound: 0,
      upperBound: null,
    },
    geoInformation: 'diemen',
    zoning: ['residential'],
    cultureInfo: 'nl',
    page: 1,
  };

  getDefaultSearchBody(overrides?: Partial<SearchRequestBody>): SearchRequestBody {
    return { ...this.defaultBody, ...overrides };
  }

  async search(body: SearchRequestBody = this.defaultBody) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const userAgent = process.env.FUNDA_USER_AGENT;
    if (userAgent) {
      headers['User-Agent'] = userAgent;
    }

    return this.request.post(urls.api.search, {
      data: body,
      headers,
    });
  }
}
