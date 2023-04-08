import React from "react";
import cls from "./Leftbar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Link } from "react-router-dom";

const Leftbar = () => {
  return (
    <div className={cls.leftbar}>
      <div className={cls.container}>
        <Link to="/">
          <h2>ECOMM.</h2>
        </Link>
        <Link to="/admin">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
          style={{ padding: "2rem", color: "aliceblue" }}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/create-product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
        <Link to="/admin/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon />
            Reviews
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Leftbar;
