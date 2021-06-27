import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { connect } from "react-redux";

import { useStyles } from "./Style";
import { fetchInfo } from "../../Redux/actionTypes";
import { Button } from "@material-ui/core";

function Header({ fetchInfo }) {
  const classes = useStyles();
  const [word, setWord] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchInfo(word);
    setWord("");
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuBookIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Saif Dictionary
          </Typography>
          <form onSubmit={handleSubmit} className={classes.searchContainer}>
            <div className={classes.search}>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={word}
                onChange={(event) => setWord(event.target.value)}
                autoCorrect='true'
              />
            </div>
            <Button
              disabled={word === "" ? true : false}
              type='submit'
              variant='contained'
              color='secondary'
              className={classes.btns}
            >
              Search
            </Button>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (word) => dispatch(fetchInfo(word)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
