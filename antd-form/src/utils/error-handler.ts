import type { ResponseError } from "umi-request";

export default function errorHandler(error: ResponseError) {
  throw error;
}
