import { SafeAny } from "@/toolkit/types";

export type Field<K extends string =string,V=SafeAny> = {
  name: K;
  title: string;
  type?: any;
  subType?: string;
  required?: boolean;
  defaultValue?: V;
  searchable?: boolean;
  displayable?: boolean;
  modifiable?: boolean;
  render?: (filed: any, context?: any) => React.ReactNode;
  select?: {
    options: {
      value: V;
      label?: string;
      render?: (any, number?) => React.ReactNode;
    }[];
  };
  compute?: (record?: any) => any;
  placeholder?: string;
};

export type TableInfo = {
  primaryKey: string;
  description?: any;
  name: string;
  title: string;
  fields: Field[];
};
