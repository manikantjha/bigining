export function checkIsActive(pathName: string, routerPathName: string) {
  if (routerPathName.includes(pathName.split("/")[1])) {
    return true;
  }
  return false;
}
