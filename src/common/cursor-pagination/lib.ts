export const getCursorPagination = <T extends Array<{ id: string }>>({
  items,
  limit,
}: {
  items: T;
  limit: number;
}) => {
  const hasNextPage = items.length > limit;

  const nextCursor = hasNextPage ? items[items.length - 1].id : null;
  const slicedData = items.slice(0, limit);

  return { data: slicedData as T, meta: { nextCursor, limit } };
};
