import React, { useState } from "react";
import cls from "./Footer.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const sendMsg = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/contact-us",
        {
          name,
          email: user.email,
          msg,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className={cls.footer}>
      <div className={cls.container}>
        <div className={cls.contact}>
          <h1>CONTACT US</h1>
          <div className={cls.contactBox}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              readOnly
            />
            <textarea
              name=""
              id=""
              cols="25"
              rows="5"
              placeholder="Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={sendMsg}>SEND</button>
          </div>
        </div>
        <div className={cls.social}>
          <h1>CONNECT WITH US</h1>
          <div className={cls.socialLinks}>
            <a href="https://github.com/nikkv9">
              <GitHubIcon className={cls.muiIcons} />
            </a>
            <a href="https://www.linkedin.com/in/nikkv9/">
              <LinkedInIcon className={cls.muiIcons} />
            </a>
            <a href="https://www.instagram.com/nikk_v9/">
              <InstagramIcon className={cls.muiIcons} />
            </a>
          </div>
        </div>
      </div>
      <p>&copy; 2022 ECOMM-APP. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
