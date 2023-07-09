export function checkIsActive(pathName: string, routerPathName: string) {
  if (pathName === routerPathName) {
    return true;
  }
  return false;
}
