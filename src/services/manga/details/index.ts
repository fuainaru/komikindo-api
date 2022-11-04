import {
  Element,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { BASE_URL } from "../../../constants/index.ts";
import parser from "../../../utils/parser.ts";

const imagesDetails = (document: HTMLDocument) => {
  const images = document?.querySelectorAll(
    "#chimg-auh > img"
  ) as unknown as Element[];

  const imagesList: string[] = [];
  images.forEach((image) => {
    const data = image.getAttribute("src");
    imagesList.push(data || "");
  });

  return imagesList;
};

const titleDetails = (document: HTMLDocument) => {
  const title = document?.querySelector(".entry-title");

  return title?.textContent;
};

const nextPrevChapter = (document: HTMLDocument) => {
  const chapters = document?.querySelectorAll(
    ".nextprev > a"
  ) as unknown as Element[];

  const chaptersData = {
    next: "",
    previous: "",
  };
  chapters.forEach((chapter) => {
    const link = chapter.getAttribute("href")?.replace(BASE_URL, "");
    const rel = chapter.getAttribute("rel");

    if (rel === "next") {
      chaptersData.next = link || "";
    }
    if (rel === "prev") {
      chaptersData.previous = link || "";
    }
  });

  return chaptersData;
};

export const mangaDetailsData = async (url: string) => {
  const document = (await parser(BASE_URL + url)) as HTMLDocument;

  const title = titleDetails(document);
  const chapter = nextPrevChapter(document);
  const images = imagesDetails(document);

  return {
    title: title,
    chapter: chapter,
    images_list: images,
  };
};
