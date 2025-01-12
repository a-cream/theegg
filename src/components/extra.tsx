import { Component } from "react";
import SignImg from "../assets/decoration/sign.png";
import BorderImg from "../assets/decoration/wood.jpg";

interface ExtraProps {
  name: string
}

export default class Extra extends Component<ExtraProps> {
  constructor(props: ExtraProps) {
    super(props)
  }

  private Name(): JSX.Element {
    const { name } = this.props;
    const borderWidth = 10;

    return (
      <div style={{
        position: "relative",
        top: "0",
        right: "20rem",
        marginLeft: "45rem",
        height: "8rem",
        borderImage: `url(${BorderImg}) 50 round`,
        borderLeft: `${borderWidth}px solid`,
        borderBottom: `${borderWidth}px solid`,
      }}>
        <img src={SignImg} height="250" width="250" style={{
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
          wordBreak: "break-word"
        }}>
          <p contentEditable="true" onBeforeInput={(e) => {
            if (e.currentTarget.textContent) {
              if (e.currentTarget.textContent.length >= 20) {
                e.preventDefault();
              }
            } else {
              throw new Error("e.currentTarget.textContent is null");
            }
          }} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "1rem",
            color: "transparent",
            textAlign: "center",
            textShadow: "0.5px 0.5px 2px rgba(0,0,0,0.5), -0.5px -0.5px 2px rgba(0,0,0,0.5)",
            outline: "none",
            userSelect: "none",
          }}>{name}</p>
        </div>
      </div>
    )
  }

  render() {
    const Name = this.Name.bind(this);
    return (
      <Name />
    )
  }
}
