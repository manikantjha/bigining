export function checkIsActive(pathName: string, routerPathName: string) {
  const pageName = pathName.split("/")[1];
  const pattern = new RegExp(`^\/${pageName}(\/.*)?$`);
  const result = pattern.test(routerPathName);

  if (result) {
    return true;
  }

  return false;
}
