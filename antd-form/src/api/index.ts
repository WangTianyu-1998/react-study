import { RequestOptionsInit } from "umi-request";
import request from "../utils/servers";

export const fetchData = (url: string, options: RequestOptionsInit) =>
  request(url, { method: "POST", ...options });

export const getTableListApi = () =>
  request("http://localhost:3000/api/getTableData", {
    method: "POST",
  });
