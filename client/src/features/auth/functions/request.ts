
export const request = async <T>(url: string, options: {
  method: string,
  headers?: any,
  body?: any,
}) => {
  const { method, ...option } = options;
  const response = await fetch(url, {
    method: method.toUpperCase(),
    ...option,
  });

  console.log('response', response);

  return await <T>response.json();
}