import { useEffect, useState } from "react";

const useSound = (url, options) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.load();
    audio.volume = options.volume;
    setSound(audio);
  }, []);

  const play = () => {
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  return { play };
};

export default useSound;
