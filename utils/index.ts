export function calcular(value1: number, value2: number, type: string) {
  let result = 0;
  switch (type) {
    case "add":
      result = parseInt(value1.toString()) + parseInt(value2.toString());
      break;
    case "multiply":
      result = parseInt(value1.toString()) * parseInt(value2.toString());
      break;
    case "substraction":
      result = parseInt(value1.toString()) - parseInt(value2.toString());
      break;
    case "division":
      result = parseInt(value1.toString()) / parseInt(value2.toString());
      break;
  }
  return result;
}
