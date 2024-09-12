const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];

export const returnDeck = function () {

  const deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      const card = {
        suit: suit,
        rank: rank,
        flip: false
      };
      deck.push(card);
    }
  }
  return deck;
}

export const generateRandom = function (num) {
  return Math.floor(Math.random() * num);
}

export const generateRandomHand = function (num, cb, cbTwo) {
  const tempCards = [];
  let deck = returnDeck();
  for (let i = 0; i < num; i++) {
    const card = deck[cbTwo(deck.length)];
    if (num === 14) {
      if (i === 0 || i === 4) {
        card.flip = true;
      }
    }
    tempCards.push(card);
    deck = deck.filter((ele) => ele.suit !== card.suit || ele.rank !== card.rank);
    cb(deck);
  }
  return tempCards;
}

export const generateRandomNumber = function (num) {
  return Math.ceil(Math.random() * num);
}

export const generateRandomNumberTwo = function (num) {
  return Math.floor(Math.random() * num);
}

export const findIndex = function (rank) {
  for (let i = 0; i < ranks.length; i++) {
    if (ranks[i] === rank) {
      return i;
    }
  }
}

export const generateRandomChips = function (cardOne, cardTwo, currentArray) {
  let newNumber = 0;
  let variable;

  if (cardOne.suit === cardTwo.suit) {
    newNumber += 80;
  }

  if (cardOne.rank === ranks[findIndex(cardOne.rank) - 1] || cardOne.rank === ranks[findIndex(cardTwo.rank) + 1]) {
    newNumber > 79 ? newNumber += 15 : newNumber += 80;
  }

  if (cardOne.rank === cardTwo.rank) {
    newNumber > 94 ? newNumber += 4 : newNumber > 79 ? newNumber += 15 : newNumber += 80;
  }

  if (newNumber === 0) {
    const randomNumber = generateRandomNumber(100);
    if (randomNumber < 6) {
      variable = 'fold';
    } else if (randomNumber < 40) {
      variable = 'buy';
    } else if (randomNumber < 90) {
      variable = 'call';
    } else {
      variable = 'raise';
    }
  } else if (newNumber === 80) {
    const randomNumberTwo = generateRandomNumber(100);
    if (randomNumberTwo < 41) {
      variable = 'buy';
    } else if (randomNumberTwo < 71) {
      variable = 'call';
    } else {
      variable = 'raise';
    }
  } else if (newNumber === 95) {
    const randomNumberThree = generateRandomNumber(100);
    if (randomNumberThree < 76) {
      variable = 'call';
    } else {
      variable = 'raise';
    }
  }

  if (variable === 'raise') {
    const index = generateRandom(currentArray.length);
    const indexTwo = generateRandom(currentArray.length);
    const newArray = [...currentArray, currentArray[index], currentArray[indexTwo]];
    return newArray;
  } else if (variable === 'call') {
    return currentArray;
  }
  return variable;
}

export const addOne = function (setState, state, obj) {
  let newState = state + 1;
  if (newState > 4) {
    newState = 1;
  }
  let myArray;
  if (newState === 1) {
    myArray = ['one', 'two', 'three', 'four'];
  } else if (newState === 2) {
    myArray = ['two', 'three', 'four', 'one'];
  } else if (newState === 3) {
    myArray = ['three', 'four', 'one', 'two'];
  } else if (newState === 4) {
    myArray = ['four', 'one', 'two', 'three'];
  }
  for (let ele of myArray) {
    if (!obj[ele]) {
      setState(newState);
      return;
    } else {
      newState += 1;
      if (newState > 4) {
        newState = 1;
      }
    }
  }
}

