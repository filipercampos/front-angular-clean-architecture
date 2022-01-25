export abstract class Mapper<O extends any, E> {
  abstract fromJson(param: O): E;

  abstract mapTo(param: O): E;
}
