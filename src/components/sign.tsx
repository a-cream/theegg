import { game, setGame } from "./game";

// Ensure game.name is initialized
if (!game.name) {
  setGame("name", e => e = "Nothing");
}

import SignImg from "../assets/decoration/sign.png";
import BorderImg from "../assets/decoration/wood.jpg";

export const Sign = () => {
  return (
    <div style={{
      position: "relative",
      top: "0",
      right: "20rem",
      "margin-left": "45rem",
      height: "8rem",
      "border-image": `url(${BorderImg}) 50 round`,
      "border-left": "10px solid",
      "border-bottom": "10px solid",
    }}>
      <img src={SignImg} height="250" width="250"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}></img>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        height: "80px",
        width: "220px",
        "word-break": "break-word"
      }}>
        <p contenteditable={true} spellcheck={false}
          onBeforeInput={(e) => {
            if (e.currentTarget.textContent) {
              const inputType = e.inputType;
              const isDeletion = inputType === "deleteContentBackward" || inputType === "deleteContentForward";
              if (e.currentTarget.textContent.length >= 20 && !isDeletion) {
                e.preventDefault();
              }
            } 
          }}
          onInput={(e) => {
            if (e.currentTarget.textContent) {
              const content: string = e.currentTarget.textContent;
              const selection = window.getSelection();
              const range = selection?.getRangeAt(0);
              const startOffset = range?.startOffset || 0;
              const endOffset = range?.endOffset || 0;

              setGame("name", v => v = content);

              if (e.currentTarget.textContent.length <= 1) {
                e.currentTarget.style.width = "100px";
                e.currentTarget.style.height = "20px";
              } else {
                e.currentTarget.style.width = "";
                e.currentTarget.style.height = "";
              }
              if (range) {
                range.setStart(e.currentTarget.firstChild || e.currentTarget, startOffset);
                range.setEnd(e.currentTarget.firstChild || e.currentTarget, endOffset);
                selection?.removeAllRanges();
                selection?.addRange(range);
              }
            }
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            "font-size": "1rem",
            "font-weight": "bold",
            color: "whitesmoke",
            "text-align": "center",
            "text-shadow": "0.5px 0.5px 2px rgba(0,0,0,0.5), -0.5px -0.5px 2px rgba(0,0,0,0.5)",
            outline: "none",
            "user-select": "none",
          }}>
          {game.name}
        </p>
      </div>
    </div>
  )
}
