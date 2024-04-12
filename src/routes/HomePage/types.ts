export interface SearchType {
  s: string;
  i?: string;
  type?: MovieTypes;
  page: number;
  y?: number;
}
export interface FormType {
  title: string;
  type: MovieTypes;
  year: number;
}
export interface MovieState {
  Response: string;
  Search: MovieSearchResult[] | [];
  totalResults: string;
  loading: boolean;
  page: number;
}
export interface MovieSearchResult {
  Title: string;
  Year: string | undefined;
  Type: MovieTypes;
  Poster: string;
  imdbID: string;
}
export type MovieTypes = "movie" | "series" | "episode" | null;
