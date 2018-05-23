const pug = require('pug');
describe("RomanNumerals", function () {
  it("converts numbers to Roman numerals", function () {
    var romanNumerals = require("../src/romanNumerals");

    expect(romanNumerals.fromNumber(1)).toBe("I");
    expect(romanNumerals.fromNumber(2)).toBe("II");
    expect(romanNumerals.fromNumber(3)).toBe("III");
    expect(romanNumerals.fromNumber(4)).toBe("IV");
    expect(romanNumerals.fromNumber(2648)).toBe("MMDCXLVIII");
  });
});