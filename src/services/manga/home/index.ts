import {
  Element,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { BASE_URL, QUERY_REGEX_URL } from "../../../constants/index.ts";
import parser from "../../../utils/parser.ts";
import { ComicsProps } from "./types.ts";

const popularTheDay = (document: HTMLDocument) => {
  const populars = document.querySelectorAll(
    ".mangapopuler > .customslider > .odadingslider > .animepost"
  ) as unknown as Element[];

  const popularsList: ComicsProps[] = [];
  populars.forEach((popular) => {
    const title = popular.querySelector(".tt > h4");
    const chapter = popular.querySelector(".lsch > a");
    const date = popular.querySelector(".lsch > .datech");
    const url = popular.querySelector("a")?.getAttribute("href");
    const image = popular.querySelector("img")?.getAttribute("src");

    popularsList.push({
      title: title?.textContent || "",
      chapter: chapter?.textContent.replace("Ch. ", "") || "",
      date: date?.textContent || "",
      url: url?.replace(BASE_URL, "") || "",
      image: image?.replace(QUERY_REGEX_URL, "") || "",
    });
  });

  return popularsList;
};

const newComics = (document: HTMLDocument) => {
  const comics = document.querySelectorAll(
    ".latestupdate-v2 > .animepost"
  ) as unknown as Element[];

  const newComicsList: ComicsProps[] = [];
  comics.forEach((comic) => {
    const title = comic.querySelector(".tt > h4");
    const chapter = comic.querySelector(".lsch > a");
    const url = comic.querySelector("a")?.getAttribute("href");
    const image = comic.querySelector("img")?.getAttribute("src");

    newComicsList.push({
      title: title?.textContent || "",
      chapter: chapter?.textContent.replace("Ch. ", "") || "",
      url: url?.replace(BASE_URL, "") || "",
      image: image?.replace(QUERY_REGEX_URL, "") || "",
    });
  });

  return newComicsList;
};

export const mangaHomeData = async (url: string) => {
  const document = (await parser(url)) as HTMLDocument;

  const popularDay = popularTheDay(document);
  const comics = newComics(document);

  return {
    popular_the_day: popularDay,
    new_comics: comics,
  };
};
