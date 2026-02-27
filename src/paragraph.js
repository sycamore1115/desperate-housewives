import { useState } from "react";
import { URL } from "./config";
function Paragraph({ episode, id, content, speaker, readable, mark }) {
  const [showMark, setShowMark] = useState(false);
  function toggleMark(e, paragraphId) {
    // if (mark.length === 0) return;
    setShowMark(!showMark);
  }

  function toggleAudio(e, paragraphId) {
    if (!readable) return;
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSrc = `${URL}${episode}/${id}.mp3`;
    if (audioPlayer.src.includes(audioSrc)) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      return;
    }
    audioPlayer.src = audioSrc;
    audioPlayer.play().catch((err) => console.error("播放失败：", err));
  }

  return (
    <div className="line-card paragraph" id={id}>
      <button
        className="play-btn audio-icon"
        onClick={(e) => toggleAudio(e, id)}
        style={readable ? { opacity: 1 } : { opacity: 0 }}
      >
        ▶
      </button>
      <p className="en-line">{content}</p>
      {mark?.length > 0 && (
        <div onClick={(e) => toggleMark(e, id)} className="more">
          👇
        </div>
      )}
      <div
        className="mark zh-line"
        id={id + "Mark"}
        style={{ display: showMark ? "block" : "none" }}
      >
        {mark?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className="speaker">{speaker}</div>
    </div>
  );
}

export default Paragraph;
