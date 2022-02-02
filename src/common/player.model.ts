export interface Player {
  fields: Fields;
}

interface Fields {
  id: number;
  name: string;
  nickname: string;
  position: string;
  countryFlag: CountryFlag;
  photo: Photo;
}

interface CountryFlag {
  sys: Sys;
}

interface Photo {
  sys: Sys;
}

interface Sys {
  id: string;
}