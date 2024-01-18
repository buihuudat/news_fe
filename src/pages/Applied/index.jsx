import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useGetJobsAppliedQuery } from "../../api/user/userApi";
import JobItem from "../../components/JobItem";
import { useSelector } from "react-redux";
import moment from "moment";

const Applied = () => {
  const { data, isLoading } = useGetJobsAppliedQuery();
  const user = useSelector((state) => state.user.user);
  const cvApplied = (job) => job?.find((d) => d.userId === user?._id);

  return (
    <Box sx={{ height: "100vh", backgroundColor: "white", overflow: "auto" }}>
      <Typography textAlign={"center"} fontWeight={600} fontSize={32}>
        Bạn đã ứng tuyển {data?.length} công việc
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          flexGrow: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress color="error" />
        ) : (
          data?.map((job) => (
            <Paper key={job._id}>
              <Typography fontStyle={"italic"}>
                Ngày ứng tuyển: {moment(job?.createdAt).format("lll")}
              </Typography>
              <JobItem {...job} />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <a
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                  href={cvApplied(job.jobApplied)?.file?.file}
                  download={
                    cvApplied(job.jobApplied)?.file?.newName ||
                    cvApplied(job.jobApplied)?.file?.name
                  }
                >
                  Xem CV Đã ứng tuyển
                </a>
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Applied;
