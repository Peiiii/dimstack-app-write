export type Field = {
  name: string;
  title: string;
  type?: any;
  subType?: string;
  required?: boolean;
  defaultValue?: any;
  searchable?: boolean;
  displayable?: boolean;
  modifiable?: boolean;
  render?: (filed: any, context?: any) => React.ReactNode;
  select?: {
    options: {
      value: any;
      label?: string;
      render?: (any, number?) => React.ReactNode;
    }[];
  };
  compute?: (record?: any) => any;
};

export type TableInfo = {
  primaryKey: string;
  description?: any;
  name: string;
  title: string;
  fields: Field[];
};
