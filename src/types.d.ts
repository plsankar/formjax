import { z } from "zod";
import { fieldsSchema } from "./app/api/submit/utils";
import { Form, Submission, Tag } from "@prisma/client";

type Fields = z.infer<typeof fieldsSchema> & {
    [key: string]: any;
};

type ParsedRequest = {
    contentType: string;
    fields: Fields;
};

type ParsedRequestResponse = [ParsedRequest, null] | [null, string];

type Errorable<T, E> = [T, null] | [null, E];

type NetworkErroable<T, E> =
    | {
          success: true;
          message: string;
          data: T;
      }
    | {
          success: false;
          message: string;
          error: E;
      };

type PassableError<T> = {
    data: T;
    type: string;
    message: string;
};

type FormWithRelations = Form & {
    submissions: Submission[];
    tags: Tag[];
};
