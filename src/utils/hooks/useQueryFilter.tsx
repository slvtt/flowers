import { useRouter } from 'next/router';
import { isStringQuery } from 'src/utils/helpers/isStringQuery';
import { omitFromObject } from 'src/utils/helpers/transformObject';


export const useQueryFilter = (queryName: string): [string, (event: any) => void] => {
  const router = useRouter();
  const queryValue = router.query[queryName];
  const stringQueryValue = isStringQuery(queryValue) ? queryValue : '';

    //set your event if it needed
  const onChangeFilter = (event: any) => {
    const value = event.target.value as string;
    const routerQuery =
      value === 'null'
        ? omitFromObject(router.query, [queryName])
        : { ...router.query, [queryName]: value, page: undefined };

    router.push({
      query: routerQuery
    });
  };

  return [stringQueryValue, onChangeFilter];
};
