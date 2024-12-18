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
  addOneCount,
  getFolds,
  returnRandomRaise
} from "../helpers";
import Chip from "./Chip";
import blackChip from '../images/Black_Chip.jpg';
import whiteChip from '../images/White_Chip.jpg';
import blueChip from '../images/Blue_Chip.png';
import redChip from '../images/Red_Chip.jpg';
import greenChip from '../images/Green_Chip.jpg';

export default function Background(props) {

  const { newState, setNewState } = props;

  // states:  

  const [cards, setCards] = useState([{ suit: 'hearts', rank: 5, flip: false }]);

  // set true when cards are being dealt
  const [firstDeal, setFirstDeal] = useState(false);

  // set true when last 3 cards are being dealt
  const [nextThree, setNextThree] = useState(false);
  const [deck, setDeck] = useState(returnDeck());

  // set which player's turn to be dealer
  const [thisTurnState, setThisTurnState] = useState(JSON.parse(localStorage.getItem('turn') || 1));

  // amount of each chip user has
  const [numbersState, setNumbersState] = useState(JSON.parse(localStorage.getItem('myChips')) || {
    white: 20,
    red: 15,
    blue: 10,
    green: 10,
    black: 5
  });

  // set true when chip is moving
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

  // set to largest chip in pot
  const [lastState, setLastState] = useState([]);
  const [turnState, setTurnState] = useState(0);

  // set to true when card is being animated
  const [flipCardsState, setFlipCardsState] = useState(false);
  const [otherChip, setOtherChip] = useState(false);
  const [blind, setBlind] = useState(JSON.parse(localStorage.getItem('blind')) || 16);

  // set to which chip is being animated
  const [otherChipBackground, setOtherChipBackground] = useState(false);

  // keys set to true if chip has been dealt
  const [alreadyThere, setAlreadyThere] = useState({
    white: false,
    red: false,
    blue: false,
    green: false,
    black: false
  });

  // set to which blind is being dealt
  const [dealState, setDealState] = useState('smallBlind');

  // set to next chip being dealt
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

  // set to total amount of chips for call and raise
  const [currentTurnChips, setCurrentTurnChips] = useState([blackChip, redChip, whiteChip]);
  const [placeBet, setPlaceBet] = useState(false);

  // set to true if user is buying card
  const [buy, setBuy] = useState(false);
  const [dealt, setDealt] = useState(false);
  const [count, setCount] = useState(0);
  const [zIndex, setZIndex] = useState('');
  const [buyPile, setBuyPile] = useState([]);
  const [myBuyCards, setMyBuyCards] = useState(0);

  // set to true if user chooses to raise blind
  const [raiseState, setRaiseState] = useState(false);
  const [newCardsForBuy, setNewCardsForBuy] = useState(false);

  // set to false after first round
  const [firstRound, setFirstRound] = useState(true);
  const [dealFifth, setDealFifth] = useState(false);
  const [dealSixth, setDealSixth] = useState(false);
  const [playerTotals, setPlayerTotals] = useState({
    two: JSON.parse(localStorage.getItem('playerTwo')) || 945,
    three: JSON.parse(localStorage.getItem('playerThree')) || 945,
    four: JSON.parse(localStorage.getItem('playerFour')) || 945
  });
  const [showOtherPlayers, setShowOtherPlayers] = useState(false);

  // show play button
  const [play, setPlay] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [indexState, setIndexState] = useState(0);

  // show bot's decision
  const [showMoveState, setShowMoveState] = useState(false);

  // show winner
  const [winnerState, setWinnerState] = useState(false);
  const [fourCount, setFourCount] = useState(false);
  const [eightCount, setEightCount] = useState(false);
  const [twelveCount, setTwelveCount] = useState(false);
  const [triggerEndRound, setTriggerEndRound] = useState(false);
  const [bringInDealerState, setBringInDealerState] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const [removeFolds, setRemoveFolds] = useState(false);

  // set true if only one chip is being dealt
  const [oneChipState, setOneChipState] = useState(false);

  // set player turns based on blind's
  const [blindState, setBlindState] = useState([]);

  // useEffect's:  

  // clear local storage after retrieving data
  useEffect(() => {
    localStorage.clear();
  }, []);

  // this useEffect is complex and performs state updates based on certain conditionals to render proper animation
  useEffect(() => {
    // if betting has begun move chip based on user selection
    if (startBetting && moveChipState && chipCountBool) {
      moveChipForAutoBet(moveChipState[0], moveChipState[1], moveChipState[2], moveChipState[3], indexState);
      return;
    }
    // move chip automatically for dealing blinds
    if (moveChipState && chipCountBool) {
      moveChip(moveChipState[0], moveChipState[1], moveChipState[2], moveChipState[3]);
    }
    if (!chipCountBool && nextChip) {
      // deal big blind
      if (nextChip === 'Big Blind') {
        setDealState('bigBlind');
        setOtherChipBackground([bigBlindChips[0], 0]);
      } else {
        dealBlind(nextChip[0], nextChip[1]);
      }
    } else if (!chipCountBool && !nextChip) {
      // automatially deal small blind if user is small blind
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
    // set time increments for dealing cards
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

  // this function is defined in the useEffect's so it can be accessed at the start of each round
  // function uses recursion to return proper chip array based on conditionals
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

  useEffect(() => {
    if (otherChipBackground) {
      if (startBetting) {
        // bring the chip to starting position
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
            // deal blind from users pile
            dealBlind(bigBlindChips, 0);
          } else {
            // deal blind from bot's pile
            dealBigBlind(otherChipBackground[1]);
          }
        }
      }
    }
  }, [otherChipBackground]);

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

  // function defined here so it can be accessed in useEffect
  const generateTwoCards = function () {
    const cardOne = generateRandomCard(deck, cards);
    const cardTwo = generateRandomCard(deck, cards);
    if (cardTwo === cardOne) {
      return generateTwoCards();
    } else if (deck.includes({ ...cardOne, flip: true }) || deck.includes({ ...cardOne, flip: false }) || deck.includes({ ...cardTwo, flip: true }) || deck.includes({ ...cardTwo, flip: false })) {
      return generateTwoCards();
    } else {
      setCards([...cards, cardOne, cardTwo]);
    }
  }

  useEffect(() => {
    if (count >= 16) {
      // show all cards
      setShowArrow(false);
      setTimeout(() => {
        setTimeout(() => {
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
          setRemoveFolds(true);
          setTimeout(() => {
            setTriggerEndRound(true);
          }, 4000);
        });
      }, 1000);
      return;
    } else {
      if ((count !== 0 && count % 4 === 0) || (count >= 4 && !fourCount) || (count >= 8 && !eightCount) || (count >= 12 && !twelveCount)) {
        // reset states for next round
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
          // trigger automatic new turn
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
      // deal new card
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
      // deal new card
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
        // deal card after this
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

  useEffect(() => {
    if (triggerEndRound) {
      setBringInDealerState(true);
      bringAllCardsIn();
    }
  }, [triggerEndRound]);

  useEffect(() => {
    if (oneChipState) {
      dealBlind(currentBet, 0);
      setPlaceBet(true);
    }
  }, [oneChipState]);

  // state defined here so bigBlindChips can be properly accessed
  const [currentBet, setCurrentBet] = useState(bigBlindChips);

  // animations:

  // card animations:

  // deal each player 2 cards
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

  // deal three cards after player deal
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
                  // begin the round
                  if (thisTurnState === 1) {
                    setBlindState([2, 3]);
                  } else if (thisTurnState === 2) {
                    setBlindState([3, 4]);
                  } else if (thisTurnState === 3) {
                    setBlindState([4, 1]);
                  } else if (thisTurnState === 4) {
                    setBlindState([1, 2]);
                  }
                  setTurnState(thisTurnState);
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

  // begin card flip
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

  // finish card flip
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
              setFlipCardsState(false);
              setBuyPile([...buyPile, index]);
              setMyBuyCards(myBuyCards + 1);
            }
          })
        }
      }
    });
  }

  const triggerBuy = function (turn, index) {
    const condition = { translateY: '0px', translateX: '125px' };
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

  // return new bought cards
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

  const bringAllCardsIn = function () {
    for (let index = 0; index < cards.length; index++) {
      anime({
        targets: `.card-anime-${index}`,
        translateX: '0px',
        translateY: '0px',
        easing: 'easeInOutQuad',
        duration: 700,
        complete: () => {
          // set necessary data for next round
          if (index === cards.length - 1) {
            setTimeout(() => {
              const winner = determineWinner();
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
                localStorage.setItem('turn', JSON.stringify(turnState + 1 > 4 ? 1 : turnState + 1));
                localStorage.setItem('blind', JSON.stringify(turnState === 4 ? blind * 2 : blind));
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


  // chip animations: 

  // deal the check or the raise
  const dealChips = function (newChip, index, chips) {
    if (chips.length === 0) {
      setCurrentTurnChips([...currentBet]);
      addOne(setCurrentBetter, currentBetter, folds);
      return;
    }
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
    // select correct chip
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

    // animate the chip
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
              setTotalPot({ ...totalPot, [chip]: totalPot[chip] + 1 });
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

  // move chip for user raise
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
      }
    });
  }

  // deal users blind automatically 
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
    if (!blind || blind.length === 0) {
      return;
    }
    if (blind[index + 1]) {
      setNextChip([blind, index + 1]);
    } else {
      if (turnState === 4 && !startBetting) {
        anime({
          targets: '.other-chip',
          right: '81%',
          top: '-8%',
          duration: 0,
          complete: () => {
            setNextChip('Big Blind');
          }
        })
      } else {
        setNextChip(false);
        if (!raiseState && buyers.one !== 1 && startBetting) {
          setTimeout(() => {
            setShowArrow(true);
            addOneCount(setCount, count, folds, turnState);
            addOne(setCurrentBetter, currentBetter, folds);
            if (buy && buyers.one === 2) {
              setBuy(false);
            }
          }, 500);
        }
      }
    }

    if (chipCount[chip]) {
      setMoveChipState([`.${chip}-chip-${chipCount[chip].length}`, `${top}%`, '81%', chip]);
      setChipCount({ ...chipCount, [chip]: [...chipCount[chip], 1] });
      setChipCountBool(true);
    }
  }

  // state updates:  

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

  // make decision for all bot's
  const handleTurn = function (playerTurn) {
    if (turnState === 3 && !startBetting) {
      return;
    }
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
        let decision = 'fold';
        if (firstRound) {
          decision = generateRandomChips(newCards[0], newCards[1], currentBet);
        } else {
          if (currentBet.length > 0) {
            decision = generateRandomChipsTwo(returnPlayerCards(currentBetter), currentBet);
          } else {
            const newRaise = generateRandomRaise();
            decision = generateRandomChipsTwo(returnPlayerCards(currentBetter), newRaise, true);
          }
        }
        if (decision === 'fold') {
          let newCount = 0;
          for (let key in folds) {
            if (folds[key]) {
              newCount += 1;
            }
          }
          if (newCount >= 2) {
            return handleTurn(playerTurn);
          }
        }
        // only deal necessary chips if player dealt a blind already
        if (decision !== 'fold' && decision !== 'buy') {
          if (firstRound && playerTurn === blindState[0]) {
            const newSmallBlind = returnBlind((calculateCurrentCall(currentBet)) - (blind * 0.5), []);
            decision = returnRandomRaise(newSmallBlind);
          } else if (firstRound && playerTurn === blindState[1]) {
            const newBigBlind = returnBlind(calculateCurrentCall(currentBet) - blind, []);
            decision = returnRandomRaise(newBigBlind);
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
          let tempBlindBool = false;
          let newDecision = calculateCurrentCall(decision);
          if (firstRound && playerTurn === blindState[0]) {
            newDecision = calculateCurrentCall(decision) + (blind * 0.5);
            tempBlindBool = true;
          } else if (firstRound && playerTurn === blindState[1]) {
            newDecision = calculateCurrentCall(decision) + blind;
            tempBlindBool = true;
          }
          if (newDecision === calculateCurrentCall(currentBet)) {
            if (!currentBet || currentBet.length === 0) {
              setShowMoveState('check');
              setTimeout(() => {
                setShowMoveState(false);
                addOneCount(setCount, count, folds, turnState);
                addOne(setCurrentBetter, currentBetter, folds);
              }, 1500);
            } else {
              setShowMoveState('call');
              setTimeout(() => {
                if (decision.length > 0) {
                  setShowMoveState(false);
                  setCurrentTurnChips(decision);
                  if (firstRound && tempBlindBool) {
                    setCurrentBet(returnBlind(newDecision, []));
                  } else {
                    setCurrentBet(decision);
                  }
                  addOneCount(setCount, count, folds, turnState);
                  setOtherChip(2);
                } else {
                  setShowMoveState(false);
                  addOneCount(setCount, count, folds, turnState);
                  addOne(setCurrentBetter, currentBetter, folds);
                }
              }, 1500);
            }
          } else {
            setShowMoveState('raise');
            setTimeout(() => {
              setShowMoveState(false);
              setCurrentTurnChips(decision);
              if (firstRound && tempBlindBool) {
                setCurrentBet(returnBlind(newDecision, []));
              } else {
                setCurrentBet(decision);
              }
              addOneCount(setCount, count, folds, turnState);
              setOtherChip(2);
            }, 1500);
          }
        }
      }
    }
  }

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

  // positioning: 

  // positioning for blinds
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

  // ensure cards will not overlap eachother
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

  // extra helpers:  

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

  // return current chips as a number  
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

  // full total for display
  const fullTotal = totalPot.white + totalPot.red + totalPot.blue + totalPot.green + totalPot.black;

  return (
    <div className="background">
      {chipCount.white.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '10%', top: '80%', zIndex: index === 2 ? '10002' : '10001' }} className={`white-chip-${index}`} onClick={() => {
            if (!placeBet) {
              return;
            }
            if (numbersState.white > 0 && chipCount.white.length < 3) {
              if (chipCount.white.length === 2 && index === 1) {
                return;
              }
              // move chip if raise
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
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '37.7%', cursor: 'default', userSelect: 'none' }}>{totalPot.white === 0 ? '' : totalPot.white}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '87.7%', color: 'white', cursor: 'default', userSelect: 'none' }}>{numbersState.white}</div>
      {chipCount.red.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '15%', top: '80%', zIndex: index === 2 ? '10002' : '10001' }} className={`red-chip-${index}`} onClick={() => {
            if (!placeBet) {
              return;
            }
            if (numbersState.red > 0 && chipCount.red.length < 3) {
              if (chipCount.red.length === 2 && index === 1) {
                return;
              }
              // move chip if raise
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
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '47.7%', cursor: 'default', userSelect: 'none' }}>{totalPot.red === 0 ? '' : totalPot.red}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '82.7%', color: 'white', cursor: 'default', userSelect: 'none' }}>{numbersState.red}</div>
      {chipCount.blue.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '20%', top: '80%', zIndex: index === 2 ? '10002' : '10001' }} className={`blue-chip-${index}`} onClick={() => {
            if (!placeBet) {
              return;
            }
            if (numbersState.blue > 0 && chipCount.blue.length < 3) {
              if (chipCount.blue.length === 2 && index === 1) {
                return;
              }
              // move chip if raise
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
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '57.7%', cursor: 'default', userSelect: 'none' }}>{totalPot.blue === 0 ? '' : totalPot.blue}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '77.7%', color: 'white', cursor: 'default', userSelect: 'none' }}>{numbersState.blue}</div>
      {chipCount.green.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '25%', top: '80%', zIndex: index === 2 ? '10002' : '10001' }} className={`green-chip-${index}`} onClick={() => {
            if (!placeBet) {
              return;
            }
            if (numbersState.green > 0 && chipCount.green.length < 3) {
              if (chipCount.green.length === 2 && index === 1) {
                return;
              }
              // move chip if raise
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
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '67.7%', cursor: 'default', userSelect: 'none' }}>{totalPot.green === 0 ? '' : totalPot.green}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '72.7%', color: 'white', cursor: 'default', userSelect: 'none' }}>{numbersState.green}</div>
      {chipCount.black.map((ele, index) => (
        <div>
          <div style={{ position: 'absolute', left: '30%', top: '80%', zIndex: index === 2 ? '10002' : '10001' }} className={`black-chip-${index}`} onClick={() => {
            if (!placeBet) {
              return;
            }
            if (numbersState.black > 0 && chipCount.black.length < 3) {
              if (chipCount.black.length === 2 && index === 1) {
                return;
              }
              // move chip if raise
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
          <div style={{ color: 'white', position: 'absolute', right: '13%', top: '77.7%', cursor: 'default', userSelect: 'none' }}>{totalPot.black === 0 ? '' : totalPot.black}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: '88%', right: '67.7%', color: 'white', cursor: 'default', userSelect: 'none' }}>{numbersState.black}</div>
      {cards.map((ele, index) => (
        <div className={`card-anime-${index}`} style={{ position: 'absolute', zIndex: `${returnZIndex(index)}` }} onClick={() => {
          if (!dealt) {
            setDealt(true);
            const newCards = generateRandomHand(14, setDeck, generateRandom);
            setCards(newCards);
            setFirstDeal(true);
          } else {
            if (buy) {
              // move card and update states
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
      <div class="dealer" style={{ position: 'absolute', bottom: returnBlinds().dealer[0], right: returnBlinds().dealer[1], transition: '0.8s', zIndex: '20', cursor: 'default', userSelect: 'none' }} onTransitionEnd={() => setOtherChip(1)}>D</div>
      <div class="dealer" style={{ position: 'absolute', bottom: returnBlinds().sb[0], right: returnBlinds().sb[1], transition: '0.8s', zIndex: '20', cursor: 'default', userSelect: 'none' }}>SB</div>
      <div class="dealer" style={{ position: 'absolute', bottom: returnBlinds().bb[0], right: returnBlinds().bb[1], transition: '0.8s', zIndex: '20', cursor: 'default', userSelect: 'none' }}>BB</div>
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
      <div className="x" style={{ display: folds.one && !removeFolds ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '65%', left: '37%', cursor: 'default', userSelect: 'none' }}>x</div>
      <div className="x" style={{ display: folds.two && !removeFolds ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '-5%', left: '19%', cursor: 'default', userSelect: 'none' }}>x</div>
      <div className="x" style={{ display: folds.three && !removeFolds ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '-5%', left: '46.8%', cursor: 'default', userSelect: 'none' }}>x</div>
      <div className="x" style={{ display: folds.four && !removeFolds ? 'block' : 'none', zIndex: '1000', position: 'absolute', top: '-5%', left: '74.6%', cursor: 'default', userSelect: 'none' }}>x</div>
      <div className="check" style={{ display: myBuyCards === 1 && currentBetter === 1 ? 'flex' : 'none' }} onClick={() => {
        setBuy(false);
        setMyBuyCards(0);
        addOneCount(setCount, count, folds, turnState);
        addOne(setCurrentBetter, currentBetter, folds);
        moveCardBack();
      }}>✅</div>
      <div className="check" style={{ display: raiseState && currentBetter === 1 ? 'flex' : 'none' }} onClick={() => {
        setBuy(false);
        addOneCount(setCount, count, folds, turnState);
        addOne(setCurrentBetter, currentBetter, folds);
        setRaiseState(false);
        if (oneChipState) {
          setOneChipState(false);
        }
        setBuyers({ ...buyers, one: 0 });
      }}>✅</div>
      <div className="options" style={{ display: currentBetter === 1 && !buy && !raiseState && firstRound && showArrow ? 'flex' : 'none', position: 'absolute', top: '64%', right: '25%' }}>
        <div className="option" onClick={() => {
          setBuy(true);
          triggerBuyAnimation();
        }}>Buy</div>
        <div className="option" onClick={() => {
          // only deal necessary chips if user dealt blind
          let newArray = currentBet;
          let sameCallBool = false;
          if (firstRound && blindState[0] === 1) {
            newArray = returnBlind(calculateCurrentCall(currentBet) - blind * 0.5, []);
            sameCallBool = true;
          } else if (firstRound && blindState[1] === 1) {
            newArray = returnBlind(calculateCurrentCall(currentBet) - blind, []);
            sameCallBool = true;
          }
          if (sameCallBool) {
            if (calculateCurrentCall(newArray) === 0) {
              setPlaceBet(true);
              setRaiseState(true);
              return;
            } else {
              dealBlind(newArray, 0);
              setPlaceBet(true);
              setRaiseState(true);
              return;
            }
          }
          if (currentBet.length === 1) {
            setRaiseState(true);
            setOneChipState(true);
            return;
          }
          dealBlind(currentBet, 0);
          setPlaceBet(true);
          setRaiseState(true);
        }}>Raise</div>
        <div className="option" onClick={() => {
          let newArray = currentBet;
          let sameCallBool = false;
          // only deal necessary chips if user dealt blind
          if (firstRound && blindState[0] === 1) {
            newArray = returnBlind(calculateCurrentCall(currentBet) - blind * 0.5, []);
            sameCallBool = true;
          } else if (firstRound && blindState[1] === 1) {
            newArray = returnBlind(calculateCurrentCall(currentBet) - blind, []);
            sameCallBool = true;
          }
          if (sameCallBool) {
            if (calculateCurrentCall(newArray) === 0) {
              addOne(setCurrentBetter, currentBetter, folds);
              addOneCount(setCount, count, folds, turnState);
              return;
            } else {
              dealBlind(newArray, 0);
              setShowArrow(false);
              return;
            }
          }
          if (currentBet.length === 0) {
            addOne(setCurrentBetter, currentBetter, folds);
            addOneCount(setCount, count, folds, turnState);
            return;
          }
          dealBlind(currentBet, 0);
          setShowArrow(false);
        }}>Call</div>
        {getFolds(folds) && <div className="option" onClick={() => {
          setFolds({ ...folds, one: true });
          addOneCount(setCount, count, folds, turnState);
          addOne(setCurrentBetter, currentBetter, folds);
        }}>Fold</div>
        }
      </div>
      <div className="options" style={{ display: currentBetter === 1 && !buy && !raiseState && !firstRound && showArrow ? 'flex' : 'none', position: 'absolute', top: '64%', right: '25%' }}>
        <div className="option" onClick={() => {
          if (currentBet.length === 1) {
            setRaiseState(true);
            setOneChipState(true);
            return;
          }
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
        }}>{!currentBet || currentBet.length === 0 ? 'Check' : 'Call'}</div>
        {getFolds(folds) && <div className="option" onClick={() => {
          setFolds({ ...folds, one: true });
          addOneCount(setCount, count, folds, turnState);
          addOne(setCurrentBetter, currentBetter, folds);
        }}>Fold</div>
        }
      </div>
      <div style={{ display: showOtherPlayers ? 'block' : 'none', position: 'absolute', top: '12%', left: '28%', color: 'white', fontSize: '25px', cursor: 'default', userSelect: 'none' }}>{playerTotals.two}c</div>
      <div style={{ display: showOtherPlayers ? 'block' : 'none', position: 'absolute', top: '12%', left: '55.8%', color: 'white', fontSize: '25px', cursor: 'default', userSelect: 'none' }}>{playerTotals.three}c</div>
      <div style={{ display: showOtherPlayers ? 'block' : 'none', position: 'absolute', top: '12%', left: '83.5%', color: 'white', fontSize: '25px', cursor: 'default', userSelect: 'none' }}>{playerTotals.four}c</div>
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
        <div style={{ position: 'absolute', top: '3%', right: '3.2%', fontSize: '20px', color: 'white', cursor: 'default', userSelect: 'none' }}>Current call</div>
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