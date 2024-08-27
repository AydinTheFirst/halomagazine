import { fetcher, httpError } from "@/lib";
import useSWR, { SWRResponse } from "swr";

export const useHTTP = <T>(url: string): SWRResponse<T> => {
  return useSWR<T>(url, fetcher, {
    onError: (error) => {
      httpError(error);
    },
  });
};
