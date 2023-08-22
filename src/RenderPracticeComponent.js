/**
 * Component that renders practice component with appropriate topic name
 */

import { useParams } from 'react-router-dom';
import { Practice } from "./components/Practice";

export const RenderPracticeComponent = () => {
  const { name } = useParams();


  return (
    <div>
      <Practice name={name} />
    </div>
  );
};