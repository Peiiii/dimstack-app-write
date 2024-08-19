export const createCRUDActions = <T>(
  setData: (v: T[]) => void,
  getData: () => T[],
  primaryKey: string = "id"
) => {
  const add = (data, record, _update = false) => {
    if (data.find((rec) => rec[primaryKey] === record[primaryKey])) {
      if (_update) return update(data, record);
    } else {
      data.push(record);
      return data.slice();
    }
    return data;
  };
  const update = (data, record) => {
    const pValue = record[primaryKey];
    const oldRecord = data.find((record) => record[primaryKey] === pValue);
    if (oldRecord) {
      Object.assign(oldRecord, record);
    }
    return data.slice();
  };
  const remove = (data, id) => {
    const newData = data.filter((record) => record[primaryKey] !== id);
    return newData;
  };

  return {
    add: (record: T, _update = false) =>
      setData(add(getData(), record, _update)),
    update: (record: T) => setData(update(getData(), record)),
    delete: (id: string) => setData(remove(getData(), id)),
  };
};
