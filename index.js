"use strict";

const resultContainer = document.querySelector("#root");
let result = "no result";

/**
 * @class Calculations
 *
 * @description The class initiates an instance receiving an array of numbers
 * and has getters that return:
 * 1) the max number in the list;
 * 2) the min number in the list;
 * 3) median of the list;
 * 4) arithmetic average;
 * 5) the longest sequence of ascending numbers from the list;
 * 6) the longest sequence of descending numbers from the list.
 *
 * @param {Array} numbers - The list of received numbers
 * @returns {Object} The object with six fields of discovered values.
 */
class Calculations {
  constructor(numbers) {
    this.numbers = numbers;
    this.inputWarning =
      numbers && numbers.length ? null : "No numbers provided";
  }

  get maxNumber() {
    return this.inputWarning || this.getMaxNumber();
  }

  get minNumber() {
    return this.inputWarning || this.getMinNumber();
  }

  get arithmeticAverage() {
    return this.inputWarning || this.getAverage();
  }

  get median() {
    return this.inputWarning || this.getMedian();
  }

  get longestAscendingSequence() {
    return this.inputWarning || this.getLongestAscendingSequence();
  }

  get longestDescendingSequence() {
    return this.inputWarning || this.getLongestDescendingSequence();
  }

  get allCalculations() {
    return this.inputWarning || this.getAll();
  }

  getMaxNumber() {
    let max = this.numbers[0];

    this.numbers.forEach((num) => {
      if (num > max) {
        max = num;
      }
    });

    return max;
  }

  getMinNumber() {
    let min = this.numbers[0];

    this.numbers.forEach((num) => {
      if (num < min) {
        min = num;
      }
    });

    return min;
  }

  getAverage() {
    const sum = this.numbers.reduce((acca, num) => (acca += num), 0);

    return (sum / this.numbers.length).toFixed(2);
  }

  getMedian() {
    const arrCopy = [...this.numbers];
    const sortedArr = arrCopy.sort((a, b) => a - b);

    return sortedArr.length % 2 === 0
      ? (sortedArr[sortedArr.length / 2 - 1] +
          sortedArr[sortedArr.length / 2]) *
          0.5
      : sortedArr[Math.floor(sortedArr.length / 2)];
  }

  getLongestAscendingSequence() {
    let longestSequence = [this.numbers[0]];
    let currentSequence = [this.numbers[0]];

    this.numbers.forEach((num, i) => {
      if (i === 0) return;

      if (num > currentSequence[currentSequence.length - 1]) {
        currentSequence.push(num);
      } else {
        currentSequence = [num];
      }

      longestSequence =
        longestSequence.length < currentSequence.length
          ? currentSequence
          : longestSequence;
    });

    return longestSequence;
  }

  getLongestDescendingSequence() {
    let longestSequence = [this.numbers[0]];
    let currentSequence = [this.numbers[0]];

    this.numbers.forEach((num, i) => {
      if (i === 0) return;

      if (num < currentSequence[currentSequence.length - 1]) {
        currentSequence.push(num);
      } else {
        currentSequence = [num];
      }

      longestSequence =
        longestSequence.length < currentSequence.length
          ? currentSequence
          : longestSequence;
    });

    return longestSequence;
  }

  getAll() {
    return {
      minNumber: this.getMaxNumber(),
      maxNumber: this.getMinNumber(),
      arithmeticAverage: this.getAverage(),
      median: this.getMedian(),
      longestAscendingSequence: this.getLongestAscendingSequence(),
      longestDescendingSequence: this.getLongestDescendingSequence(),
    };
  }
}

const numbers = [1, 2, -1, -1, 0, 1, 6, 1, 0, -1];

result = new Calculations(numbers);

resultContainer.innerHTML = `The max number is ${result.maxNumber} <br>
  The min number is ${result.minNumber} <br>
  The median is ${result.median} <br>
  The arithmetic average is ${result.arithmeticAverage} <br>
  The longest ascending sequence is ${result.longestAscendingSequence.join(
    ", "
  )} <br>
  The longest descending sequence is ${result.longestDescendingSequence.join(
    ", "
  )}`;
