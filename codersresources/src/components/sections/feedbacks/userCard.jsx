import React, { useState } from "react";
import Cookies from "universal-cookie";

export default function UserCard() {
  const cookie = new Cookies();
  const [userName] = useState(cookie.get("userName") || "");
  return(
    <div>
      <div style={style.userCard}>{userName}</div>
    </div>
  )
}

const style = {
  userCard:{
 backgroundColor: 'rgba(0, 115, 255, 0.06)',
    color: '#58A6FF',
    textAlign: 'center',
    padding: '5px 0',
    position: 'relative',
    top: 0,
    height: '40px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '8px',
    width: '40%',
    left: '32%',
    marginTop: 15,
    minWidth: 0,
    maxWidth: '100vw',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
  }
}