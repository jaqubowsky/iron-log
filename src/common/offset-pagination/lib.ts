export const getOffsetPagination = <T>({
  items,
  total,
  page,
  limit,
}: {
  items: T[];
  total: number;
  page: number;
  limit: number;
}) => ({
  data: items,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  },
});
