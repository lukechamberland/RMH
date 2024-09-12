import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from "./Card";
import anime from "animejs";
import {
  returnDeck,
  generateRandom,
  generateRandomNumber,
  generateRandomHand,
  generateRandomChips,
  addOne,
  generateRandomCard,
  pokerHandRankings,
  generateRandomChipsTwo,
  generateRandomNumberTwo,
  addOneCount
} from "../helpers";
import Chip from "./Chip";
import blackChip from '../images/Black_Chip.jpg';
import whiteChip from '../images/White_Chip.jpg';
import blueChip from '../images/Blue_Chip.png';
import redChip from '../images/Red_Chip.jpg';
import greenChip from '../images/Green_Chip.jpg';

export default function Background(props) {

  const { newState, setNewState } = props;

  const [cards, setCards] = useState([{ suit: 'hearts', rank: 5, flip: false }]);
  const [firstDeal, setFirstDeal] = useState(false);
  const [nextThree, setNextThree] = useState(false);
  const [deck, setDeck] = useState(returnDeck());
  const [numbersState, setNumbersState] = useState(JSON.parse(localStorage.getItem('myChips')) || {
    white: 20,
    red: 15,
    blue: 10,
    green: 10,
    black: 5
  });
  const [moveChipState, setMoveChipState] = useState([]);
  const [chipCount, setChipCount] = useState({
    white: [1],
    red: [1],
    blue: [1],
    green: [1],
    black: [1]
  });
  const [chipCountBool, setChipCountBool] = useState(false);
  const [totalPot, setTotalPot] = useState({
    white: 0,
    red: 0,
    blue: 0,
    green: 0,
    black: 0
  });
  const [lastState, setLastState] = useState([]);
  const [turnState, setTurnState] = useState(0);
  const [flipCardsState, setFlipCardsState] = useState(false);
  const [otherChip, setOtherChip] = useState(false);
  const [blind, setBlind] = useState(16);
  const [otherChipBackground, setOtherChipBackground] = useState(false);
  const [alreadyThere, setAlreadyThere] = useState({
    white: false,
    red: false,
    blue: false,
    green: false,
    black: false
  });
  const [dealState, setDealState] = useState('smallBlind');
  const [nextChip, setNextChip] = useState(false);
  const [startBetting, setStartBetting] = useState(false);
  const [currentBetter, setCurrentBetter] = useState(4);
  const [folds, setFolds] = useState({
    one: false,
    two: false,
    three: false,
    four: false
  });
  const [buyers, setBuyers] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0
  });
  const [currentTurnChips, setCurrentTurnChips] = useState([blackChip, redChip, whiteChip]);
  const [placeBet, setPlaceBet] = useState(false);
  const [buy, setBuy] = useState(false);
  const [dealt, setDealt] = useState(false);
  const [count, setCount] = useState(0);
  const [zIndex, setZIndex] = useState('');
  const [buyPile, setBuyPile] = useState([]);
  const [myBuyCards, setMyBuyCards] = useState(0);
  const [raiseState, setRaiseState] = useState(false);
  const [newCardsForBuy, setNewCardsForBuy] = useState(false);
  const [firstRound, setFirstRound] = useState(true);
  const [dealFifth, setDealFifth] = useState(false);
  const [dealSixth, setDealSixth] = useState(false);
  const [playerTotals, setPlayerTotals] = useState({
    two: JSON.parse(localStorage.getItem('playerTwo')) || 945,
    three: JSON.parse(localStorage.getItem('playerThree')) || 945,
    four: JSON.parse(localStorage.getItem('playerFour')) || 945
  });
  const [showOtherPlayers, setShowOtherPlayers] = useState(false);
  const [play, setPlay] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [nextBetter, setNextBetter] = useState(false);
  const [indexState, setIndexState] = useState(0);
  const [showMoveState, setShowMoveState] = useState(false);
  const [winnerState, setWinnerState] = useState(false);
  const [countState, setCountState] = useState({
    first: false,
    second: false,
    third: false
  });
  const [playerFoldState, setPlayerFoldState] = useState({
    one: false,
    two: false,
    three: false,
    four: false
  });
  const [fourCount, setFourCount] = useState(false);
  const [eightCount, setEightCount] = useState(false);
  const [twelveCount, setTwelveCount] = useState(false);
  const [triggerEndRound, setTriggerEndRound] = useState(false);
  const [newTurnState, setNewTurnState] = useState(JSON.parse(localStorage.getItem('turn')) >= 4 || !JSON.parse(localStorage.getItem('turn')) ? 1 : JSON.parse(localStorage.getItem('turn')) + 1);
  const [bringInDealerState, setBringInDealerState] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const [buyOrNoBuy, setBuyOrNoBuy] = useState(false);

  let thisTurn = JSON.parse(localStorage.getItem('turn'));

  if (!thisTurn || thisTurn === 4) {
    thisTurn = 1;
  } else {
    thisTurn += 1;
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (startBetting && moveChipState && chipCountBool) {
      moveChipForAutoBet(moveChipState[0], moveChipState[1], moveChipState[2], moveChipState[3], indexState);
      return;
    }
    if (moveChipState && chipCountBool) {
      moveChip(moveChipState[0], moveChipState[1], moveChipState[2], moveChipState[3]);
    }
    if (!chipCountBool && nextChip) {
      if (nextChip === 'Big Blind') {
        setDealState('bigBlind');
        setOtherChipBackground([bigBlindChips[0], 0]);
      } else {
        dealBlind(nextChip[0], nextChip[1]);
      }
    } else if (!chipCountBool && !nextChip) {
      if (turnState === 3) {
        if (firstPlay) {
          setOtherChip(false);
          setStartBetting(true);
          setShowOtherPlayers(true);
          setDealState('smallBlind');
          setPlay(true);
          setFirstPlay(false);
          return;
        }
      }
    }
  }, [chipCountBool]);

  useEffect(() => {
    if (firstDeal) {
      initialDeal(0, 1, 500, 115);
      setFirstDeal(false);
    }
  }, [firstDeal]);

  useEffect(() => {
    if (nextThree) {
      dealNextThree(8, 125, 0);
    }
  }, [nextThree]);

  useEffect(() => {
    if (flipCardsState !== false) {
      flipCardFirst(flipCardsState);
    }
  }, [flipCardsState]);

  useEffect(() => {
    if (otherChip && otherChip === 1) {
      if (count >= 16) {
        return;
      }
      dealSmallBlind(0);
    } else if (otherChip && otherChip === 2) {
      setOtherChipBackground([currentTurnChips[0], 0]);
    }
  }, [otherChip]);

  useEffect(() => {
    if (otherChipBackground) {
      if (startBetting) {
        anime({
          targets: '.other-chip',
          right: returnCurrentBetterPosition(currentBetter)[1],
          top: returnCurrentBetterPosition(currentBetter)[0],
          duration: 0,
          complete: () => {
            if (buy) {
              dealBlind(priceForOneCard, 0);
            } else {
              dealChips(otherChipBackground[0], otherChipBackground[1], currentTurnChips);
            }
          }
        });
      } else {
        if (dealState === 'smallBlind') {
          dealSmallBlind(otherChipBackground[1]);
        } else if (dealState === 'bigBlind') {
          if (turnState === 3) {
            dealBlind(bigBlindChips, 0);
          } else {
            dealBigBlind(otherChipBackground[1]);
          }
          if (turnState === 4) {
            dealBigBlind(otherChipBackground[1]);
          }
        }
      }
    }
  }, [otherChipBackground]);

  useEffect(() => {
    if (myBuyCards === 2) {
      addOne(setCurrentBetter, currentBetter, folds);
    }
  }, [myBuyCards]);

  useEffect(() => {
    if (buyPile.includes(0) && buyPile.includes(4) && !buy) {
      addOneCount(setCount, count, folds, turnState);
    }
  }, [buyPile]);

  const generateTwoCards = function () {
    const cardOne = generateRandomCard(deck, cards);
    const cardTwo = generateRandomCard(deck, cards);
    if (cardTwo === cardOne) {
      return generateTwoCards();
    } else if (deck.includes({ ...cardOne, flip: true }) || deck.includes({ ...cardOne, flip: false }) || deck.includes({ ...cardTwo, flip: true }) || deck.includes({ ...cardTwo, flip: false })) {
      return generateTwoCards();
    } else {
      setCards([ ...cards, cardOne, cardTwo ]);
    }
  }

  useEffect(() => {
    let newCount;
    if (count > 4) {
      newCount = 'first';
    } else if (count > 8) {
      newCount = 'second';
    } else if (count > 12) {
      newCount = 'third';
    }
    if (count >= 16) {
      setShowArrow(false);
      setTimeout(() => {
        setTimeout(() => {
          setFolds({
            one: false,
            two: false,
            three: false,
            four: false
          });
          setShowOtherPlayers(false);
          const newCards = [];
          for (let i = 0; i < cards.length; i++) {
            const newObj = cards[i];
            if (i !== 0 && i !== 4 && i !== 13 && i !== 17) {
              newObj.flip = true;
            }
            newCards.push(newObj);
          }
          setCards(newCards);
          setWinnerState(false);
          setTimeout(() => {
            setTriggerEndRound(true);
          }, 4000);
        });
      }, 1000);
      return;
    } else {
      ////
      if ((count !== 0 && count % 4 === 0) || (count >= 4 && !fourCount) || (count >= 8 && !eightCount) || (count >= 12 && !twelveCount)) {
        setIndexState(0);
        setCurrentBet([]);
        setShowArrow(false);
        if (count >= 4 && !fourCount) {
          setFourCount(true);
          dealCardsAgain();
          return;
        }
        if (count >= 8 && !eightCount) {
          setEightCount(true);
          generateTwoCards();
          return;
        }
        if (count >= 12 && !twelveCount) {
          setTwelveCount(true);
          generateTwoCards();
          return;
        }
      }
      if (count === 0 || count % 4 !== 0) {
        if (startBetting) {
          if (currentBetter === 2 || currentBetter === 3 || currentBetter === 4) {
            setTimeout(() => {
              handleTurn(currentBetter);
            }, 2000);
          }
        }
      } else {
        dealCardsAgain();
      }
    }
  }, [currentBetter]);

  useEffect(() => {
    if (count >= 16) {
      return;
    }
    if (count >= 8 && !dealFifth) {
      setDealFifth(true);
      anime({
        targets: `.card-anime-15`,
        translateX: '125px',
        easing: 'easeInOutQuad',
        duration: 500,
        complete: () => {
          setTimeout(() => {
            anime({
              targets: `.card-anime-14`,
              translateX: '-500px',
              easing: 'easeInOutQuad',
              duration: 750,
              complete: () => {
                setFlipCardsState(14);
              }
            });
          }, 500);
        }
      });
    }
    if (count >= 12 && !dealSixth) {
      setDealSixth(true);
      anime({
        targets: `.card-anime-17`,
        translateX: '125px',
        easing: 'easeInOutQuad',
        duration: 500,
        complete: () => {
          setTimeout(() => {
            anime({
              targets: `.card-anime-16`,
              translateX: '-625px',
              easing: 'easeInOutQuad',
              duration: 750,
              complete: () => {
                setFlipCardsState(16);
              }
            });
          }, 500);
        }
      });
    }
    if (flipCardsState !== false && !newCardsForBuy) {
      if (flipCardsState === 9 || flipCardsState === 10 || flipCardsState === 11) {
        flipCardLast(flipCardsState, true);
      } else {
        flipCardLast(flipCardsState);
      }
    }
    if (newCardsForBuy) {
      dealBuyCards();
    }
  }, [cards]);

  useEffect(() => {
    if (turnState) {
      if (turnState === 1) {
        setPlayerTotals({ ...playerTotals, ['two']: playerTotals.two - (blind * 0.5), ['three']: playerTotals.three - blind });
        setCurrentBetter(4);
      } else if (turnState === 2) {
        setPlayerTotals({ ...playerTotals, ['three']: playerTotals.three - (blind * 0.5), ['four']: playerTotals.four - blind });
        setCurrentBetter(1);
      } else if (turnState === 3) {
        setPlayerTotals({ ...playerTotals, ['four']: playerTotals.four - (blind * 0.5) });
        setCurrentBetter(2);
      } else if (turnState === 4) {
        setPlayerTotals({ ...playerTotals, ['two']: playerTotals.two - blind });
        setCurrentBetter(3);
      }
    }
  }, [turnState]);

  // const addTurn = function () {
  //   const roundWinner = determineWinner();
  //   if (turnState === 4) {
  //     setBlind(blind * 2);
  //   }
  //   if (roundWinner === 'one') {
  //     for (let key in totalPot) {
  //       setNumbersState({ ...numbersState, [key]: numbersState[key] + totalPot[key] });
  //     }
  //   } else {
  //     let number = totalPot.white;
  //     number += totalPot.red * 5;
  //     number += totalPot.blue * 10;
  //     number += totalPot.green * 25;
  //     number += totalPot.black * 100;
  //     setPlayerTotals({ ...playerTotals, [roundWinner]: playerTotals[roundWinner] + number });
  //     setCurrentBetter(turnState);
  //     resetAllStates();
  //   }
  // }

  useEffect(() => {
    if (triggerEndRound) {
      setBringInDealerState(true);
      bringAllCardsIn();
    }
  }, [triggerEndRound]);

  // const resetAllStates = function () {

  //   const initialCards = [{ suit: 'hearts', rank: 5, flip: false }];
  //   const initialDeck = returnDeck();
  //   const initialNumbersState = {
  //     white: 20,
  //     red: 15,
  //     blue: 10,
  //     green: 10,
  //     black: 5,
  //   };
  //   const initialChipCount = {
  //     white: [1],
  //     red: [1],
  //     blue: [1],
  //     green: [1],
  //     black: [1],
  //   };
  //   const initialTotalPot = {
  //     white: 0,
  //     red: 0,
  //     blue: 0,
  //     green: 0,
  //     black: 0,
  //   };
  //   const initialAlreadyThere = {
  //     white: false,
  //     red: false,
  //     blue: false,
  //     green: false,
  //     black: false,
  //   };
  //   const initialFolds = {
  //     one: false,
  //     two: false,
  //     three: false,
  //     four: false,
  //   };
  //   const initialBuyers = {
  //     one: 0,
  //     two: 0,
  //     three: 0,
  //     four: 0,
  //   };
  //   const initialPlayerTotals = {
  //     two: 945,
  //     three: 945,
  //     four: 945,
  //   };
  //   const initialCurrentTurnChips = [blackChip, redChip, whiteChip];

  //   setCards(initialCards);
  //   setFirstDeal(false);
  //   setNextThree(false);
  //   setDeck(initialDeck);
  //   setMoveChipState([]);
  //   setChipCount(initialChipCount);
  //   setChipCountBool(false);
  //   setTotalPot(initialTotalPot);
  //   setLastState([]);
  //   setFlipCardsState(false);
  //   setOtherChip(false);
  //   setBlind(16);
  //   setOtherChipBackground(false);
  //   setAlreadyThere(initialAlreadyThere);
  //   setDealState('smallBlind');
  //   setNextChip(false);
  //   setStartBetting(false);
  //   setFolds(initialFolds);
  //   setBuyers(initialBuyers);
  //   setCurrentTurnChips(initialCurrentTurnChips);
  //   setPlaceBet(false);
  //   setBuy(false);
  //   setDealt(false);
  //   setCount(0);
  //   setZIndex('');
  //   setBuyPile([]);
  //   setMyBuyCards(0);
  //   setRaiseState(false);
  //   setNewCardsForBuy(false);
  //   setFirstRound(true);
  //   setDealFifth(false);
  //   setDealSixth(false);
  //   setShowOtherPlayers(false);
  //   setPlay(false);
  //   setShowArrow(false);
  //   setNextBetter(false);
  //   setIndexState(0);
  //   setShowMoveState(false);
  //   setWinnerState(false);
  //   setTurnState(0);
  //   addOne(setTurnState, turnState, {
  //     one: false,
  //     two: false,
  //     three: false,
  //     four: false
  //   });
  // };

  const determineWinner = function () {

    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];

    let playerOne = [cards[0], cards[4], cards[9], cards[10], cards[11], cards[14], cards[16]];
    let playerTwo = [cards[1], cards[5], cards[9], cards[10], cards[11], cards[14], cards[16]];
    let playerThree = [cards[2], cards[6], cards[9], cards[10], cards[11], cards[14], cards[16]];
    let playerFour = [cards[3], cards[7], cards[9], cards[10], cards[11], cards[14], cards[16]];
    if (folds.one) {
      playerOne = false;
    }
    if (folds.two) {
      playerTwo = false;
    }
    if (folds.three) {
      playerThree = false;
    }
    if (folds.four) {
      playerFour = false;
    }
    const otherPlayers = [];
    const players = [playerOne, playerTwo, playerThree, playerFour];
    for (let i = 0; i < 4; i++) {
      if (!players[i]) {
        otherPlayers.push(0);
      } else {
        for (let key in pokerHandRankings) {
          const num = pokerHandRankings[key](players[i]);
          if (num) {
            otherPlayers.push(num);
            break;
          }
        }
      }
    }
    let num = 0;
    let index = 0;
    for (let i = 0; i < 4; i++) {
      if (otherPlayers[i] > num) {
        num = otherPlayers[i];
        index = i;
      }
    }
    let count = 0;
    let newCards = [];
    for (let i = 0; i < 4; i++) {
      if (otherPlayers[i] === num) {
        count += 1;
        if (i === 0) {
          newCards.push(['one', cards[0], cards[4]]);
        } else if (i === 1) {
          newCards.push(['two', cards[1], cards[5]]);
        } else if (i === 2) {
          newCards.push(['three', cards[2], cards[6]]);
        } else if (i === 3) {
          newCards.push(['four', cards[3], cards[7]]);
        }
      }
    }
    let currentMost;
    let currentWinner;
    if (newCards.length > 1) {
      currentMost = ranks.indexOf(newCards[1][1].rank) > ranks.indexOf(newCards[1][2].rank) ? newCards[1][1] : newCards[1][2];
      for (let i = 0; i < newCards.length; i++) {
        if (ranks.indexOf(newCards[i][1].rank) > ranks.indexOf(currentMost.rank)) {
          currentMost = newCards[i][1];
          currentWinner = newCards[i][0];
        }
        if (ranks.indexOf(newCards[i][2].rank) > ranks.indexOf(currentMost.rank)) {
          currentMost = newCards[i][2];
          currentWinner = newCards[i][0];
        }
      }
    }
    if (currentWinner) {
      return currentWinner;
    }
    let newIndex = index;
    if (newIndex === 0) {
      return 'one';
    } else if (newIndex === 1) {
      return 'two';
    } else if (newIndex === 2) {
      return 'three';
    } else if (newIndex === 3) {
      return 'four';
    }
  }

  const dealBuyCards = function () {
    if (!firstRound) {
      handleTurn(currentBetter);
    }
    setNewCardsForBuy(false);
    const newBuyPile = [...buyPile, 8];
    for (let ele of newBuyPile) {
      anime({
        targets: `.card-anime-${ele}`,
        translateX: '0px',
        easing: 'easeInOutQuad',
        duration: 500,
        complete: () => {
          setMyBuyCards(0);
          setBuyPile([]);
          if (firstRound) {
            setFirstRound(false);
          }
          setTimeout(() => {
            if (ele === 0) {
              anime({
                targets: '.card-anime-0',
                translateY: '250px',
                easing: 'easeInOutQuad',
                duration: 500
              });
            } else if (ele === 4) {
              anime({
                targets: '.card-anime-4',
                translateY: '250px',
                translateX: '23px',
                easing: 'easeInOutQuad',
                duration: 500
              });
            } else if (ele === 5) {
              anime({
                targets: '.card-anime-5',
                translateY: '-250px',
                translateX: '-423px',
                easing: 'easeInOutQuad',
                duration: 500
              });
            } else if (ele === 6) {
              anime({
                targets: '.card-anime-6',
                translateY: '-250px',
                translateX: '-23px',
                easing: 'easeInOutQuad',
                duration: 500
              });
            } else if (ele === 7) {
              anime({
                targets: '.card-anime-7',
                translateY: '-250px',
                translateX: '377px',
                easing: 'easeInOutQuad',
                duration: 500,
              });
            }
          }, 500);
        }
      });
    }
    setTimeout(() => {
      setFlipCardsState(9);
    }, 2000);
  }

  const dealCardsAgain = function () {
    const newArray = [...cards];
    const newDeck = [...deck];
    for (let i = 0; i < newArray.length; i++) {
      if (buyPile.includes(i)) {
        newArray[i] = generateRandomCard(newDeck, newArray);
        if (i === 0 || i === 4) {
          newArray[i].flip = true;
        }
      }
    }
    setNewCardsForBuy(true);
    setCards(newArray);
  }

  const returnBlind = function (num, arr) {
    const newArr = [...arr];
    if (num - 100 > 0) {
      newArr.push(blackChip);
      return returnBlind(num - 100, newArr);
    } else if (num - 100 === 0) {
      newArr.push(blackChip);
      return newArr;
    } else {
      if (num - 25 > 0) {
        newArr.push(greenChip);
        return returnBlind(num - 25, newArr);
      } else if (num - 25 === 0) {
        newArr.push(greenChip);
        return newArr;
      } else {
        if (num - 10 > 0) {
          newArr.push(blueChip);
          return returnBlind(num - 10, newArr);
        } else if (num - 10 === 0) {
          newArr.push(blueChip);
          return newArr;
        } else {
          if (num - 5 > 0) {
            newArr.push(redChip);
            return returnBlind(num - 5, newArr);
          } else if (num - 5 === 0) {
            newArr.push(redChip);
            return (newArr);
          } else {
            for (let i = 0; i < num; i++) {
              newArr.push(whiteChip);
            }
            return newArr;
          }
        }
      }
    }
  }

  const bigBlindChips = returnBlind(blind, []);
  const smallBlindChips = returnBlind(blind * 0.5, []);
  const priceForOneCard = returnBlind((blind * 0.5) * 5, []);

  const [currentBet, setCurrentBet] = useState(bigBlindChips);

  // This function will deal the check or the raise

  const dealChips = function (newChip, index, chips) {
    let top;
    let chip;
    let turn;
    let amount;
    if (currentBetter === 2) {
      turn = 'two';
    } else if (currentBetter === 3) {
      turn = 'three';
    } else if (currentBetter === 4) {
      turn = 'four';
    }
    if (newChip === whiteChip) {
      top = 35.5;
      chip = 'white';
      amount = 1;
    } else if (newChip === redChip) {
      top = 45.5;
      chip = 'red';
      amount = 5;
    } else if (newChip === blueChip) {
      top = 55.5;
      chip = 'blue';
      amount = 10;
    } else if (newChip === greenChip) {
      top = 65.5;
      chip = 'green';
      amount = 25;
    } else if (newChip === blackChip) {
      top = 75.5;
      chip = 'black';
      amount = 100;
    }
    if (lastState === 'white' || lastState.length === 0) {
      if (chip === 'white' || chip === 'red' || chip === 'blue' || chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'red') {
      if (chip === 'blue' || chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'blue') {
      if (chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'green') {
      if (chip === 'black') {
        setLastState(chip);
      }
    }
    anime({
      targets: '.other-chip',
      right: '19%',
      top: `${top}%`,
      duration: 500,
      easing: 'easeInOutQuad',
      complete: () => {
        if ((chipCount[chip].length > 2) || !alreadyThere[chip]) {
          setAlreadyThere({ ...alreadyThere, [chip]: true });
        }
        if (chips[index + 1]) {
          setPlayerTotals({ ...playerTotals, [turn]: playerTotals[turn] - amount });
          setOtherChipBackground([chips[index + 1], index + 1]);
          setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
        } else {
          setPlayerTotals({ ...playerTotals, [turn]: playerTotals[turn] - amount });
          setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
          setOtherChip(false);
          addOne(setCurrentBetter, currentBetter, folds);
        }
      }
    });
  }

  const dealSmallBlind = function (index) {
    if (turnState === 4) {
      dealBlind(smallBlindChips, 0);
      return;
    }
    let top;
    let chip;
    if (smallBlindChips[index] === whiteChip) {
      top = 35.5;
      chip = 'white';
    } else if (smallBlindChips[index] === redChip) {
      top = 45.5;
      chip = 'red';
    } else if (smallBlindChips[index] === blueChip) {
      top = 55.5;
      chip = 'blue';
    } else if (smallBlindChips[index] === greenChip) {
      top = 65.5;
      chip = 'green';
    } else if (smallBlindChips[index] === blackChip) {
      top = 75.5;
      chip = 'black';
    }
    if (lastState === 'white' || lastState.length === 0) {
      if (chip === 'white' || chip === 'red' || chip === 'blue' || chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'red') {
      if (chip === 'blue' || chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'blue') {
      if (chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'green') {
      if (chip === 'black') {
        setLastState(chip);
      }
    }

    if (index === 0) {
      anime({
        targets: '.other-chip',
        right: returnOtherChipPosition(turnState).smallBlind[1],
        top: returnOtherChipPosition(turnState).smallBlind[0],
        duration: 0,
        complete: () => {
          anime({
            targets: '.other-chip',
            right: '19%',
            top: `${top}%`,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
              if (chipCount[chip].length > 2 || !alreadyThere[chip]) {
                setAlreadyThere({ ...alreadyThere, [chip]: true });
              }
              if (smallBlindChips[index + 1]) {
                anime({
                  targets: '.other-chip',
                  right: returnOtherChipPosition(turnState).smallBlind[1],
                  top: returnOtherChipPosition(turnState).smallBlind[0],
                  duration: 0,
                  complete: () => {
                    setOtherChipBackground([smallBlindChips[index + 1], index + 1]);
                    setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
                  }
                });
              } else {
                if (turnState === 1 || turnState === 2) {
                  anime({
                    targets: '.other-chip',
                    right: returnOtherChipPosition(turnState + 1).smallBlind[1],
                    top: returnOtherChipPosition(turnState + 1).smallBlind[0],
                    duration: 0,
                    complete: () => {
                      setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
                      setDealState('bigBlind');
                      setOtherChipBackground([bigBlindChips[0], 0]);
                    }
                  });
                } else {
                  setDealState('bigBlind');
                  setOtherChipBackground([bigBlindChips[0], 0]);
                }
              }
            }
          });
        }
      });
    } else {
      anime({
        targets: '.other-chip',
        right: '19%',
        top: `${top}%`,
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {
          if (chipCount[chip].length > 2 || !alreadyThere[chip]) {
            setAlreadyThere({ ...alreadyThere, [chip]: true });
          }
          if (smallBlindChips[index + 1]) {
            anime({
              targets: '.other-chip',
              right: returnOtherChipPosition(turnState).smallBlind[1],
              top: returnOtherChipPosition(turnState).smallBlind[0],
              duration: 0,
              complete: () => {
                setOtherChipBackground([smallBlindChips[index + 1], index + 1]);
                setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
              }
            });
          } else {
            if (turnState === 1 || turnState === 2) {
              anime({
                targets: '.other-chip',
                right: returnOtherChipPosition(turnState + 1).smallBlind[1],
                top: returnOtherChipPosition(turnState + 1).smallBlind[0],
                duration: 0,
                complete: () => {
                  setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
                  setDealState('bigBlind');
                  setOtherChipBackground([bigBlindChips[0], 0]);
                }
              });
            } else {
              setDealState('bigBlind');
              setOtherChipBackground([bigBlindChips[0], 0]);
            }
          }
        }
      });
    }
  }

  const dealBigBlind = function (index) {
    let top;
    let chip;
    if (bigBlindChips[index] === whiteChip) {
      top = 35.5;
      chip = 'white';
    } else if (bigBlindChips[index] === redChip) {
      top = 45.5;
      chip = 'red';
    } else if (bigBlindChips[index] === blueChip) {
      top = 55.5;
      chip = 'blue';
    } else if (bigBlindChips[index] === greenChip) {
      top = 65.5;
      chip = 'green';
    } else if (bigBlindChips[index] === blackChip) {
      top = 75.5;
      chip = 'black';
    }
    if (lastState === 'white' || lastState.length === 0) {
      if (chip === 'white' || chip === 'red' || chip === 'blue' || chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'red') {
      if (chip === 'blue' || chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'blue') {
      if (chip === 'green' || chip === 'black') {
        setLastState(chip);
      }
    } else if (lastState === 'green') {
      if (chip === 'black') {
        setLastState(chip);
      }
    }
    anime({
      targets: '.other-chip',
      right: '19%',
      top: `${top}%`,
      duration: 500,
      easing: 'easeInOutQuad',
      complete: () => {
        if (chipCount[chip].length > 2 || !alreadyThere[chip]) {
          setAlreadyThere({ ...alreadyThere, [chip]: true });
        }
        if (bigBlindChips[index + 1]) {
          anime({
            targets: '.other-chip',
            right: returnOtherChipPosition(turnState).bigBlind[1],
            top: returnOtherChipPosition(turnState).bigBlind[0],
            duration: 0,
            complete: () => {
              setOtherChipBackground([bigBlindChips[index + 1], index + 1]);
              setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
            }
          });
        } else {
          setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
          setOtherChip(false);
          setStartBetting(true);
          setShowOtherPlayers(true);
          setPlay(true);
        }
      }
    });
  }

  const returnBlinds = function () {
    const obj = {}
    if (bringInDealerState) {
      obj.dealer = ['45%', '27%'];
      obj.sb = ['45%', '27%'];
      obj.bb = ['45%', '27%'];
      return obj;
    }
    if (turnState === 1) {
      obj.dealer = ['10%', '35%'];
      obj.sb = ['80%', '80.5%'];
      obj.bb = ['80%', '52.5%'];
    } else if (turnState === 2) {
      obj.dealer = ['80%', '80.5%'];
      obj.sb = ['80%', '52.5%'];
      obj.bb = ['80%', '24.5%'];
    } else if (turnState === 3) {
      obj.dealer = ['80%', '52.5%'];
      obj.sb = ['80%', '24.5%'];
      obj.bb = ['10%', '35%'];
    } else if (turnState === 4) {
      obj.dealer = ['80%', '24.5%'];
      obj.sb = ['10%', '35%'];
      obj.bb = ['80%', '80.5%'];
    } else {
      obj.dealer = ['45%', '27%'];
      obj.sb = ['45%', '27%'];
      obj.bb = ['45%', '27%'];
    }
    return obj;
  }

  const flipCardFirst = function (index) {
    anime({
      targets: `.card-anime-${index}`,
      rotateY: '90deg',
      easing: 'linear',
      duration: 250,
      complete: () => {
        const newArray = [];
        for (let i = 0; i < cards.length; i++) {
          const ele = cards[i];
          if (i === index) {
            ele.flip = !ele.flip;
          }
          newArray.push(ele);
        }
        setCards(newArray);
      }
    });
  }

  const flipCardLast = function (index, move) {
    anime({
      targets: `.card-anime-${index}`,
      rotateY: '0deg',
      easing: 'linear',
      duration: 250,
      complete: () => {
        if (index === 14 || index === 16) {
          setShowArrow(true);
          setFlipCardsState(false);
          setTimeout(() => {
            handleTurn(currentBetter);
          }, 2000);
          return;
        }
        if (move) {
          if (index === 9) {
            setFlipCardsState(10);
          } else if (index === 10) {
            setFlipCardsState(11);
          } else if (index === 11) {
            setFlipCardsState(false);
            setShowArrow(true);
            setTimeout(() => {
              handleTurn(currentBetter);
            }, 2000);
          }
        } else {
          anime({
            targets: `.card-anime-${index}`,
            translateX: '125px',
            translateY: '0px',
            duration: 400,
            easing: 'easeInOutQuad',
            complete: () => {
              if (index === 0 && buyPile.includes(4)) {
                setBuy(false);
              }
              if (index === 4 && buyPile.includes(0)) {
                setBuy(false);
              }
              setFlipCardsState(false);
              setBuyPile([...buyPile, index]);
              setMyBuyCards(myBuyCards + 1);
            }
          })
        }
      }
    });
  }

  const convertLast = function () {
    if (lastState === 'black') {
      return -10;
    } else if (lastState === 'green') {
      return 0;
    } else if (lastState === 'blue') {
      return 10;
    } else if (lastState === 'red') {
      return 20;
    } else if (lastState === 'white') {
      return 30;
    }
  }

  const fullTotal = totalPot.white + totalPot.red + totalPot.blue + totalPot.green + totalPot.black;

  const dealNextThree = function (card, sideDeal, time) {
    let newTime = time + 125;
    let newSideDeal = sideDeal;
    anime({
      targets: `.card-anime-${card}`,
      easing: 'easeInOutQuad',
      duration: 500,
      translateX: '125px'
    });
    card += 1;
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          anime({
            targets: `.card-anime-${card}`,
            easing: 'easeInOutQuad',
            duration: 500,
            translateX: `-${newSideDeal}px`,
            complete: () => {
              if (i === 2) {
                setTimeout(() => {
                  // setTurnState(newTurnState);
                  setTurnState(4);
                }, 250);
              }
            }
          });
          card += 1;
          newSideDeal += 125;
        }, newTime);
        newTime += 500;
      }
    }, 500);
    setNextThree(false);
    return;
  }

  const triggerBuyOrNoBuy = function () {

  }

  const initialDeal = function (card, person, time, sideDeal) {
    let condition;
    if (person === 1 || person === 5) {
      person === 5 ? condition = { translateY: '250px', translateX: '23px' } : condition = { translateY: '250px' };
    } else if (person === 2 || person === 6) {
      person === 6 ? condition = { translateY: '-250px', translateX: '-423px' } : condition = { translateY: '-250px', translateX: '-400px' };
    } else if (person === 3 || person === 7) {
      person === 7 ? condition = { translateY: '-250px', translateX: '-23px' } : condition = { translateY: '-250px' };
    } else if (person === 4 || person === 8) {
      person === 8 ? condition = { translateY: '-250px', translateX: '377px' } : condition = { translateY: '-250px', translateX: '400px' };
    } else {
      condition = { translateX: `-${sideDeal}px` };
    }
    anime({
      ...condition,
      targets: `.card-anime-${card}`,
      easing: 'easeInOutQuad',
      duration: 500,
    });
    if (cards[card + 1]) {
      if (card < 8) {
        setTimeout(() => {
          initialDeal(card + 1, person + 1, time, sideDeal);
        }, time);
      } else {
        setNextThree(true);
        return;
      }
    } else {
      return;
    }
  }

  const moveChip = function (chip, yCoordinate, xCoordinate, color) {
    anime({
      targets: chip,
      top: yCoordinate,
      left: xCoordinate,
      easing: 'easeInOutQuad',
      duration: 400,
      complete: () => {
        setAlreadyThere({ ...alreadyThere, [color]: false });
        const array = chipCount[color];
        if (array && array.length > 2) {
          setChipCount({ ...chipCount, [color]: [1, 1] });
        }
        setNumbersState({ ...numbersState, [color]: numbersState[color] - 1 });
        setTotalPot({ ...totalPot, [color]: totalPot[color] + 1 });
        setChipCountBool(false);
      }
    });
  }

  const moveChipForAutoBet = function (chip, yCoordinate, xCoordinate, color, index) {
    anime({
      targets: chip,
      top: yCoordinate,
      left: xCoordinate,
      easing: 'easeInOutQuad',
      duration: 400,
      complete: () => {
        setIndexState(indexState + 1);
        setAlreadyThere({ ...alreadyThere, [color]: false });
        const array = chipCount[color];
        if (array && array.length > 2) {
          setChipCount({ ...chipCount, [color]: [1, 1] });
        }
        setNumbersState({ ...numbersState, [color]: numbersState[color] - 1 });
        setTotalPot({ ...totalPot, [color]: totalPot[color] + 1 });
        setChipCountBool(false);
        console.log('Index: ', index);
        console.log('nextBetter: ', nextBetter);
        console.log('buy: ', buy);
        console.log('raiseState: ', raiseState);
        if (index === currentBet.length - 1 && nextBetter && !buy && !raiseState) {
          console.log(true);
          setIndexState(0);
          setNextBetter(false);
          addOne(setCurrentBetter, currentBetter, folds);
          addOneCount(setCount, count, folds, turnState);
          if (turnState === 4) {
            setMoveChipState(false);
          }
          if (!showArrow) {
            setShowArrow(true);
          }
          return;
        }
      }
    });
  }

  const returnOtherChipPosition = function (turn) {
    const obj = {};
    if (turn === 0) {
      obj.smallBlind = ['', ''];
      obj.bigBlind = ['', ''];
    } else if (turn === 1) {
      obj.smallBlind = ['-8%', '81%'];
      obj.bigBlind = ['-8%', '53%'];
    } else if (turn === 2) {
      obj.smallBlind = ['-8%', '53%'];
      obj.bigBlind = ['-8%', '25%'];
    } else if (turn === 3) {
      obj.smallBlind = ['-8%', '25%'];
    } else if (turn === 4) {
      obj.bigBlind = ['-8%', '81%'];
    }
    return obj;
  }

  const returnCurrentBetterPosition = function (turn) {
    if (turn === 0) {
      return ['', ''];
    } else if (turn === 1) {
      return ['', ''];
    } else if (turn === 2) {
      return ['-8%', '81%'];
    } else if (turn === 3) {
      return ['-8%', '53%'];
    } else if (turn === 4) {
      return ['-8%', '25%'];
    }
  }

  const dealBlind = function (blind, index) {
    let top;
    let chip;
    if (blind[index] === whiteChip) {
      top = 35.5;
      chip = 'white';
      if (lastState !== 'red' && lastState !== 'blue' && lastState !== 'green' && lastState !== 'black') {
        setLastState('white');
      }
    } else if (blind[index] === redChip) {
      top = 45.5;
      chip = 'red';
      if (lastState !== 'blue' && lastState !== 'green' && lastState !== 'black') {
        setLastState('red');
      }
    } else if (blind[index] === blueChip) {
      top = 55.5;
      chip = 'blue';
      if (lastState !== 'green' && lastState !== 'black') {
        setLastState('blue');
      }
    } else if (blind[index] === greenChip) {
      top = 65.5;
      chip = 'green';
      if (lastState !== 'black') {
        setLastState('green');
      }
    } else if (blind[index] === blackChip) {
      top = 75.5;
      chip = 'black';
      setLastState('black');
    }
    if (blind[index + 1]) {
      setNextChip([blind, index + 1]);
    } else {
      if (turnState === 4) {
        setNextChip('Big Blind');
      } else {
        setNextChip(false);
      }
    }
    if (chipCount[chip]) {
      setNextBetter(true);
      setMoveChipState([`.${chip}-chip-${chipCount[chip].length}`, `${top}%`, '81%', chip]);
      setChipCount({ ...chipCount, [chip]: [...chipCount[chip], 1] });
      setChipCountBool(true);
    }
  }

  const handleTurn = function (playerTurn) {
    if (count >= 16) {
      return;
    }
    let fold;
    let index;
    if (startBetting) {
      const newCards = [];
      if (playerTurn === 1) {
        newCards.push(cards[0]);
        newCards.push(cards[4]);
        fold = 'one';
      } else if (playerTurn === 2) {
        newCards.push(cards[1]);
        newCards.push(cards[5]);
        fold = 'two';
        index = 5;
      } else if (playerTurn === 3) {
        newCards.push(cards[2]);
        newCards.push(cards[6]);
        fold = 'three';
        index = 6;
      } else if (playerTurn === 4) {
        newCards.push(cards[3]);
        newCards.push(cards[7]);
        fold = 'four';
        index = 7;
      }
      if (playerTurn !== 1) {
        let decision;
        if (firstRound) {
          decision = generateRandomChips(newCards[0], newCards[1], currentBet);
        } else {
          if (currentBet.length > 0) {
            decision = generateRandomChipsTwo(returnPlayerCards(currentBetter), currentBet);
          } else {
            const newRaise = generateRandomRaise();
            decision = generateRandomChipsTwo(returnPlayerCards(currentBetter), newRaise);
          }
        }
        if (decision === 'fold') {
          setShowMoveState('fold');
          setTimeout(() => {
            setShowMoveState(false);
            addOneCount(setCount, count, folds, turnState);
            addOne(setCurrentBetter, currentBetter, folds);
            setFolds({ ...folds, [fold]: true });
          }, 1500);
        } else if (decision === 'buy') {
          setShowMoveState('buy');
          setTimeout(() => {
            setShowMoveState(false);
            triggerBuy(currentBetter, index);
            setCurrentTurnChips(priceForOneCard);
            addOneCount(setCount, count, folds, turnState);
            setOtherChip(0);
            setTimeout(() => {
              setOtherChip(2);
            }, 500);
          }, 1500);
        } else {
          if (JSON.stringify(decision) === JSON.stringify(currentBet)) {
            setShowMoveState('call');
          } else {
            setShowMoveState('raise');
          }
          setTimeout(() => {
            setShowMoveState(false);
            setCurrentTurnChips(decision);
            setCurrentBet(decision);
            addOneCount(setCount, count, folds, turnState);
            setOtherChip(2);
          }, 1500);
        }
      }
    }
  }

  const triggerBuy = function (turn, index) {
    let condition = { translateY: '0px', translateX: '125px' };
    anime({
      ...condition,
      targets: `.card-anime-${index}`,
      easing: 'easeInOutQuad',
      duration: 500,
      complete: () => {
        let newTurn;
        if (turn === 1) {
          newTurn = 'one';
        } else if (turn === 2) {
          newTurn = 'two';
        } else if (turn === 3) {
          newTurn = 'three';
        } else if (turn === 4) {
          newTurn = 'four';
        }
        setBuyers({ ...buyers, [newTurn]: buyers[newTurn] + 1 });
        setBuyPile([...buyPile, index]);
      }
    });
  }

  const triggerBuyAnimation = function () {
    anime({
      targets: '.card-anime-0',
      translateX: '-65px',
      duration: 400,
      easing: 'easeInOutQuad'
    });
    anime({
      targets: '.card-anime-4',
      translateX: '65px',
      duration: 400,
      easing: 'easeInOutQuad'
    });
  }

  const returnZIndex = function (index) {
    const newBuyPile = [...buyPile, 8];
    if (newBuyPile.includes(index)) {
      return '0';
    }
    if (index === 5 || index === 6 || index === 7) {
      return '15';
    }
    if (index === 8 || index === 13 || index === 12) {
      return '1';
    }
    if (index === 0 || index === 4) {
      if (buy) {
        if (zIndex && zIndex[0] === index) {
          return '2';
        } else {
          return '3';
        }
      }
    }
    return index;
  }

  const moveCardBack = function () {
    if (buyPile.includes(4)) {
      anime({
        targets: `.card-anime-0`,
        translateX: '0px',
        duration: 400,
        easing: 'easeInOutQuad'
      });
    } else if (buyPile.includes(0)) {
      anime({
        targets: `.card-anime-4`,
        translateX: '23px',
        duration: 400,
        easing: 'easeInOutQuad'
      });
    }
  }

  const returnPlayerCards = function (better) {
    let array;
    if (better === 2) {
      array = [cards[1], cards[5], cards[9], cards[10], cards[11]];
    } else if (better === 3) {
      array = [cards[2], cards[6], cards[9], cards[10], cards[11]];
    } else if (better === 4) {
      array = [cards[3], cards[7], cards[9], cards[10], cards[11]];
    }
    if (cards[14]) {
      array.push(cards[14]);
    }
    return array;
  }

  const generateRandomRaise = function () {
    const chips = [whiteChip, redChip, blueChip, greenChip, blackChip];
    const numOfChips = generateRandomNumber(3);
    const newChips = [];
    for (let i = 0; i < numOfChips; i++) {
      const number = generateRandomNumberTwo(5);
      newChips.push(chips[number]);
    }
    return newChips;
  }

  // const triggerArrowAnimationX = function () {
  //   let myVar = 'X';
  //   if (currentBetter === 1) {
  //     myVar = 'Y';
  //   }
  //   anime({
  //     targets: '.arrow',
  //     [`translate${myVar}`]: '7.5px',
  //     duration: 1000,
  //     easing: 'linear',
  //     complete: () => {
  //       anime({
  //         targets: '.arrow',
  //         [`translate${myVar}`]: '-7.5px',
  //         duration: 1000,
  //         easing: 'linear',
  //         complete: () => {
  //           return triggerArrowAnimationX();
  //         }
  //       });
  //     }
  //   });
  // }

  const calculateCurrentCall = function (array) {
    if (!startBetting) {
      return 0;
    }
    let total = 0;
    for (let ele of array) {
      if (ele === whiteChip) {
        total += 1;
      } else if (ele === redChip) {
        total += 5;
      } else if (ele === blueChip) {
        total += 10;
      } else if (ele === greenChip) {
        total += 25;
      } else if (ele === blackChip) {
        total += 100;
      }
    }
    return total;
  }

  const getChipValue = function (chips) {
    let count = 0;
    for (let ele in chips) {
      if (ele === 'white') {
        count += (chips[ele]);
      } else if (ele === 'red') {
        count += (chips[ele] * 5);
      } else if (ele === 'blue') {
        count += (chips[ele] * 10);
      } else if (ele === 'green') {
        count += (chips[ele] * 25);
      } else if (ele === 'black') {
        count += (chips[ele] * 100);
      }
    }
    return count;
  }

  const bringAllCardsIn = function () {
    for (let index = 0; index < cards.length; index++) {
      anime({
        targets: `.card-anime-${index}`,
        translateX: '0px',
        translateY: '0px',
        easing: 'easeInOutQuad',
        duration: 700,
        complete: () => {
          if (index === cards.length - 1) {
            setTimeout(() => {
              const winner = determineWinner()
              setWinnerState(winner);
              const newObj = {
                white: numbersState.white + totalPot.white,
                red: numbersState.red + totalPot.red,
                blue: numbersState.blue + totalPot.blue,
                green: numbersState.green + totalPot.green,
                black: numbersState.black + totalPot.black,
              }
              setTimeout(() => {
                localStorage.setItem('myChips', JSON.stringify(winner === 'one' ? newObj : numbersState));
                localStorage.setItem('playerTwo', JSON.stringify(winner === 'two' ? playerTotals.two + getChipValue(totalPot) : playerTotals.two));
                localStorage.setItem('playerThree', JSON.stringify(winner === 'three' ? playerTotals.three + getChipValue(totalPot) : playerTotals.three));
                localStorage.setItem('playerFour', JSON.stringify(winner === 'four' ? playerTotals.four + getChipValue(totalPot) : playerTotals.four));
                localStorage.setItem('turn', JSON.stringify(turnState));
                setTimeout(() => {
                  setNewState(newState + 1);
                }, 500);
              }, 3000);
            }, 1000);
          }
        }
      });
    }
  }

  return (
    <div className="background">
      {chipCount.white.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '10%', top: '80%', zIndex: `${cards.length + 1}` }} className={`white-chip-${index}`} onClick={() => {
            if (!placeBet) {
              return;
            }
            if (numbersState.white > 0 && chipCount.white.length < 3) {
              if (chipCount.white.length === 2 && index === 1) {
                return;
              }
              if (raiseState) {
                setCurrentBet([...currentBet, whiteChip]);
              }
              setMoveChipState([`.white-chip-${chipCount.white.length}`, '35.5%', '81%', 'white']);
              setChipCount({ ...chipCount, white: [...chipCount.white, 1] });
              setChipCountBool(true);
              if (lastState !== 'black' && lastState !== 'green' && lastState !== 'blue' && lastState !== 'red') {
                setLastState('white');
              }
            }
          }}>
            <Chip background={whiteChip} hover={index === 0 && placeBet} />
          </div>
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '37.7%' }}>{totalPot.white === 0 ? '' : totalPot.white}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '87.7%', color: 'white' }}>{numbersState.white}</div>
      {chipCount.red.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '15%', top: '80%', zIndex: `${cards.length + 1}` }} className={`red-chip-${index}`} onClick={() => {
            if (numbersState.red > 0 && chipCount.red.length < 3) {
              if (chipCount.red.length === 2 && index === 1) {
                return;
              }
              if (raiseState) {
                setCurrentBet([...currentBet, redChip]);
              }
              setMoveChipState([`.red-chip-${chipCount.red.length}`, '45.5%', '81%', 'red']);
              setChipCount({ ...chipCount, red: [...chipCount.red, 1] });
              setChipCountBool(true);
              if (lastState !== 'black' && lastState !== 'green' && lastState !== 'blue') {
                setLastState('red');
              }
            }
          }}>
            <Chip background={redChip} hover={index === 0 && placeBet} />
          </div>
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '47.7%' }}>{totalPot.red === 0 ? '' : totalPot.red}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '82.7%', color: 'white' }}>{numbersState.red}</div>
      {chipCount.blue.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '20%', top: '80%', zIndex: `${cards.length + 1}` }} className={`blue-chip-${index}`} onClick={() => {
            if (numbersState.blue > 0 && chipCount.blue.length < 3) {
              if (chipCount.blue.length === 2 && index === 1) {
                return;
              }
              if (raiseState) {
                setCurrentBet([...currentBet, blueChip]);
              }
              setMoveChipState([`.blue-chip-${chipCount.blue.length}`, '55.5%', '81%', 'blue']);
              setChipCount({ ...chipCount, blue: [...chipCount.blue, 1] });
              setChipCountBool(true);
              if (lastState !== 'black' && lastState !== 'green') {
                setLastState('blue');
              }
            }
          }}>
            <Chip background={blueChip} hover={index === 0 && placeBet} />
          </div>
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '57.7%' }}>{totalPot.blue === 0 ? '' : totalPot.blue}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '77.7%', color: 'white' }}>{numbersState.blue}</div>
      {chipCount.green.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '25%', top: '80%', zIndex: `${cards.length + 1}` }} className={`green-chip-${index}`} onClick={() => {
            if (numbersState.green > 0 && chipCount.green.length < 3) {
              if (chipCount.green.length === 2 && index === 1) {
                return;
              }
              if (raiseState) {
                setCurrentBet([...currentBet, greenChip]);
              }
              setMoveChipState([`.green-chip-${chipCount.green.length}`, '65.5%', '81%', 'green']);
              setChipCount({ ...chipCount, green: [...chipCount.green, 1] });
              setChipCountBool(true);
              if (lastState !== 'black') {
                setLastState('green');
              }
            }
          }}>
            <Chip background={greenChip} hover={index === 0 && placeBet} />
          </div>
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '67.7%' }}>{totalPot.green === 0 ? '' : totalPot.green}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '72.7%', color: 'white' }}>{numbersState.green}</div>
      {chipCount.black.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '30%', top: '80%', zIndex: `${cards.length + 1}` }} className={`black-chip-${index}`} onClick={() => {
            if (numbersState.black > 0 && chipCount.black.length < 3) {
              if (chipCount.black.length === 2 && index === 1) {
                return;
              }
              if (raiseState) {
                setCurrentBet([...currentBet, blackChip]);
              }
              setMoveChipState([`.black-chip-${chipCount.black.length}`, '75.5%', '81%', 'black']);
              setChipCount({ ...chipCount, black: [...chipCount.black, 1] });
              setChipCountBool(true);
              setLastState('black');
            }
          }}>
            <Chip background={blackChip} hover={index === 0 && placeBet} />
          </div>
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '77.7%' }}>{totalPot.black === 0 ? '' : totalPot.black}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '67.7%', color: 'white' }}>{numbersState.black}</div>
      {cards.map((ele, index) => (
        <div className={`card-anime-${index}`} style={{ position: 'absolute', zIndex: `${returnZIndex(index)}` }} onClick={() => {
          if (!dealt) {
            setDealt(true);
            const newCards = generateRandomHand(14, setDeck, generateRandom);
            setCards(newCards);
            setFirstDeal(true);
          } else {
            if (buy) {
              if (index === 0 || index === 4) {
                setBuyers({ ...buyers, one: buyers.one + 1 });
                if (index === 0) {
                  setZIndex([4]);
                } else {
                  setZIndex([0]);
                }
                setFlipCardsState(index);
                setTimeout(() => {
                  dealBlind(priceForOneCard, 0);
                }, priceForOneCard.length * 300);
              }
            }
          }
        }}>
          <Card card={ele} suit={ele.suit} rank={ele.rank} flip={ele.flip} buy={buy} index={index} />
        </div>
      ))}
      <div class="total" style={{ position: 'absolute', bottom: `${convertLast()}%`, display: fullTotal ? 'flex' : 'none' }}>{totalPot.white + (totalPot.red * 5) + (totalPot.blue * 10) + (totalPot.green * 25) + (totalPot.black * 100)}</div>
      <div class="your-total">{numbersState.white + (numbersState.red * 5) + (numbersState.blue * 10) + (numbersState.green * 25) + (numbersState.black * 100)}<div style={{ fontSize: '25px', marginTop: '10px', marginLeft: '3px' }}>c</div></div>
      <div class="dealer" style={{ position: 'absolute', bottom: returnBlinds().dealer[0], right: returnBlinds().dealer[1], transition: '0.8s', zIndex: '20' }} onTransitionEnd={() => setOtherChip(1)}>D</div>
      <div class="dealer" style={{ position: 'absolute', bottom: returnBlinds().sb[0], right: returnBlinds().sb[1], transition: '0.8s', zIndex: '20' }}>SB</div>
      <div class="dealer" style={{ position: 'absolute', bottom: returnBlinds().bb[0], right: returnBlinds().bb[1], transition: '0.8s', zIndex: '20' }}>BB</div>
      <div class="other-chip" style={{
        display: otherChip
          && returnOtherChipPosition(turnState)[dealState]
          ? 'block' : 'none', position: 'absolute', zIndex: '10001'
      }}>{otherChip ? <Chip background={otherChipBackground[0] ?? smallBlindChips[0]} hover={false} /> : ''}</div>
      <div style={{ display: alreadyThere.white ? 'block' : 'none', position: 'absolute', top: '35.5%', right: '19%', zIndex: '100' }}>{<Chip background={whiteChip} hover={false} />}</div>
      <div style={{ display: alreadyThere.red ? 'block' : 'none', position: 'absolute', top: '45.5%', right: '19%', zIndex: '100' }}>{<Chip background={redChip} hover={false} />}</div>
      <div style={{ display: alreadyThere.blue ? 'block' : 'none', position: 'absolute', top: '55.5%', right: '19%', zIndex: '100' }}>{<Chip background={blueChip} hover={false} />}</div>
      <div style={{ display: alreadyThere.green ? 'block' : 'none', position: 'absolute', top: '65.5%', right: '19%', zIndex: '100' }}>{<Chip background={greenChip} hover={false} />}</div>
      <div style={{ display: alreadyThere.black ? 'block' : 'none', position: 'absolute', top: '75.5%', right: '19%', zIndex: '100' }}>{<Chip background={blackChip} hover={false} />}</div>
      <div className="x" style={{ display: folds.one ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '65%', left: '37%' }}>x</div>
      <div className="x" style={{ display: folds.two ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '-5%', left: '19%' }}>x</div>
      <div className="x" style={{ display: folds.three ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '-5%', left: '46.8%' }}>x</div>
      <div className="x" style={{ display: folds.four ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '-5%', left: '74.6%' }}>x</div>
      <div className="check" style={{ display: myBuyCards === 1 && currentBetter === 1 ? 'flex' : 'none' }} onClick={() => {
        setBuy(false);
        addOneCount(setCount, count, folds, turnState);
        addOne(setCurrentBetter, currentBetter, folds);
        moveCardBack();
      }}>✅</div>
      <div className="check" style={{ display: raiseState && currentBetter === 1 ? 'flex' : 'none' }} onClick={() => {
        setBuy(false);
        addOneCount(setCount, count, folds, turnState);
        addOne(setCurrentBetter, currentBetter, folds);
        setRaiseState(false);
      }}>✅</div>
      <div className="options" style={{ display: currentBetter === 1 && !buy && !raiseState && firstRound && showArrow ? 'flex' : 'none', position: 'absolute', top: '64%', right: '25%' }}>
        <div className="option" onClick={() => {
          setBuy(true);
          triggerBuyAnimation();
        }}>Buy</div>
        {/* <div className="option" onClick={() => {
          addOne(currentBet, setCurrentBet, folds);
          addOneCount(count, setCount, folds);
        }}>No Buy</div> */}
        <div className="option" onClick={() => {
          dealBlind(currentBet, 0);
          setPlaceBet(true);
          setRaiseState(true);
        }}>Raise</div>
        <div className="option" onClick={() => {
          if (currentBet.length === 0) {
            addOne(setCurrentBetter, currentBetter, folds);
            addOneCount(setCount, count, folds, turnState);
            return;
          }
          dealBlind(currentBet, 0);
          setShowArrow(false);
        }}>Call</div>
        <div className="option" onClick={() => {
          setFolds({ ...folds, one: true });
          addOneCount(setCount, count, folds, turnState);
          addOne(setCurrentBetter, currentBetter, folds);
        }}>Fold</div>
      </div>
      <div className="options" style={{ display: currentBetter === 1 && !buy && !raiseState && !firstRound && showArrow ? 'flex' : 'none', position: 'absolute', top: '64%', right: '25%' }}>
        <div className="option" onClick={() => {
          dealBlind(currentBet, 0);
          setPlaceBet(true);
          setRaiseState(true);
        }}>Raise</div>
        <div className="option" onClick={() => {
          if (currentBet.length === 0) {
            addOne(setCurrentBetter, currentBetter, folds);
            addOneCount(setCount, count, folds, turnState);
            return;
          }
          dealBlind(currentBet, 0);
          setShowArrow(false);
        }}>Call</div>
        <div className="option" onClick={() => {
          setFolds({ ...folds, one: true });
          addOneCount(setCount, count, folds, turnState);
          addOne(setCurrentBetter, currentBetter, folds);
        }}>Fold</div>
      </div>
      <div style={{ display: showOtherPlayers ? 'block' : 'none', position: 'absolute', top: '12%', left: '28%', color: 'white', fontSize: '25px' }}>{playerTotals.two}c</div>
      <div style={{ display: showOtherPlayers ? 'block' : 'none', position: 'absolute', top: '12%', left: '55.8%', color: 'white', fontSize: '25px' }}>{playerTotals.three}c</div>
      <div style={{ display: showOtherPlayers ? 'block' : 'none', position: 'absolute', top: '12%', left: '83.5%', color: 'white', fontSize: '25px' }}>{playerTotals.four}c</div>
      <div style={{ display: play ? 'flex' : 'none' }} className="play" onClick={() => {
        setPlay(false);
        setShowArrow(true);
        if (currentBetter === 1) {
          handleTurn(currentBetter);
        } else {
          setTimeout(() => {
            handleTurn(currentBetter);
          }, 2000);
        }
      }}>Play</div>
      <div className="arrow" style={{ display: currentBetter === 2 && showArrow && !showMoveState ? 'block' : 'none', rotate: '270deg', position: 'absolute', top: '26.5%', left: '19%' }}><FontAwesomeIcon icon={faArrowRight} /></div>
      <div className="arrow" style={{ display: currentBetter === 3 && showArrow && !showMoveState ? 'block' : 'none', rotate: '270deg', position: 'absolute', top: '26.5%', left: '47%' }}><FontAwesomeIcon icon={faArrowRight} /></div>
      <div className="arrow" style={{ display: currentBetter === 4 && showArrow && !showMoveState ? 'block' : 'none', rotate: '270deg', position: 'absolute', top: '26.5%', left: '74.5%' }}><FontAwesomeIcon icon={faArrowRight} /></div>
      <div className="arrow-right" style={{ display: currentBetter === 1 && showArrow && !showMoveState && !buy && !raiseState ? 'block' : 'none', position: 'absolute', top: '80%', left: '40%' }}><FontAwesomeIcon icon={faArrowRight} /></div>
      <div>
        <div style={{ position: 'absolute', top: '3%', right: '3.2%', fontSize: '20px', color: 'white' }}>Current call</div>
        <div class="current-call">{calculateCurrentCall(currentBet)}c</div>
      </div>
      <div className="show-move" style={{ left: '16%' }}>{showMoveState && currentBetter === 2 ? showMoveState : ''}</div>
      <div className="show-move" style={{ left: '44%' }}>{showMoveState && currentBetter === 3 ? showMoveState : ''}</div>
      <div className="show-move" style={{ right: '18%' }}>{showMoveState && currentBetter === 4 ? showMoveState : ''}</div>
      <div className="winner" style={{ display: winnerState ? 'flex' : 'none' }}>Player {winnerState} wins!</div>
      <div className="RMH">Rocky Mountain Holdem</div>
    </div>
  )
}