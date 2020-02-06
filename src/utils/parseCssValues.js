export function hasCalc(value) {
  return value.toLowerCase().indexOf('calc(') >= 0;
}

export function hasPercents(value) {
  return /%$/.test(value);
}

export function hasPx(value) {
  return /px$/.test(value);
}

function getCalcStatement(rule) {
  if (!rule) return '';
  const pattern = /calc\(([^)]+)\).*/;
  const match = pattern.exec(rule);
  return match && match.length > 1 ? match[1] : '';
}

/** Dissolves the value and unit of the element and
 *  returns either the operator or an object with "value" and "unit" properties.
 */
const dissolveElement = (val) => {
  // Check if the value is an operator.
  const ops = '+-*/';
  if (ops.indexOf(val) >= 0) return val;

  let o = {};
  // CSS units in a calc statement can have all the regular units.
  // According to W3C; they can also, can include a "vw" unit (stands for viewport).
  const pattern = /(]?[0-9]+)(%|px|pt|em|in|cm|mm|ex|pc|vw)?/;
  // Exec the value/unit pattern on the property value.
  const match = pattern.exec(val);
  // So we reset to the original value if there is no unit.
  if (match) {
    const v = match.length >= 2 ? match[1] : match[0];
    o.value = toFloat(v); //parse value as float
    o.units = match.length >= 3 ? match[2] : '';
  } else {
    o = { value: val, units: '' };
  }
  return o;
}


/** Splits the calc operation's elements (values and operators) and
 *  dissolves the values into objects with value and unit properties.
 */
function dissolveCalcElements(statement) {
  // The CSS calc() function supports 4 basic math ope
  //
  // rations only:
  // Addition (+), Subtraction (-), Multiplication (*), Division (/)
  // White-spaces are very important in a calc statement.
  // From Mozilla: "The + and - operators must always be surrounded by whitespace.
  // The * and / operators do not require whitespace, but adding it for consistency is allowed, and recommended."
  // We could use: statement.split(/(\s+[\+\-]\s+|\s*[\*\/]\s*)/);
  // to include the operators inside the output array, but not all browsers
  // support splicing the capturing parentheses into the array like that. So:
  statement = statement.replace('*', ' * ').replace('/', ' / ');
  const arr = statement.split(/\s+/);

  const calcElems = [];
  for (let i = 0; i < arr.length; i++) {
    const d = dissolveElement(arr[i]);
    calcElems.push(d);
  }
  return calcElems;
}

// Helper Functions
const toFloat = value => parseFloat(value) || 0.0;

export function parseCalc(calcString) {
  const statement = getCalcStatement(calcString);

  return dissolveCalcElements(statement);
}

export function parseConfig(inputConfig) {
  let responseConfig = [];

  inputConfig.forEach((position) => {
    let coordinate = {};

    position.split(', ').forEach((item, index) => {
      let parsedValue = {};

      if (hasCalc(item)) {
        parsedValue = parseCalc(item);
      }
      else if (hasPercents(item)) {
        parsedValue = {
          value: parseInt(item, 10),
          units: '%',
        };
      }
      else if (hasPx(item)) {
        parsedValue = {
          value: parseInt(item, 10),
          units: 'px',
        };
      }
      else {
        parsedValue = {
          value: parseInt(item, 10),
          units: 'px',
        };
      }

      if (index === 0) {
        coordinate.x = parsedValue;
      }
      else if (index === 1) {
        coordinate.y = parsedValue;
      }
    });

    responseConfig.push(coordinate);
  })

  return responseConfig
}
