import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

export const RenderComponent = () => {
  const { name } = useParams();

  // Use React.lazy to dynamically import the component
  const DynamicComponent = lazy(() => import(`./topics/${name}/Learn`));

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
    </div>
  );
};
