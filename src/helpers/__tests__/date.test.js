import { isAfter } from "../date";

describe("#utils date()", () => {
  test("Deve retornar verdadeiro caso a primeira data seja maior que a segunda data", () => {
    const firstDate = "2019-11-11 12:00:00";
    const secondDate = "2019-11-10 12:00:00";

    const result = isAfter(firstDate, secondDate);

    expect(result).toBe(true);
  });

  test("Deve retornar falso caso a primeira data seja menor que a segunda data", () => {
    const firstDate = "2019-11-10 12:00:00";
    const secondDate = "2019-11-11 12:00:00";

    const result = isAfter(firstDate, secondDate);

    expect(result).toBe(false);
  });

  test("Deve retornar falso caso a primeira data seja igual a segunda data", () => {
    const firstDate = "2019-11-11 12:00:00";
    const secondDate = "2019-11-11 12:00:00";

    const result = isAfter(firstDate, secondDate);

    expect(result).toBe(false);
  });
});
