import React from "react";
import { PlayerWrapper, AvatarWrapper } from "./Player.styled";
import Avatar, { genConfig } from "react-nice-avatar";
import { SubTitle, Text } from "../../styles/General.styled";

const Player = ({ player, isPlayerActive }) => {
  return (
    <PlayerWrapper>
      <AvatarWrapper $isPlayerActive={isPlayerActive ?? false}>
        <Avatar
          {...player.avatarConfig}
        />
      </AvatarWrapper>
      <Text>
        {player.name} ({player.choice.toUpperCase()})
      </Text>
      <SubTitle>{player.score}</SubTitle>
    </PlayerWrapper>
  );
};

export default Player;
