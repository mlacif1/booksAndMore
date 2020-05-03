import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, makeStyles, Box } from "../Main/node_modules/@material-ui/core";
import { validateSearchText } from "../../util";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export const FormDialog = props => {
  const language = useSelector(state => state.language.language);
  const localeData = require(`./translations/${language}.json`);

  const styles = useStyles();

  const { open, hideDialog, title, text, acceptText, handleAccept } = props;
  const [searchText, setSearchText] = useState("");
  const handleClose = () => {
    hideDialog();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
        className={styles.dialog}
      >
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        <DialogContent className={styles.dialogContainer}>
          {text && (
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          )}
          <Box className={styles.box}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder={localeData.search}
              className={styles.input}
              InputProps={{
                style:{
                  color: "white"
                }
              }}
            />
            {!acceptText && (
              <Box
                className={`${styles.icon} ${!validateSearchText(searchText) ? styles.iconDisabled : ''}`}
                onClick={() => handleAccept(searchText)}
              >
                <FontAwesomeIcon size="lg" icon={faSearch} />
              </Box>
            )}
          </Box>
        </DialogContent>
        {acceptText && (
          <DialogActions className={styles.actions}>
            <Button
              onClick={handleClose}
              color="primary"
              className={styles.actionButton}
            >
              Cancel
            </Button>
            <Button
              disabled={!validateSearchText(searchText)}
              onClick={() => handleAccept(searchText)}
              color="primary"
              autoFocus
              className={styles.actionButton}
            >
              {acceptText}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: "space-between"
  },
  actionButton: {
    fontWeight: 700
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 16px"
  },
  dialogContainer: {
    padding: "initial !important"
  },
  input: {
    color: "white",
    "& .MuiInput-underline:after" : {
      transform: "scaleX(1) !important",
      borderBottom: "solid 2px white !important"
    }
  },
  icon: {
    marginLeft: 8,
    cursor: "pointer",
    color: "white"
  },
  iconDisabled: {
    color: "#888"
  },
  dialog: {
    bottom: "initial !important",
    top: "30% !important",
    "& .MuiDialog-paper": {
      backgroundColor: "transparent",
      boxShadow: "none"
    },
    "& .MuiBackdrop-root" :{
      backgroundColor: "rgba(0, 0, 0, 0.75)"
    }
  }
}));
