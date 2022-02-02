export abstract class Mapper<T> {
  abstract fromJson(param: any): T;
}
