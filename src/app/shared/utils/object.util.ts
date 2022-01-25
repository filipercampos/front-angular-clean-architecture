export class ObjectUtil {
  /**
   * Extract key and value
   * @param {any} o
   * @returns
   */
  toArrayMap(o: any) {
    const maps = [];
    for (const [key, value] of Object.entries(o)) {
      console.log(`${key}: ${value}`);
      maps.push({ key, value });
    }
    return maps;
  }

  /**
   * Extract key and value from object
   * @param {any} o
   * @returns
   */
  toMap(o: any) {
    const map = new Map<string, any>();
    for (const [key, value] of Object.entries(o)) {
      console.log(`${key}: ${value}`);
      map.set(key, value);
    }
    return map;
  }
}
