export interface ICountry {
  id: number;
  name: string;
  code: string;
}

export interface ICity {
  id: number;
  countryId: number;
  name: string;
  code: string;
}
