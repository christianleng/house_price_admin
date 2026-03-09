export function filtersFromParams(
  searchParams: URLSearchParams | URLSearchParams,
) {
  return {
    search: searchParams.get("search") ?? undefined,
    transactionType: searchParams.get("transactionType") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    energyRating: searchParams.get("energyRating") ?? undefined,
    priceMin: searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : undefined,
    priceMax: searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: 20,
  };
}