export const addOneCount = function (setState, state, folds, playerTurn) {
  let myArray;
  if (playerTurn === 1) {
    if (state === 1 || state === 5 || state === 9 || state === 13 || state === 17) {
      myArray = ['two', 'three', 'four'];
    } else if (state === 2 || state === 6 || state === 10 || state === 14 || state === 18) {
      myArray = ['three', 'four', 'one'];
    } else if (state === 3 || state === 7 || state === 11 || state === 15 || state === 19) {
      myArray = ['four', 'one', 'two'];
    } else if (state === 0 || state === 4 || state === 8 || state === 12 || state === 16 || state === 20) {
      myArray = ['one', 'two', 'three'];
    }
  } else if (playerTurn === 2) {
    if (state === 1 || state === 5 || state === 9 || state === 13 || state === 17) {
      myArray = ['three', 'four', 'one'];
    } else if (state === 2 || state === 6 || state === 10 || state === 14 || state === 18) {
      myArray = ['four', 'one', 'two'];
    } else if (state === 3 || state === 7 || state === 11 || state === 15 || state === 19) {
      myArray = ['one', 'two', 'three'];
    } else if (state === 0 || state === 4 || state === 8 || state === 12 || state === 16 || state === 20) {
      myArray = ['two', 'three', 'four'];
    } 
  } else if (playerTurn === 3) {
    if (state === 1 || state === 5 || state === 9 || state === 13 || state === 17) {
      myArray = ['four', 'one', 'two'];
    } else if (state === 2 || state === 6 || state === 10 || state === 14 || state === 18) {
      myArray = ['one', 'two', 'three'];
    } else if (state === 3 || state === 7 || state === 11 || state === 15 || state === 19) {
      myArray = ['two', 'three', 'four'];
    } else if (state === 0 || state === 4 || state === 8 || state === 12 || state === 16 || state === 20) {
      myArray = ['three', 'four', 'one'];
    }
  } else if (playerTurn === 4) {
    if (state === 1 || state === 5 || state === 9 || state === 13 || state === 17) {
      myArray = ['one', 'two', 'three'];
    } else if (state === 2 || state === 6 || state === 10 || state === 14 || state === 18) {
      myArray = ['two', 'three', 'four'];
    } else if (state === 3 || state === 7 || state === 11 || state === 15 || state === 19) {
      myArray = ['three', 'four', 'one'];
    } else if (state === 0 || state === 4 || state === 8 || state === 12 || state === 16 || state === 20) {
      myArray = ['four', 'one', 'two'];
    } 
  }
  let number = 1;
  for (let ele of myArray) {
    if (!folds[ele]) {
      setState(state + number);
      return;
    } else {
      number += 1;
    }
  }
}

export const generateRandomCard = function (deck, arr) {
  const number = generateRandomNumberTwo(deck.length);
  if (arr.includes(deck[number])) {
    return generateRandomCard(deck, arr);
  }
  return deck[number];
}

const sortCards = function (cards) {
  if (!cards) {
    return 2;
  }
  const array = [];
  for (let ele of ranks) {
    for (let i of cards) {
      if (i.rank === ele) {
        array.push(i);
      }
    }
  }
  return array;
}

// This object will consist of functions, 
// all of which take in an array of total 
// cards and return a boolean as to whether
// the key is true for the passed in cards

