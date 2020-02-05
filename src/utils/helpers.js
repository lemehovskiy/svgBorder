export default {
  getPolylinePoints: (config) => {
    let points = '';


    config.forEach(function (item) {
      // points += settings.element_width / 100 * item[0] + ", " + settings.element_height / 100 * item[1] + " "
    });


    return points;
  }
}