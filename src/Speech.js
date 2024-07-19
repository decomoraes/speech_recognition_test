import React, { useEffect } from "react";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isVideoOn, setIsVideoOn] = useState(false);

  const startListening = () =>
    SpeechRecognition.startListening({ language: "pt-BR", continuous: true });

  useEffect(() => {
    startListening();
    // Clean up function to stop listening when the component unmounts
    return () => SpeechRecognition.stopListening();
  }, []);

  useEffect(() => {
    if (transcript.toLowerCase().includes("capturar imagem")) {
      handleCaptureImage();
      resetTranscript();
    } else if (transcript.toLowerCase().includes("iniciar vídeo")) {
      setIsVideoOn(true);
    } else if (transcript.toLowerCase().includes("finalizar vídeo")) {
      setIsVideoOn(false);
    }
  }, [transcript]);

  const handleCaptureImage = () => {
    console.log("Evento de captura de imagem disparado!");
    props.onCaptureImage();
    // Adicione aqui a lógica para capturar a imagem
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>{isVideoOn ? "GRAVANDO" : ""}</p>
      {/* <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;

// import React from "react";
// import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const appId = "<INSERT_SPEECHLY_APP_ID_HERE>";
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

// const Dictaphone = () => {
//   const { transcript, listening, browserSupportsSpeechRecognition } =
//     useSpeechRecognition();
//   const startListening = () =>
//     SpeechRecognition.startListening({ continuous: true });

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? "on" : "off"}</p>
//       <button
//         onTouchStart={startListening}
//         onMouseDown={startListening}
//         onTouchEnd={SpeechRecognition.stopListening}
//         onMouseUp={SpeechRecognition.stopListening}
//       >
//         Hold to talk
//       </button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;
