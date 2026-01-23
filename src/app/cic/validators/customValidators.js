"use strict";

/**
 * Submit-time length check that does NOT generate an HTML maxlength attribute.
 * Return true when valid- false when invalid (HMPO will attach an error).
 */
function nameMaxLength(value, length) {
  if (value === undefined || value === null) return true;

  const str = String(value).trim();
  if (str.length === 0) return true;

  const max = Number(length);
  return str.length <= max;
}

module.exports = {
  nameMaxLength,
};
