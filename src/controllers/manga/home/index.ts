import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { BASE_URL } from "../../../constants/index.ts";
import { mangaHomeData } from "../../../services/manga/home/index.ts";

export const mangaHome = async (context: Context) => {
  const data = await mangaHomeData(BASE_URL);

  if (data) {
    context.response.body = {
      data: data,
    };
    context.response.status = 200;
  } else {
    context.response.body = {
      message: "error",
    };
    context.response.status = 400;
  }
};
