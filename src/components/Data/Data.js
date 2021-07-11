import React from "react";
import { connect } from "react-redux";
import Synonym from "./Synonym";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Header/Style";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Player from "./Player";

function Data({ searchDetails }) {
  const classes = useStyles();

  return searchDetails.loading ? (
    <h2>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </h2>
  ) : searchDetails.error ? (
    <div className='errorMessage'>
      <SentimentVeryDissatisfiedIcon style={{ fontSize: "60px" }} />
      <h1>{searchDetails.error} Please search any other word above 👆</h1>
    </div>
  ) : searchDetails && searchDetails.info.length > 0 ? (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          // padding: "5px 20px",
        }}
      >
        <h1 className='title'>
          {searchDetails.info[0].phonetics[0] && (
            <Player audioProp={searchDetails.info[0].phonetics[0].audio} />
          )}
          Meanings For Word{"  "}
          <span className='word'>
            <> "</>
            {searchDetails.info[0].word}
            <>"</>
          </span>
          <p> </p>
        </h1>
      </div>

      <div
        style={{
          // padding: "0px 5px 2px 5px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ol
          style={{
            padding: "5px 12px",
          }}
        >
          {searchDetails &&
            searchDetails.info.length > 0 &&
            searchDetails.info.map((el) =>
              el.meanings.map((el) =>
                el.definitions.map((e, i) => {
                  return (
                    <div style={{ margin: "10px", padding: "10px" }} key={i}>
                      <li>
                        <span className='color'>Definition:</span>{" "}
                        {e.definition}
                      </li>
                      {e.example && (
                        <p style={{ fontSize: "13px" }}>
                          <span className='color'>Example:</span> {e.example}
                        </p>
                      )}
                      {e.synonyms && <Synonym syn={e.synonyms} />}
                    </div>
                  );
                })
              )
            )}
        </ol>
      </div>
    </>
  ) : (
    <div className='welcome'>
      {searchDetails && searchDetails.info.length === 0 && (
        <p>
          <span className='color'> Welcome to the meanings world, </span>
          Search for meaning above 👆
        </p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searchDetails: state,
  };
};

export default connect(mapStateToProps)(Data);
