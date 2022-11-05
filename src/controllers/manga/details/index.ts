import { Context } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { mangaDetailsData } from '../../../services/manga/details/index.ts';

export const mangaDetails = async (context: Context) => {
  const body = await context.request.body().value;
  const data = await mangaDetailsData(body.url);

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
