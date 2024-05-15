export function uniqueBy<T>(fieldName: keyof T, array: T[]): T[] {
    const uniqueMap = new Map<T[keyof T], boolean>();
    const uniqueArray: T[] = [];
  
    array.forEach(item => {
      const key = item?.[fieldName] || null;
      if (!key) return false;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, true);
        uniqueArray.push(item);
      }
    });
  
    return uniqueArray;
  }