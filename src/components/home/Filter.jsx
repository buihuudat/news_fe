import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { data } from "../../sources/data";
import { useId } from "react";

const SelectActions = ({
  name,
  data = [],
  keyName,
  dataFilter,
  setDataFilter,
}) => {
  const id = useId();
  return (
    <FormControl sx={{ background: "white", borderRadius: 2 }} fullWidth>
      <InputLabel>{name}</InputLabel>
      <InputLabel
        htmlFor={id}
        sx={{
          color: "red",
        }}
      >
        {name}
      </InputLabel>
      <Select
        value={dataFilter[keyName]}
        label={name}
        onChange={(e) =>
          setDataFilter((prev) => ({
            ...prev,
            [keyName]: e.target.value,
          }))
        }
        inputProps={{
          name: { id },
          id: id,
        }}
      >
        {data.map((v, i) => (
          <MenuItem value={v.value} key={i}>
            {v.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Filter = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
  dataFilter,
  setDataFilter,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Button
        sx={{
          background: "white",
          p: 1,
          gap: 3,
          width: 200,
          height: "max-content",
          borderRadius: 5,
          ":hover": {
            background: "white",
          },
        }}
      >
        <LocationOnIcon sx={{ color: "black", fontSize: "16" }} />
        <Typography
          color={"black"}
          fontWeight={600}
          fontSize={25}
          width={"60%"}
        >
          ABC
        </Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
          flex: 1,
        }}
      >
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
          <TextField
            placeholder="Nhập từ khóa kỹ năng, công ty,..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            sx={{ width: "70%", backgroundColor: "white", borderRadius: 2 }}
          />
          <Box sx={{ width: "30%" }}>
            <SelectActions
              name="Mức lương"
              keyName="salary"
              data={data.salary}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
          <Box sx={{ width: "70%", display: "flex", gap: 2 }}>
            <SelectActions
              name="Khoảng cách"
              data={data.scale}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
              keyName={"scale"}
            />
            <SelectActions
              name="Hình thức làm việc"
              data={data.workForm}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
              keyName={"wotkingForm"}
            />
          </Box>
          <Box sx={{ width: "30%" }}>
            <SelectActions
              name="Thời gian"
              data={data.time}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
              keyName={"time"}
            />
          </Box>
        </Box>
      </Box>
      <Button
        sx={{
          display: "flex",
          background: "red",
          height: "max-content",
          borderRadius: 5,
          padding: 1,
          mt: "auto",
          alignItems: "center",
          ":hover": {
            background: "red",
          },
        }}
        onClick={handleSearch}
      >
        <LocationOnIcon sx={{ color: "white" }} />
        <Typography color={"white"} fontWeight={600} fontSize={20}>
          Tìm kiếm
        </Typography>
      </Button>
    </Box>
  );
};

export default Filter;
