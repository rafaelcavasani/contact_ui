import _ from "lodash";

export function mapEmptyValueToNull(object) {
  if (object) {
    return Object.keys(object)
      .map((key) => (object[key] === "" ? null : object[key]))
      .sort();
  }

  return object;
}

export function compareStates(original, modified) {
  return _.isEqual(
    mapEmptyValueToNull(original),
    mapEmptyValueToNull(modified)
  );
}
