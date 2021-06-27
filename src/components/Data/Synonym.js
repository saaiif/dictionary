import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { fetchInfo } from "../../Redux/actionTypes";

function Synonym({ syn, fetchInfo }) {
  const handleClick = (el) => {
    fetchInfo(el);
  };

  return (
    <div>
      {syn && <p className='word'>Synonyms:</p>}
      {syn &&
        syn.map((el, i) => {
          return (
            <Chip
              key={i}
              avatar={<Avatar>{el[0]}</Avatar>}
              label={el}
              variant='outlined'
              className='chip'
              onClick={() => handleClick(el)}
            />
          );
        })}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (el) => dispatch(fetchInfo(el)),
  };
};

export default connect(null, mapDispatchToProps)(Synonym);
