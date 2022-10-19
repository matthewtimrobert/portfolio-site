import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setRefreshAlgo,
  setSortAmount,
  setSortingAlgo,
  setSortingSpeed,
} from "../../redux/action";
import { useAppSelector } from "../../redux/configureStore";
import {
  getRefreshAlgo,
  getSortAmount,
  getSortingAlgo,
  getSortingSpeed,
} from "../../redux/selector";
import "./sorting-algo.scss";
import { getLabel, getMap, SortingAlgos } from "./sortingAlgosHelpers";
const SortingVisualMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sortingAlgo = useAppSelector(getSortingAlgo);
  const sortingSpeed = useAppSelector(getSortingSpeed);
  const refreshAlgo = useAppSelector(getRefreshAlgo);
  const sortAmount = useAppSelector(getSortAmount);

  const dispatch = useDispatch();
  return (
    <div className="main-visualizer-menu anchor">
      <Button
        variant="contained"
        aria-controls={!!anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl ? "true" : undefined}
        onClick={(e) =>
          !!anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget)
        }
      >
        Settings
      </Button>
      <Popper open={!!anchorEl} anchorEl={anchorEl}>
        <Paper style={{ padding: "5px" }}>
          <Typography sx={{ p: 2 }}>Configure Sorting Settings</Typography>

          <FormControl fullWidth>
            <InputLabel>Algorithim</InputLabel>
            <Select
              value={sortingAlgo}
              label="Algorithim"
              fullWidth
              onChange={(e) =>
                dispatch(setSortingAlgo(e.target.value as SortingAlgos))
              }
              style={{
                marginBottom: "10px",
              }}
            >
              {getMap().map((sortingAlgo) => (
                <MenuItem key={sortingAlgo} value={sortingAlgo}>
                  {getLabel(sortingAlgo)}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Speed (ms)"
              fullWidth
              type="number"
              value={sortingSpeed}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 5000) {
                  dispatch(setSortingSpeed(5000));
                } else if (val < 0) {
                  dispatch(setSortingSpeed(1));
                } else {
                  dispatch(setSortingSpeed(val));
                }
              }}
              style={{
                marginBottom: "10px",
              }}
            />
            <TextField
              label="Amount to sort"
              fullWidth
              type="number"
              value={sortAmount}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 500) {
                  dispatch(setSortAmount(500));
                } else if (val < 0) {
                  dispatch(setSortAmount(1));
                } else {
                  dispatch(setSortAmount(val));
                }
              }}
              style={{
                marginBottom: "10px",
              }}
            />
            <Button
              fullWidth
              variant="contained"
              style={{
                marginBottom: "10px",
              }}
              onClick={() => dispatch(setRefreshAlgo(!refreshAlgo))}
            >
              Restart
            </Button>
          </FormControl>
        </Paper>
      </Popper>
    </div>
  );
};

export default SortingVisualMenu;
