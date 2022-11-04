import {
  Element,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { API_URL } from "../../../constats/index.ts";
import parser from "../../../utils/parser.ts";

const chaptersImage = (document: HTMLDocument) => {
  const image = document.querySelector(".bigcover > img");

  return image?.getAttribute("src");
};

const chaptersSynopsis = (document: HTMLDocument) => {
  const synopsis = document.querySelector(".entry-content-single > p");

  return synopsis?.textContent.trim();
};

const chaptersDetails = (document: HTMLDocument) => {
  const [
    title,
    status,
    author,
    illustrator,
    grafic,
    genre,
    type,
    _official,
    _retail,
    _more,
    reader,
  ] = document?.querySelectorAll(".spe > span") as unknown as Element[];

  return {
    title: title.lastChild.textContent.trim(),
    status: status.lastChild.textContent.trim(),
    author: author.lastChild.textContent,
    illustrator: illustrator.lastChild.textContent,
    grafic: grafic.lastChild.textContent,
    genre: genre.textContent.replace("Tema: ", "").split(", "),
    type: type.lastChild.textContent,
    reader: reader.lastChild.textContent.trim(),
  };
};

export const chaptersList = (document: HTMLDocument) => {
  const chapters = document.querySelectorAll(
    "#chapter_list > ul > li"
  ) as unknown as Element[];

  const chaptersList: { name: string; episode: string; date: string }[] = [];
  chapters.forEach((chapter) => {
    const name = chapter.querySelector(".lchx");
    const data = chapter.querySelector(".dt");
    const episode = data?.firstElementChild
      ?.getAttribute("href")
      ?.replace(API_URL, "");

    chaptersList.push({
      name: name?.textContent || "",
      episode: episode || "",
      date: data?.textContent || "",
    });
  });

  return chaptersList;
};

export const mangaChaptersData = async (url: string) => {
  const document = (await parser(API_URL + url)) as HTMLDocument;

  const details = chaptersDetails(document);
  const synopsis = chaptersSynopsis(document);
  const chapter = chaptersList(document);
  const image = chaptersImage(document);

  return {
    chapter_details: details,
    synopsis: synopsis,
    chapter_list: chapter,
    image: image,
  };
};
