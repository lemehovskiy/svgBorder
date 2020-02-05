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

    console.log(calc[0]);
    console.log(calc[0].value);
    console.log(calc[0].units);
    console.log(size);

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
  getPolylinePoints: (config) => {
    let points = '';


    config.parsedConfig.forEach(function (item) {
        let x = 0;
        let y = 0;

        if (item.x.hasOwnProperty('value')) {
            x = convertToPx(item.x.value, item.x.units, config.elementSize.width);
        }

        else {
            x = convertCalcToPx(item.x, config.elementSize.width);
        }

        if (item.y.hasOwnProperty('value')) {
            y = convertToPx(item.y.value, item.y.units, config.elementSize.height);
        }

        else {
            y = convertCalcToPx(item.y, config.elementSize.height);
        }
        points += x + ", " + y + " "
    });


    return points;
  }
}