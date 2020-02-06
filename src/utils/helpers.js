const convertToPx = (value, units, size) => {
    if (units === 'px') {
        return value;
    }
    else if (units === '%') {
        return size / 100 * value;
    }
}

const convertCalcToPx = (calc, size) => {
    const elementOne = convertToPx(calc[0].value, calc[0].units, size);
    const elementTwo = convertToPx(calc[2].value, calc[2].units, size);

    if (calc[1] === '+') {
      return elementOne + elementTwo
    }
    else if (calc[1] === '-') {
        return elementOne - elementTwo
    }
    else if (calc[1] === '/') {
        return elementOne / elementTwo
    }
    else if (calc[1] === '*') {
        return elementOne * elementTwo
    }
}


export default {
  getPolylinePoints: ({parsedConfig, elementSize, strokeWidth}) => {
    let points = '';


      parsedConfig.forEach(function (item) {
        let x = 0;
        let y = 0;

        if (item.x.hasOwnProperty('value')) {
            x = convertToPx(item.x.value, item.x.units, elementSize.width);
        }

        else {
            x = convertCalcToPx(item.x, elementSize.width);
        }

        if (item.y.hasOwnProperty('value')) {
            y = convertToPx(item.y.value, item.y.units, elementSize.height);
        }

        else {
            y = convertCalcToPx(item.y, elementSize.height);
        }
        points += x + ", " + y + " "
    });


    return points;
  }
}