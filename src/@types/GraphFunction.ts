export type GraphFunction = {
  f: Function,
  min: number,
  max: number,
  includeLeft: boolean,
  includeRight: boolean,
  leftArrow: boolean,
  rightArrow: boolean,
  classes: string,
  leftCircle: boolean,
  rightCircle: boolean,
  type?: string,
  dataGap?: number
}
