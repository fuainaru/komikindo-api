import {
  DOMParser,
  HTMLDocument,
} from 'https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts';

const parser = async (url: string): Promise<HTMLDocument | null> => {
  try {
    const result = await fetch(url);
    const html = await result.text();
    const document = new DOMParser().parseFromString(html, 'text/html');

    return document;
  } catch (error) {
    return error;
  }
};

export default parser;
