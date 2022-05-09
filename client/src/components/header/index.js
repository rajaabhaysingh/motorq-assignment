import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import clsx from "clsx";

// styling
import { Button, Hidden, IconButton, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/globalStyles";

// components
import { Divide as Hamburger } from "hamburger-react";
import SideDrawer from "./SideDrawer";

// assets
import logoLight from "../../assets/img/logo_light.png";
import logoDark from "../../assets/img/logo_dark.png";

// colors

// icons
import {
  Brightness4TwoTone,
  BrightnessHighTwoTone,
  Add,
} from "@material-ui/icons";

// redux
import {
  changeFilter,
  themeAction,
  toggleAddVehicle,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  searchVisible: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "84px",
      transition: "ease-in 0.25s",
    },
  },
  searchHidden: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
  },
  headerMain: {
    backgroundColor: theme.palette.background.bg,
    width: "100%",
    minHeight: "60px",
    boxShadow: theme.shadows[1],
    padding: "0 8px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      color: theme.palette.text.white,
      borderBottom:
        theme.palette.type === "light"
          ? "none"
          : `1px solid ${theme.palette.divider}`,
    },
  },
  logo: {
    marginLeft: "16px",
    height: "32px",
    width: "200px",
    backgroundImage:
      theme.palette.type === "light" ? `url(${logoDark})` : `url(${logoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "24px",
      width: "160px",
      marginLeft: "8px",
      backgroundImage: `url(${logoLight})`,
    },
  },
  subheader: {
    width: "100%vw",
    height: "32px",
    padding: "0 24px",
    boxShadow: theme.shadows[6],
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.background.bg
        : theme.palette.background.paperLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  filtersOptions: {
    fontSize: "0.85rem",
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px",
      height: "28px",
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  input: {
    border: `1px solid ${theme.palette.divider}`,
    outline: "none",
    padding: "2px 4px",
    width: "100px",
    borderRadius: 4,
    fontSize: "0.7rem",
    marginLeft: 8,
  },
  link: {
    alignSelf: "flex-end",
    width: "100%",
    color: theme.palette.primary.main,
    padding: "8px",
    textDecoration: "none",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

const Header = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const helper = useSelector((state) => state.helper);

  let initialFilterState = {
    count: 500,
    vin: "",
    driver: "",
    licensePlate: "",
  };

  // local state management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterParams, setFilterParams] = useState(initialFilterState);

  // headerlinks
  const headerlinks = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <i className="fas fa-home mar_r-4"></i>,
    },
    {
      title: "Vehicles",
      link: "/vehicles",
      icon: <i className="fas fa-car mar_r-4"></i>,
    },
  ];

  React.useEffect(() => {
    let queryString = new URLSearchParams(filterParams);
    dispatch(changeFilter(queryString.toString()));
  }, [filterParams]);

  //   handleInputChange
  const handleInputChange = (e) => {
    setFilterParams({
      ...filterParams,
      [e.target.name]: e.target.value,
    });
  };

  // handleFilterSubmit
  const handleFilterSubmit = () => {
    dispatch(changeFilter(new URLSearchParams(filterParams).toString()));
  };

  // handleResetFilter
  const handleResetFilter = () => {
    setFilterParams(initialFilterState);
  };

  // handleThemeToggle
  const handleThemeToggle = () => {
    if (helper.themeName === "light") {
      dispatch(themeAction("dark"));
    } else {
      dispatch(themeAction("light"));
    }
  };

  // handleAddVehicle
  const handleAddVehicle = () => {
    dispatch(toggleAddVehicle(true));
    history.push("/dashboard");
  };

  return (
    <div className={cls.searchHidden} style={{ zIndex: "9999" }}>
      <div className={cls.headerMain}>
        <div className="fc">
          {/* mob view */}
          <Hidden mdUp implementation="css">
            <Hamburger
              rounded
              size={24}
              label="Show menu"
              toggled={isMenuOpen}
              toggle={setMenuOpen}
              hideOutline={false}
            />
            <SideDrawer
              isMenuOpen={isMenuOpen}
              setMenuOpen={setMenuOpen}
              headerlinks={headerlinks}
            />
          </Hidden>
          <Link to="/" className="fc">
            <div className={cls.logo}></div>
          </Link>
          <Hidden smDown implementation="css">
            <div className="mar_l-32 tagline">A perfect vehicle tracker</div>
          </Hidden>
        </div>
        <div className="fc">
          {/* for mobile */}
          <Hidden mdUp implementation="css">
            <IconButton color="inherit" onClick={handleAddVehicle}>
              <Add />
            </IconButton>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {helper.themeName === "light" ? (
                <Brightness4TwoTone />
              ) : (
                <BrightnessHighTwoTone />
              )}
            </IconButton>
          </Hidden>
          {/* for pc */}
          <Hidden smDown implementation="css">
            <div className="fc">
              <Button
                style={{ borderRadius: 50, marginRight: 16 }}
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleAddVehicle}
                startIcon={<Add />}
              >
                Add Vehicle
              </Button>
              <IconButton color="primary" onClick={handleThemeToggle}>
                {helper.themeName === "light" ? (
                  <Brightness4TwoTone />
                ) : (
                  <BrightnessHighTwoTone />
                )}
              </IconButton>
            </div>
          </Hidden>
        </div>
      </div>
      <div className={cls.subheader}>
        <div className="fc">
          {headerlinks.map((link, i) => (
            <NavLink
              exact
              to={link.link}
              key={i}
              className={globalCls.navLink}
              activeClassName={globalCls.navLinkActive}
            >
              {link.icon} {link.title}
            </NavLink>
          ))}
        </div>
        <form
          className={clsx(cls.filtersOptions, "sb_hid")}
          onSubmit={handleFilterSubmit}
        >
          {isFilterOpen ? (
            <div
              className="fc cur"
              onClick={() => {
                setIsFilterOpen(false);
              }}
            >
              <i className="fas fa-times mar_r-16"></i>
              <span className="mar_r-16">Close filter</span>
            </div>
          ) : (
            <div
              className="fc cur"
              onClick={() => {
                setIsFilterOpen(true);
              }}
            >
              <i className="fas fa-filter mar_r-16"></i>
              <span className="">Open filters</span>
            </div>
          )}
          {isFilterOpen && (
            <>
              <span className={clsx(globalCls.txtSmSec)}>Count:</span>
              <input
                type="text"
                name="count"
                onChange={handleInputChange}
                value={filterParams.count}
                className={cls.input}
              />
              <span className={clsx(globalCls.txtSmSec, "mar_l-16")}>VIN:</span>
              <input
                type="text"
                name="vin"
                onChange={handleInputChange}
                value={filterParams.vin}
                className={cls.input}
              />
              <span className={clsx(globalCls.txtSmSec, "mar_l-16")}>
                Driver:
              </span>
              <input
                type="text"
                name="driver"
                onChange={handleInputChange}
                value={filterParams.driver}
                className={cls.input}
              />
              <span className={clsx(globalCls.txtSmSec, "mar_l-16")}>
                License:
              </span>
              <input
                type="text"
                name="licensePlate"
                onChange={handleInputChange}
                value={filterParams.licensePlate}
                className={cls.input}
              />
              <span
                className={clsx(globalCls.txtSmPriCol, "mar_l-16 cur")}
                onClick={handleResetFilter}
              >
                Reset
              </span>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Header;
