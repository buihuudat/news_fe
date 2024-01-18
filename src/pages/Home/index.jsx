import { useState } from "react";
import Filter from "../../components/home/Filter";
import { Box, Typography } from "@mui/material";
import FilterData from "../../components/home/FilterData";
import ApplyModal from "../../components/ApplyModal";
import NotificationModal from "../../components/NotificationModal";
import { useGetJobsQuery } from "../../api/admin/adminApi";
import JobNotFound from "../../components/home/JobNotFound";
import home1 from "../../sources/home-1.png";
import home2 from "../../sources/home-2.png";
import home3 from "../../sources/home-3.png";
import { useDispatch } from "react-redux";
import { setJobSelected } from "../../slice/jobSlice";

const Home = () => {
  const { data } = useGetJobsQuery();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    salary: "",
    scale: "",
    wotkingForm: "",
    time: "",
  });

  const dispatch = useDispatch();

  const handleSearch = () => {
    let jobFiltered = [];

    if (searchQuery) {
      const queryLowerCase = searchQuery.toLowerCase();
      jobFiltered = data.filter(
        (job) =>
          job.jobSkills.toLowerCase().includes(queryLowerCase) ||
          job?.company?.name.toLowerCase().includes(queryLowerCase)
        // job.jobDescription.toLowerCase().includes(queryLowerCase)
      );
    }

    if (dataFilter.salary !== "") {
      jobFiltered = jobFiltered.filter(
        (job) => job.salary === dataFilter.salary
      );
    }

    if (dataFilter.scale !== "") {
      jobFiltered = jobFiltered.filter((job) => job.scale === dataFilter.scale);
    }

    if (dataFilter.wotkingForm !== "Cả hai" && dataFilter.wotkingForm !== "") {
      console.log(jobFiltered, dataFilter.wotkingForm);
      jobFiltered = jobFiltered.filter(
        (job) => job.wotkingForm === dataFilter.wotkingForm
      );
    }

    if (dataFilter.time !== "") {
      jobFiltered = jobFiltered.filter((job) => job.time === dataFilter.time);
    }

    if (jobFiltered.length) {
      dispatch(setJobSelected(jobFiltered[0]));
    }

    setJobs(jobFiltered);
    setOnSearch(true);
  };

  return (
    <Box>
      <Filter
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dataFilter={dataFilter}
        setDataFilter={setDataFilter}
      />
      {!jobs.length && searchQuery !== "" && onSearch ? (
        <JobNotFound />
      ) : jobs?.length ? (
        <FilterData jobs={jobs} />
      ) : (
        <Box sx={{ background: "white", width: "100%", padding: 5 }}>
          <Typography
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: 600,
              fontSize: 30,
            }}
          >
            Công cụ tốt nhất cho hành trang ứng tuyển của bạn
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "space-around",
              pt: 10,
            }}
          >
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={home1}
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Danh sách việc làm "chất" liên tục cập nhật các lựa chọn mới
                nhất theo thị trường và xu hướng tìm kiếm.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={home2}
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Kiến tạo hồ sơ với bố cục chuẩn mực, chuyên nghiệp dành riêng
                cho ngành IT, được nhiều nhà tuyển dụng đề xuất.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={home3}
                alt="im2"
                style={{ height: 300, width: "auto", objectFit: "cover" }}
              />
              <Typography sx={{ fontSize: 20, pt: 5, textAlign: "center" }}>
                Đừng bỏ lỡ cơ hội cập nhật thông tin lương thưởng, chế độ làm
                việc, nghề nghiệp và kiến thức ngành IT.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <ApplyModal />
      <NotificationModal />
    </Box>
  );
};

export default Home;
