import React from "react";
import { PlayerWrapper } from "./Player.styled";

const Player = ({ player, isPlayerActive }) => {
  return (
    <PlayerWrapper $isPlayerActive={isPlayerActive ?? false}>
      <div>
        {player.name} {player.choice}
      </div>
      <div>{player.score}</div>
    </PlayerWrapper>
  );
};

export default Player;
