import { GeoApiGouvAddressType } from "@placeme/ngx-geo-api-gouv-address";

interface QueryRequestParams {
  q: string;
  limit?: number;
  autocomplete?: number;
  lat?: number;
  lon?: number;
  type?: GeoApiGouvAddressType;
  postcode?: string;
  citycode?: string;
}
