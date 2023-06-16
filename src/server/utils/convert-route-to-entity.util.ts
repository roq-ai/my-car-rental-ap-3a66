const mapping: Record<string, string> = {
  cars: 'car',
  rentals: 'rental',
  'rental-agencies': 'rental_agency',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
