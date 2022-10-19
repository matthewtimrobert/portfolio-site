import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Popper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../assets/utils";
import {
  setRefreshAlgo,
  setSortAmount,
  setSortingAlgo,
  setSortingSpeed,
  setSortingVisualType,
} from "../../redux/action";
import { useAppSelector } from "../../redux/configureStore";
import {
  getRefreshAlgo,
  getSortAmount,
  getSortingAlgo,
  getSortingSpeed,
  getSortingVisualType,
} from "../../redux/selector";
import "./sorting-algo.scss";
import {
  getAlgoLabel,
  getAlgoMap,
  getVisualLabel,
  getVisualMap,
  SortingAlgos,
  SortingVisualType,
} from "./sortingAlgosHelpers";

const SortingVisualMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sortingAlgo = useAppSelector(getSortingAlgo);
  const sortingSpeed = useAppSelector(getSortingSpeed);
  const refreshAlgo = useAppSelector(getRefreshAlgo);
  const sortAmount = useAppSelector(getSortAmount);
  const sortingVisualType = useAppSelector(getSortingVisualType);

  const [localSortAmount, setLocalSortAmount] = useState(sortAmount);
  const debouncedLocalSortAmount = useDebounce(localSortAmount, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedLocalSortAmount === localSortAmount)
      dispatch(setSortAmount(localSortAmount));
  }, [debouncedLocalSortAmount, localSortAmount, dispatch]);

  return (
    <div className="anchor">
      <Button
        variant="contained"
        className="sort-visual-button"
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
          <FormControl>
            <Typography sx={{ p: 2 }}>Configure Sorting Settings</Typography>
            <TextField
              value={sortingAlgo}
              label="Algorithim"
              fullWidth
              select
              onChange={(e) =>
                dispatch(setSortingAlgo(e.target.value as SortingAlgos))
              }
              style={{
                marginBottom: "10px",
              }}
            >
              {getAlgoMap().map((sortingAlgo) => (
                <MenuItem key={sortingAlgo} value={sortingAlgo}>
                  {getAlgoLabel(sortingAlgo)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={sortingVisualType}
              label="Sorting Visual Type"
              fullWidth
              select
              onChange={(e) =>
                dispatch(
                  setSortingVisualType(e.target.value as SortingVisualType)
                )
              }
              style={{
                marginBottom: "10px",
              }}
            >
              {getVisualMap().map((sortingVisual) => (
                <MenuItem key={sortingVisual} value={sortingVisual}>
                  {getVisualLabel(sortingVisual)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Speed (%)"
              fullWidth
              type="number"
              value={sortingSpeed || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 100) {
                  dispatch(setSortingSpeed(100));
                } else if (val < 0) {
                  dispatch(setSortingSpeed(1));
                } else {
                  dispatch(setSortingSpeed(val));
                }
              }}
              style={{
                marginTop: "10px",
              }}
            />
            <Slider
              value={sortingSpeed}
              size="small"
              max={100}
              min={1}
              onChange={(_e, val) => {
                if (val > 100) {
                  dispatch(setSortingSpeed(100));
                } else if (val < 0) {
                  dispatch(setSortingSpeed(1));
                } else {
                  dispatch(setSortingSpeed(val as number));
                }
              }}
            />
            <TextField
              label="Amount to sort"
              fullWidth
              type="number"
              value={localSortAmount || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 100) {
                  setLocalSortAmount(100);
                } else if (val < 0) {
                  setLocalSortAmount(1);
                } else {
                  setLocalSortAmount(val);
                }
              }}
              style={{
                marginTop: "10px",
              }}
            />
            <Slider
              value={localSortAmount}
              size="small"
              max={100}
              min={1}
              onChange={(_e, val) => {
                if (val > 100) {
                  setLocalSortAmount(100);
                } else if (val < 0) {
                  setLocalSortAmount(1);
                } else {
                  setLocalSortAmount(val as number);
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              style={{
                marginTop: "10px",
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
