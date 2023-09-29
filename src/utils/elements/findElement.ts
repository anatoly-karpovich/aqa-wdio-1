export async function findElement(selector: string) {
  const element = await $(selector);
  return element;
}
