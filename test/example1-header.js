module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, str) {
    var val = obj[prop];
    if ('function' == typeof val) return val.call(obj, str);
    if (negate) val = !val;
    if (val) return str;
    return '';
  };

  return "<li class=\"header\">\n  <ul>\n    <li style=\"width: 38%;\">Name</li>\n    <li style=\"width: 38%;\">Email</li>\n    <li style=\"width: 18%;\">Phone</li>\n  </ul>\n</li>\n"
}