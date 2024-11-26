import React from "react";
import twoOfClubs from "../images/2_of_clubs.png";
import threeOfClubs from "../images/3_of_clubs.png";
import fourOfClubs from "../images/4_of_clubs.png";
import fiveOfClubs from "../images/5_of_clubs.png";
import sixOfClubs from "../images/6_of_clubs.png";
import sevenOfClubs from "../images/7_of_clubs.png";
import eightOfClubs from "../images/8_of_clubs.png";
import nineOfClubs from "../images/9_of_clubs.png";
import tenOfClubs from "../images/10_of_clubs.png";
import jackOfClubs from "../images/jack_of_clubs2.png";
import queenOfClubs from "../images/queen_of_clubs2.png";
import kingOfClubs from "../images/king_of_clubs2.png";
import aceOfClubs from "../images/ace_of_clubs.png";
import twoOfDiamonds from "../images/2_of_diamonds.png";
import threeOfDiamonds from "../images/3_of_diamonds.png";
import fourOfDiamonds from "../images/4_of_diamonds.png";
import fiveOfDiamonds from "../images/5_of_diamonds.png";
import sixOfDiamonds from "../images/6_of_diamonds.png";
import sevenOfDiamonds from "../images/7_of_diamonds.png";
import eightOfDiamonds from "../images/8_of_diamonds.png";
import nineOfDiamonds from "../images/9_of_diamonds.png";
import tenOfDiamonds from "../images/10_of_diamonds.png";
import jackOfDiamonds from "../images/jack_of_diamonds2.png";
import queenOfDiamonds from "../images/queen_of_diamonds2.png";
import kingOfDiamonds from "../images/king_of_diamonds2.png";
import aceOfDiamonds from "../images/ace_of_diamonds.png";
import twoOfHearts from "../images/2_of_hearts.png";
import threeOfHearts from "../images/3_of_hearts.png";
import fourOfHearts from "../images/4_of_hearts.png";
import fiveOfHearts from "../images/5_of_hearts.png";
import sixOfHearts from "../images/6_of_hearts.png";
import sevenOfHearts from "../images/7_of_hearts.png";
import eightOfHearts from "../images/8_of_hearts.png";
import nineOfHearts from "../images/9_of_hearts.png";
import tenOfHearts from "../images/10_of_hearts.png";
import jackOfHearts from "../images/jack_of_hearts2.png";
import queenOfHearts from "../images/queen_of_hearts2.png";
import kingOfHearts from "../images/king_of_hearts2.png";
import aceOfHearts from "../images/ace_of_hearts.png";
import twoOfSpades from "../images/2_of_spades.png";
import threeOfSpades from "../images/3_of_spades.png";
import fourOfSpades from "../images/4_of_spades.png";
import fiveOfSpades from "../images/5_of_spades.png";
import sixOfSpades from "../images/6_of_spades.png";
import sevenOfSpades from "../images/7_of_spades.png";
import eightOfSpades from "../images/8_of_spades.png";
import nineOfSpades from "../images/9_of_spades.png";
import tenOfSpades from "../images/10_of_spades.png";
import jackOfSpades from "../images/jack_of_spades2.png";
import queenOfSpades from "../images/queen_of_spades2.png";
import kingOfSpades from "../images/king_of_spades2.png";
import aceOfSpades from "../images/ace_of_spades.png";
import bycicle from '../images/istockphoto-1547896441-612x612.jpg'

const returnCorrectCard = function(suit, rank) {
  const clubs = [twoOfClubs, threeOfClubs, fourOfClubs, fiveOfClubs, sixOfClubs, sevenOfClubs, eightOfClubs, nineOfClubs, tenOfClubs, jackOfClubs, queenOfClubs, kingOfClubs, aceOfClubs];
  const diamonds = [twoOfDiamonds, threeOfDiamonds, fourOfDiamonds, fiveOfDiamonds, sixOfDiamonds, sevenOfDiamonds, eightOfDiamonds, nineOfDiamonds, tenOfDiamonds, jackOfDiamonds, queenOfDiamonds, kingOfDiamonds, aceOfDiamonds];
  const hearts = [twoOfHearts, threeOfHearts, fourOfHearts, fiveOfHearts, sixOfHearts, sevenOfHearts, eightOfHearts, nineOfHearts, tenOfHearts, jackOfHearts, queenOfHearts, kingOfHearts, aceOfHearts];
  const spades = [twoOfSpades, threeOfSpades, fourOfSpades, fiveOfSpades, sixOfSpades, sevenOfSpades, eightOfSpades, nineOfSpades, tenOfSpades, jackOfSpades, queenOfSpades, kingOfSpades, aceOfSpades];

  if (rank === 'jack') {
    rank = 11;
  } else if (rank === 'queen') {
    rank = 12;
  } else if (rank === 'king') {
    rank = 13;
  } else if (rank === 'ace') {
    rank = 14;
  }

  if (suit === 'clubs') {
    return clubs[rank - 2];
  } else if (suit === 'diamonds') {
    return diamonds[rank - 2];
  } else if (suit === 'hearts') {
    return hearts[rank - 2];
  } else if (suit === 'spades') {
    return spades[rank - 2];
  }
}

export default function Card(props) {

  const { suit, rank, flip, buy, index } = props;
  
  const trueIndex = function() {
    if (index === 0 || index === 4) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div data-testid="card" className={buy && trueIndex() ? 'highlight-card' : 'card'} style={{ backgroundImage: flip ? `url(${returnCorrectCard(suit, rank)})` : `url(${bycicle})`}}></div>
  )
}