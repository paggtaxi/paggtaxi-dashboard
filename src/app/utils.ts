export function isDefined(value: any): boolean {
  return typeof value !== 'undefined' && value !== null;
}

export function isEmptyObject(value: Object): boolean {
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function isEmpty(value: any): boolean {
  if (value instanceof Object) {
    try {
      return Object.keys(value).length === 0;
    } catch (e) {
      return isEmptyObject(value);
    }
  }
  if (value instanceof String) {
    return !value || value.length === 0;
  }
  if (value instanceof Array) {
    return value.length === 0;
  }
  throw new Error(`this methods expects a Object, Array o String instance, received a ${value.constructor.name}`)
}

export class FormHelper {

}