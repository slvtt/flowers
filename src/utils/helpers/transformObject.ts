const transform = (
  obj: Object,
  predicate: (value: string, key: string) => boolean
) => {
  return Object.keys(obj).reduce((memo, key) => {
    if (predicate(obj[key], key)) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
};

export const omitFromObject = (obj: Object, items: Array<string>) =>
  transform(obj, (value: string, key: string) => !items.includes(key));

export const pickFromObject = (obj: Object, items: Array<string>) =>
  transform(obj, (value: string, key: string) => items.includes(key));
