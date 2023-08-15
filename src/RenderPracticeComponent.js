import React, { lazy, Suspense } from "react";
import { useParams } from 'react-router-dom';

export const RenderPracticeComponent = () => {
  const { name } = useParams();

  const DynamicComponent = lazy(() => import(`./topics/${name}/Practice.js`));

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
    </div>
  );
};