import React, { useState, useContext } from "react";
import { useGame } from "../../hooks/useGame";
import { ModalHeader, ModalBody, ModalFooter } from "../Modal/Modal.styled";
import { Title, SubTitle } from "../../styles/General.styled";
import Button from "../Button/Button";
import { ModalContext } from "../../contexts/ModalContext";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";

const PlayerNamesModal = ({ onFormSubmit }) => {
  const { setPlayerNames, setGameMode } = useGame();
  const { handleModal } = useContext(ModalContext);
  const { clickSfx } = useContext(SoundEffectsContext);

  // Local state to track only the human player's name
  const [p1Name, setP1Name] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    clickSfx.play();

    // Fallback default if the field is left empty
    const finalP1 = p1Name.trim() || "Player 1";
    const finalP2 = "Computer";

    // 1. Set the game mode to Player vs Computer in the reducer
    setGameMode("pvc");

    // 2. Save both names to global state
    setPlayerNames(finalP1, finalP2);

    // 3. Close the modal layout
    handleModal();

    // 4. Navigate to the game board page
    if (onFormSubmit) onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <ModalHeader>
        <Title $primary>Enter Your Details</Title>
      </ModalHeader>
      
      <ModalBody>
        <SubTitle style={{ marginBottom: "1.5rem" }}>
          Prepare to face the AI!
        </SubTitle>

        <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>
          <label style={{ display: "block", color: "#333", marginBottom: "0.3rem", fontWeight: "bold" }}>
            Your Name (X)
          </label>
          <input
            type="text"
            placeholder="e.g. Jane"
            value={p1Name}
            onChange={(e) => setP1Name(e.target.value)}
            maxLength={12}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid #8437f9",
              outline: "none"
            }}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" color="#f9c811">
          Start Match
        </Button>
      </ModalFooter>
    </form>
  );
};

export default PlayerNamesModal;