import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

export const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex"
  },
  switchBase: {
    padding: 2,
    color: "rgb(55, 146, 142)",
    "&$checked": {
      transform: "translateX(12px)",
      color: "rgb(55, 146, 142)",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#d8ecd7",
        borderColor: theme.palette.grey[500]
      }
    },
    "& input": {
      margin: "initial"
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none"
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#d8ecd7"
  },
  checked: {}
}))(Switch);
