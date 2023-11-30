import { useEffect, useState } from 'react';
import { Flower, getFlowers } from 'src/api/flowers/flowers';

export const useFlowers = () => {
  const [flowers, setFlowers] = useState<Array<Flower>>([]);
  const [loading, setLoading] = useState(false);

  const doRequest = () => {
    setLoading(true);
    getFlowers()
      .then(res => {
        setFlowers(res);
      })
      .finally(() => setLoading(false));
  };

  const refresh = () => doRequest();

  useEffect(() => {
    doRequest();
  }, []);

  return { loading, flowers, refresh };
};
