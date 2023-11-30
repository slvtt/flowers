import { useEffect, useState } from 'react';
import { Flower, getFlower } from 'src/api/flowers/flowers';

export const useFlower = (flowerId: string) => {
  const [flower, setFlower] = useState<Flower>();

  useEffect(() => {
    getFlower(flowerId)
      .then(res => setFlower(res))
      .catch(e => e);
  }, [flowerId]);

  return { flower };
};
