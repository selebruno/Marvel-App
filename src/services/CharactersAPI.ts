import { CharacterApiEndpoints } from "../constants/api";
import axios, { AxiosResponse } from "axios";
import md5 from "md5";

class CharactersAPI {
  private apiKey: string;
  private privateKey: string;
  private axios = axios.create({
    baseURL: "https://gateway.marvel.com:443/v1/public",
  });

  constructor() {
    this.apiKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY || '';
    this.privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY || '';
  }

  private generateHash = (ts: number): string => {
    const hashInput = `${ts}${this.privateKey}${this.apiKey}`;
    return md5(hashInput);
  };

private buildUrl = (endpoint: string, params: Record<string, unknown>): string => {
  const ts = Date.now();
  const hash = this.generateHash(ts);

  const defaultParams = {
    apikey: this.apiKey,
    ts: ts.toString(),
    hash: hash,
  };

  const searchParams = new URLSearchParams({
    ...defaultParams,
    ...params,
  });

  return `${endpoint}?${searchParams.toString()}`;
};


 public getCharacters = (): Promise<AxiosResponse<CharactersDataWrapper>> => {
  const url = this.buildUrl(CharacterApiEndpoints.GET_CHARACTERS, {
    limit: 50, 
  });

  const headers = {
    Accept: "application/json",
  };

  return this.axios.get<CharactersDataWrapper>(url, { headers });
};


  public getCharacter = (characterId: number): Promise<AxiosResponse<CharacterDataWrapper>> => {
    const url = this.buildUrl(`${CharacterApiEndpoints.GET_CHARACTERS}/${characterId}`, {
    });

    const headers = {
      Accept: "application/json",
    };

    return this.axios.get<CharacterDataWrapper>(url, { headers });
  };

    public getComic = (comicUri: string): Promise<AxiosResponse<ComicDataWrapper>> => {
    const url = this.buildUrl(`${comicUri}`, {
    });

    const headers = {
      Accept: "application/json",
    };

    return this.axios.get<ComicDataWrapper>(url, { headers });
  };
}

export default CharactersAPI;
