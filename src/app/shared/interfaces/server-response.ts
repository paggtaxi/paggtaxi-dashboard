export interface IServerResponseList {
  count: number;
  next: string;
  previous: string;
  results: Array<Object>;
}

export interface IServerResponseIdName {
  id: number;
  name: string;
}

export interface INgSelectData {
  id: number;
  text: string;
}

export interface ISelect2SelectedData {
  value: string|number;
}
