import {
  Element,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { BASE_URL, QUERY_REGEX_URL } from "../../../constants/index.ts";
import parser from "../../../utils/parser.ts";
import { PopularsList } from "./types.ts";

const popularTheDay = (document: HTMLDocument) => {
  const populars = document.querySelectorAll(
    ".mangapopuler > .customslider > .odadingslider > .animepost"
  ) as unknown as Element[];

  const popularsList: PopularsList[] = [];
  populars.forEach((popular) => {
    const title = popular.querySelector(".tt > h4");
    const chapter = popular.querySelector(".lsch > a");
    const date = popular.querySelector(".lsch > .datech");
    const url = popular.querySelector("a")?.getAttribute("href");
    const image = popular
      .querySelector("img")
      ?.getAttribute("src")
      ?.replace(QUERY_REGEX_URL, "");

    popularsList.push({
      title: title?.textContent || "",
      chapter: chapter?.textContent.replace("Ch. ", "") || "",
      date: date?.textContent || "",
      url: url?.replace(BASE_URL, "") || "",
      image: image || "",
    });
  });

  return popularsList;
};

export const mangaHomeData = async (url: string) => {
  const document = (await parser(url)) as HTMLDocument;

  const popularDay = popularTheDay(document);

  return {
    popular_the_day: popularDay,
  };
};
