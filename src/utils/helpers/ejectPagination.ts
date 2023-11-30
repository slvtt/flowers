import { PaginationResponse } from "src/types/types";

export const ejectPagination = (data: PaginationResponse) => {
  const { totalElements, number, numberOfElements, totalPages, last, size } =
    data;

  return { totalElements, number, numberOfElements, totalPages, last, size };
};
