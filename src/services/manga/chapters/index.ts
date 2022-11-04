import {
  Element,
  HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { BASE_URL, QUERY_REGEX_URL } from "../../../constants/index.ts";
import parser from "../../../utils/parser.ts";

const TITLE = "Judul Alternatif: ";
const STATUS = "Status: ";
const AUTHOR = "Pengarang: ";
const ILLUSTRATOR = "Ilustrator: ";
const GRAPHIC = "Grafis: ";
const GENRE = "Tema: ";
const TYPE = "Jenis Komik: ";
const READER = "Jumlah Pembaca: ";

const chaptersImage = (document: HTMLDocument) => {
  const image = document.querySelector(".thumb > img");

  return image?.getAttribute("src")?.replace(QUERY_REGEX_URL, "");
};

const chaptersSynopsis = (document: HTMLDocument) => {
  const synopsis = document.querySelector(".entry-content-single > p");

  return synopsis?.textContent.trim();
};

const chaptersSpoilers = (document: HTMLDocument) => {
  const spoilers = document.querySelectorAll(
    ".spoiler-img > img"
  ) as unknown as Element[];

  const spoilerImage: string[] = [];
  spoilers.forEach((spoiler) => {
    const data = spoiler.getAttribute("src")?.replace(QUERY_REGEX_URL, "");

    spoilerImage.push(data as string);
  });

  return spoilerImage;
};

const chaptersDetails = (document: HTMLDocument) => {
  const chapters = document?.querySelectorAll(
    ".spe > span"
  ) as unknown as Element[];

  const details = {
    title: "",
    status: "",
    author: "",
    illustrator: "",
    graphic: "",
    genre: [""],
    type: "",
    reader: "",
  };
  chapters.forEach((chapter) => {
    const isTitle = chapter.textContent.includes(TITLE);
    const isStatus = chapter.textContent.includes(STATUS);
    const isAuthor = chapter.textContent.includes(AUTHOR);
    const isIllustrator = chapter.textContent.includes(ILLUSTRATOR);
    const isGraphic = chapter.textContent.includes(GRAPHIC);
    const isGenre = chapter.textContent.includes(GENRE);
    const isType = chapter.textContent.includes(TYPE);
    const isReader = chapter.textContent.includes(READER);

    if (isTitle) {
      details.title = chapter.textContent.replace(TITLE, "");
    }
    if (isStatus) {
      details.status = chapter.textContent.replace(STATUS, "");
    }
    if (isAuthor) {
      details.author = chapter.textContent.replace(AUTHOR, "");
    }
    if (isIllustrator) {
      details.illustrator = chapter.textContent.replace(ILLUSTRATOR, "");
    }
    if (isGraphic) {
      details.graphic = chapter.textContent.replace(GRAPHIC, "");
    }
    if (isGenre) {
      details.genre = chapter.textContent.replace(GENRE, "").split(", ");
    }
    if (isType) {
      details.type = chapter.textContent.replace(TYPE, "");
    }
    if (isReader) {
      details.reader = chapter.textContent.replace(READER, "");
    }
  });

  return details;
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
      ?.replace(BASE_URL, "");

    chaptersList.push({
      name: name?.textContent || "",
      episode: episode || "",
      date: data?.textContent || "",
    });
  });

  return chaptersList;
};

export const mangaChaptersData = async (url: string) => {
  const document = (await parser(BASE_URL + url)) as HTMLDocument;

  const details = chaptersDetails(document);
  const synopsis = chaptersSynopsis(document);
  const spoilers = chaptersSpoilers(document);
  const chapter = chaptersList(document);
  const image = chaptersImage(document);

  return {
    chapter_details: details,
    synopsis: synopsis,
    spoilers: spoilers,
    chapter_list: chapter,
    image: image,
  };
};
