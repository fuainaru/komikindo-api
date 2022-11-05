import { Context } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { mangaChaptersData } from '../../../services/manga/chapters/index.ts';

export const mangaChapters = async (context: Context) => {
  const body = await context.request.body().value;
  const data = await mangaChaptersData(body.url);

  if (body && data) {
    context.response.body = {
      data: data,
    };
    context.response.status = 200;
  } else {
    context.response.body = {
      message: 'error',
    };
    context.response.status = 400;
  }
};

export default mangaChapters;
