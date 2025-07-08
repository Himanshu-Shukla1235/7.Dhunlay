import { useState } from "react";
import { messages } from "../../data/data";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "./Message.css";

export default function MessageList() {
  const [openMessageId, setOpenMessageId] = useState(null);
  const [readMessages, setReadMessages] = useState([]);

  const handleToggleMessage = (id) => {
    if (openMessageId === id) {
      setOpenMessageId(null);
    } else {
      setOpenMessageId(id);
      if (!readMessages.includes(id)) {
        setReadMessages([...readMessages, id]);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {messages.map((item) => {
        const words = item.description.trim().split(" ");
        const isExpanded = openMessageId === item.id;
        const isLong = words.length > 10;
        const displayText = isExpanded
          ? item.description
          : isLong
          ? words.slice(0, 10).join(" ") + "..."
          : item.description;

        return (
          <div key={item.id}>
            <div className="message-wrapper">
              <div className="message-header">
                <img src={item.dp} alt="profile" />
                <span className="message-username">{item.username}</span>
                <div className="message-date-time">
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                  {!readMessages.includes(item.id) && (
                    <span className="green-dot" />
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      borderRadius: "50%",
                      minWidth: "35px",
                      width: "35px",
                      height: "35px",
                      padding: 0,
                      color: "white",
                      borderColor: "white",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </div>
              </div>

              <div className="message-title">{item.title}</div>

              <div
                className={`message-description ${
                  isExpanded ? "expanded" : ""
                }`}
              >
                <p style={{ marginBottom: "30px" }}>{displayText}</p>
                {isLong && (
                  <div
                    className="see-more-btn"
                    onClick={() => handleToggleMessage(item.id)}
                  >
                    {isExpanded ? "see less" : "see more"}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
