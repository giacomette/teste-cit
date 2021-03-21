import { isAfter, isBefore, getInstanceDate } from "../date";

describe("#helpers", () => {
  describe("isAfter()", () => {
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

  describe("isBefore()", () => {
    test("Deve retornar verdadeiro caso a primeira data seja menor que a segunda data", () => {
      const firstDate = "2019-11-09 12:00:00";
      const secondDate = "2019-11-10 12:00:00";

      const result = isBefore(firstDate, secondDate);

      expect(result).toBe(true);
    });

    test("Deve retornar falso caso a primeira data seja maior que a segunda data", () => {
      const firstDate = "2019-11-12 12:00:00";
      const secondDate = "2019-11-11 12:00:00";

      const result = isBefore(firstDate, secondDate);

      expect(result).toBe(false);
    });

    test("Deve retornar falso caso a primeira data seja igual a segunda data", () => {
      const firstDate = "2019-11-11 12:00:00";
      const secondDate = "2019-11-11 12:00:00";

      const result = isBefore(firstDate, secondDate);

      expect(result).toBe(false);
    });
  });

  describe("getInstanceDate()", () => {
    test("Deve converter uma data em formato de string para uma instancia de Date", () => {
      const dateString = "2020-20-20 10:00:00";

      const result = getInstanceDate(dateString);

      expect(result).toBeInstanceOf(Date);
    });

    test("Não deve converter uma data em uma instancia de Date se for passada invalida", () => {
      const dateString = "";

      const result = getInstanceDate(dateString);

      expect(result).not.toBeInstanceOf(Date);
    });
  });
});
