import React from "react";

export const MessageComponent = props => {
  const { message } = props;

  return <div className="message-component">{message}</div>;
};
