import {
  Element,
  HTMLDocument,
} from 'https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts';
import parser from '../../../utils/parser.ts';

const chapterSynopsis = (document: HTMLDocument) => {
  const synopsis = document.querySelector('.entry-content-single > p');

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
  ] = document?.querySelectorAll('.spe > span') as unknown as Element[];

  return {
    title: title.lastChild.textContent.trim(),
    status: status.lastChild.textContent.trim(),
    author: author.lastChild.textContent,
    illustrator: illustrator.lastChild.textContent,
    grafic: grafic.lastChild.textContent,
    genre: genre.textContent.replace('Tema: ', '').split(', '),
    type: type.lastChild.textContent,
    reader: reader.lastChild.textContent.trim(),
  };
};

export const chaptersList = (document: HTMLDocument) => {
  const chapters = document.querySelectorAll(
    '#chapter_list > ul > li'
  ) as unknown as Element[];

  const chaptersList: { name: string; episode: string; date: string }[] = [];
  chapters.forEach((chapter) => {
    const name = chapter.querySelector('.lchx');
    const data = chapter.querySelector('.dt');

    chaptersList.push({
      name: name?.textContent || '',
      episode: data?.firstElementChild?.getAttribute('href') || '',
      date: data?.textContent || '',
    });
  });

  return chaptersList;
};

export const mangaChaptersData = async (url: string) => {
  const document = (await parser(url)) as HTMLDocument;

  const details = chaptersDetails(document);
  const synopsis = chapterSynopsis(document);
  const chapter = chaptersList(document);
  const image = document
    .querySelector('.thumb > img:nth-child(1)')
    ?.getAttribute('src');

  return {
    chapter_details: details,
    synopsis: synopsis,
    chapter_list: chapter,
    image: image,
  };
};