export const pokerHandRankings = {
  royalFlush: (array) => {
    const myRanks = [];
    const mySuits = [];
    for (let ele of array) {
      myRanks.push(ele.rank);
      mySuits.push(ele.suit);
    }
    if (myRanks.includes('ace') && myRanks.includes('king') && myRanks.includes('queen') && myRanks.includes('jack') && myRanks.includes(10)) {
      let mySuit = mySuits[0];
      for (let ele of mySuits) {
        if (ele !== mySuit) {
          return false;
        }
        return 11;
      }
    }
    return false;
  },
  straightFlush: (array) => {
    const newArray = sortCards(array);
    const myRanks = [];
    const mySuits = [];
    for (let ele of newArray) {
      myRanks.push(ele.rank);
      mySuits.push(ele.suit);
    }
    const first = mySuits[0];
    for (let ele of mySuits) {
      if (ele !== first) {
        return false;
      }
    }
    const rankIndex = ranks.indexOf(myRanks[0]);
    let myIndex = 1;
    for (let i = rankIndex + 1; i < rankIndex + 5; i++) {
      if (myRanks[myIndex] !== ranks[i]) {
        return false;
      }
      myIndex += 1;
    }
    return 10;
  },
  fourOfAKind: (array) => {
    let count = 0;
    for (let ele of array) {
      for (let i of array) {
        if (i.rank === ele.rank) {
          count += 1;
        }
      }
      if (count >= 4) {
        return 9;
      } else {
        count = 0;
      }
    }
    return false;
  },
  fullHouse: (array) => {
    let countArray = [];
    let first = 0;
    for (let ele of array) {
      for (let i of array) {
        if (i.rank === ele.rank) {
          first += 1;
        }
      }
      countArray.push(first)
      first = 0;
    }
    let two = false;
    let three = false;
    for (let ele of countArray) {
      if (ele >= 3) {
        three = true;
      } else if (ele >= 2) {
        two = true;
      }
    }
    return two && three ? 8 : false;
  },
  flush: (array) => {
    const numbersArray = [];
    let num = 0;
    for (let ele of suits) {
      for (let i of array) {
        if (i.suit === ele) {
          num += 1;
        }
      }
      numbersArray.push(num);
      num = 0;
    }
    for (let ele of numbersArray) {
      if (ele >= 5) {
        return 7;
      }
    }
    return false;
  },
  straight: (array) => {
    const newArray = sortCards(array);
    const myRanks = [];
    const mySuits = [];
    for (let ele of newArray) {
      myRanks.push(ele.rank);
      mySuits.push(ele.suit);
    }
    const rankIndex = ranks.indexOf(myRanks[0]);
    let myIndex = 1;
    for (let i = rankIndex + 1; i < rankIndex + 5; i++) {
      if (myRanks[myIndex] !== ranks[i]) {
        return false;
      }
      myIndex += 1;
    }
    return 6;
  },
  threeOfAKind: (array) => {
    let count = 0;
    for (let ele of array) {
      for (let i of array) {
        if (i.rank === ele.rank) {
          count += 1;
        }
      }
      if (count >= 3) {
        return 5;
      } else {
        count = 0;
      }
    }
    return false;
  },
  twoPair: (array) => {
    let countArray = [];
    let first = 0;
    for (let ele of array) {
      for (let i of array) {
        if (i.rank === ele.rank) {
          first += 1;
        }
      }
      countArray.push(first);
      first = 0;
    }
    let two = 0;
    for (let ele of countArray) {
      if (ele >= 2) {
        two += 1;
      }
    }
    return two >= 4 ? 4 : false;
  },
  onePair: (array) => {
    let countArray = [];
    let first = 0;
    for (let ele of array) {
      for (let i of array) {
        if (i.rank === ele.rank) {
          first += 1;
        }
      }
      countArray.push(first);
      first = 0;
    }
    for (let ele of countArray) {
      if (ele >= 2) {
        return 3;
      }
    }
    return false;
  },
  returnTwo: () => {
    return 2;
  }
}

////

export const generateRandomChipsTwo = function (array, currentArray) {
  let number;
  for (let key in pokerHandRankings) {
    const newNumber = pokerHandRankings[key](array);
    if (!number && newNumber) {
      number = newNumber;
    }
  }
  if (number >= 7) {
    const index = generateRandom(currentArray.length);
    const indexTwo = generateRandom(currentArray.length);
    const newArray = [...currentArray, currentArray[index], currentArray[indexTwo]];
    return newArray;
  } else if (number > 4) {
    return [...currentArray];
  } else {
    const myNewNumber = generateRandom(100);
    if (myNewNumber < 11) {
      return 'fold';
    } else {
      return [...currentArray];
    }
  }
}

const cards = [
  { suit: 'diamonds', rank: 3, flip: false },
  { suit: 'hearts', rank: 10, flip: false },
  { suit: 'hearts', rank: 10, flip: false },
  { suit: 'hearts', rank: 10, flip: false },
  { suit: 'spades', rank: 2, flip: false },
  { suit: 'clubs', rank: 8, flip: false }
];