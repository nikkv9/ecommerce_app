import React, { useState } from "react";
import cls from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/user-action";
import { Alert, Avatar, Button, Menu, MenuItem } from "@mui/material";

const Header = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const { authenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login-signup");
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={cls.header}>
        <div className={cls.left}>
          <Link to="/">
            <h2>E-COMM.</h2>
          </Link>
        </div>

        <div className={cls.mid}>
          <div className={cls.search}>
            <form className={cls.form} onSubmit={searchHandler}>
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <SearchIcon className={cls.searchIcon} />
            </form>
          </div>
        </div>
        <div className={cls.right}>
          <Link to="/products">
            <p>PRODUCTS</p>
          </Link>

          {!authenticated && (
            <Link to="/login-signup">
              <p>LOGIN</p>
            </Link>
          )}

          {authenticated && (
            <>
              <Link to="/cart">
                <div className={cls.cart}>
                  <ShoppingCartOutlinedIcon
                    className={cls.cartIcon}
                    style={{
                      fontSize: "2rem",
                      color: cartItems.length > 0 ? "teal" : "unset",
                    }}
                  />
                  <div className={cls.counter}>{cartItems.length}</div>
                </div>
              </Link>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar src={user.avatar.url} className={cls.avatar} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className={cls.menu}>
                  <MenuItem className={cls.menuItem}>
                    <Link to="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem className={cls.menuItem}>
                    <Link to="/orders">Orders</Link>
                  </MenuItem>
                  <MenuItem className={cls.menuItem}>
                    <Link to="/products">Products</Link>
                  </MenuItem>

                  {user.role === "admin" && (
                    <MenuItem className={cls.menuItem}>
                      <Link to="/admin">Dashboard</Link>
                    </MenuItem>
                  )}

                  <MenuItem className={cls.menuItem} onClick={logoutHandler}>
                    Logout
                  </MenuItem>
                </div>
              </Menu>
            </>
          )}
        </div>
      </div>
      {alert && (
        <Alert
          severity="info"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          You have logged out!
        </Alert>
      )}
    </>
  );
};

export default Header;
