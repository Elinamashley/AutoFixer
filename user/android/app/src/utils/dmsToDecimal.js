export function dmsToDecimal(degrees, minutes, seconds, direction) {
    let decimal = degrees + minutes / 60 + seconds / 3600;
  
    // If the direction is south (S) or west (W), make the result negative
    if (direction === 'S' || direction === 'W') {
        decimal *= -1;
    }
  
    return decimal;
  }