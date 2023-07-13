import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  let curl = useRouter();
  const location = curl.pathname;

  const SidebarContent = (
    <Box p={2}>
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <List
          component="ul"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {Menuitems.map((item, index) => (
            <NextLink href={item.href} passHref key={item.title}>
              <ListItem
                onClick={() => handleClick(index)}
                button
                selected={location === item.href}
                sx={{
                  ...(location === item.href && {
                    color: "white",
                    backgroundColor: "#617A55",
                    borderRadius: "0 !important",
                    fontWeight: "950 !important",
                    "&:hover": {
                      backgroundColor: "#A4D0A4 !important",
                    },
                  }),
                }}
              >
                <ListItemText onClick={onSidebarClose}>
                  <Typography
                    className="myListItemText"
                    sx={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.title}
                  </Typography>
                </ListItemText>
              </ListItem>
            </NextLink>
          ))}
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="top"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="top"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          // width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
