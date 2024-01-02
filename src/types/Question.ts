import { Option } from "./Option"
export type Question = {
  title: JSX.Element,
  question: JSX.Element,
  ans?: any,
  type: 'mc' | 'math',
  nextToInput?: JSX.Element,
  hints: JSX.Element[],
  input?: Array<Option>
} 