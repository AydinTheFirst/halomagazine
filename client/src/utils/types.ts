export interface IMagazine {
  id: string;
  catId: string;
  title: string;
  description: string;
  thumbnail: string;
  file: string;
  timestamp: string;
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  magazines: IMagazine[];
}
