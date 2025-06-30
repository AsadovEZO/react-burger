export function getOrderDetailsPath(currentPath: string, number: number): string {
  if (currentPath.startsWith("/profile/orders")) {
    return `/profile/orders/${number}`;
  }
  return `/feed/${number}`;
}