import React from "react";
import { PlayerWrapper, AvatarWrapper, AvatarImage } from "./Player.styled";
import Avatar, { genConfig } from "react-nice-avatar";
import { SubTitle, Text } from "../../styles/General.styled";

const Player = ({ player, isPlayerActive }) => {
  return (
    <PlayerWrapper>
      <AvatarWrapper $isPlayerActive={isPlayerActive ?? false}>
        <AvatarImage>
          <Avatar
            {...player.avatarConfig}
            style={{
              width: "var(--avatar-size)",
              height: "var(--avatar-size)",
            }}
          />
        </AvatarImage>
      </AvatarWrapper>
      <Text>
        {player.name} ({player.choice.toUpperCase()})
      </Text>
      <SubTitle $primary>{player.score}</SubTitle>
    </PlayerWrapper>
  );
};

export default Player;
