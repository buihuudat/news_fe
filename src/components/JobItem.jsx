import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useDeleteJobMutation } from "../api/admin/adminApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  setAppliedModal,
  setCreateModal,
  setJobSelected,
} from "../slice/jobSlice";
import moment from "moment";
import "moment/locale/vi";

const JobItem = (job) => {
  moment.locale("vi");

  const { pathname } = useLocation();
  const company = job?.company;

  const [deleteJob] = useDeleteJobMutation();
  const dispatch = useDispatch();

  const Skill = ({ skill }) => {
    return (
      <Typography
        sx={{
          px: 1,
          borderRadius: 20,
          width: "max-content",
          border: "1px solid #000",
        }}
      >
        {skill}
      </Typography>
    );
  };

  const handleDelete = async () => {
    await toast.promise(deleteJob(job._id), {
      loading: "Đang xóa công việc",
      success: "Xóa công việc thành công",
      error: "Xóa công việc thất bại",
    });
  };

  const handleUpdate = () => {
    dispatch(
      setCreateModal({
        show: true,
        data: {
          job,
          company,
        },
      })
    );
  };

  const navigate = useNavigate();

  const handleViewJob = () => {
    navigate(`/${job._id}`);
    dispatch(setJobSelected(job));
  };
  const handleViewCompany = () => {
    navigate(`/${company._id}`, { company });
  };

  const handleViewUserApplied = () => {
    dispatch(setAppliedModal({ open: true, data: job?.jobApplied }));
  };

  return (
    <Paper
      elevation={5}
      sx={{
        width: 500,
        height: "max-content",

        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "white",
        padding: 1,
        m: 2,
        borderRadius: 5,
        border: `2px solid ${pathname.includes(job?._id) ? "red" : "white"}`,
      }}
    >
      <Box
        onClick={handleViewJob}
        sx={{
          padding: 2,
          width: "100%",
          height: "max-content",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "white",
        }}
      >
        <Typography sx={{ fontSize: 25, fontWeight: "600" }}>
          {job.jobTitle.toUpperCase()}
        </Typography>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar
            src={company?.image}
            variant="square"
            onClick={handleViewCompany}
            style={{ cursor: "pointer" }}
          />
          <Typography fontSize={20} pl={2}>
            {company?.name}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocationOnIcon color="error" />
            <Typography color={"red"} fontWeight={600}>
              Cách {company?.scale} km
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ApartmentIcon />
            <Typography fontWeight={600}>
              {job.jobLocation.length > 40
                ? job.jobLocation.slice(0, 40) + "..."
                : job.jobLocation}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CurrencyExchangeIcon />
            <Typography fontWeight={600}>{job.salary}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccessTimeIcon />
          <Typography fontWeight={600}>
            {moment(job.createdAt).fromNow()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {company?.skill?.map((skill, i) => (
            <Skill key={i} skill={skill} />
          ))}
        </Box>
      </Box>
      {pathname.includes("admin") && (
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: "auto" }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
          <Button
            flex={1}
            variant="outlined"
            color="success"
            onClick={handleViewUserApplied}
          >
            View {job.jobApplied.length} User Applied
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default JobItem;
