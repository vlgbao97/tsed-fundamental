import { Res } from "@tsed/common";
import { Controller } from "@tsed/di";
import { QueryParams } from "@tsed/platform-params";
import { Get } from "@tsed/schema";
import Axios from "axios";
import { IncomingMessage } from "http";

@Controller("/axios")
export class AxiosController {
  // axios response has been wrap with express response
  @Get("/")
  get(@QueryParams("path") path: string) {
    return Axios.get(`https://google.com/search?q=${path}`, {
      responseType: "stream",
    });
  }

  // is equivalent to doing that
  @Get("/")
  async get2(
    @Res() res: Res,
    @QueryParams("path") path: string
  ): Promise<IncomingMessage> {
    const response = await Axios.get(
      `https://https://google.com/search?q=${path}`,
      {
        responseType: "stream",
      }
    );

    res.set(response.headers);
    res.status(response.status);

    return response.data;
  }
}
