import {
  Avatar,
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { setModal } from "../../slice/userSlice";
import ProfileModal from "../../components/ProfileModal";
import moment from "moment";
import { useCheckAuthMutation } from "../../api/user/userApi";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const [checkAuth, { isLoading }] = useCheckAuthMutation();

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setModal({ show: true }));
  };

  return isLoading || !user ? (
    <LinearProgress />
  ) : (
    <Box>
      <Box sx={{ width: "100%", background: "white", padding: 3 }}>
        <Typography fontWeight={600} color={"red"} fontSize={25}>
          Hồ Sơ
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#ddd",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
          py: 5,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 5,
            width: 700,
            borderRadius: 5,
          }}
          elevation={9}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                pb: 2,
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{ width: 80, height: 80 }}
                alt="avt-user"
              />
              <Typography fontWeight={600} fontSize={23}>
                {user?.name?.toUpperCase() || user?.username?.toUpperCase()}
              </Typography>
            </Box>
            <IconButton onClick={handleEdit}>
              <BorderColorIcon color="error" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 3,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MailOutlineIcon />
                <Typography>{user?.email}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon />
                <Typography>{user?.phone || "Chưa cung cấp"}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon />
                <Typography>{user?.address || "Chưa cung cấp"}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon />
                <Typography>
                  {user?.gender === "male" ? "Nam" : "Nữ"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CardGiftcardIcon />
                <Typography>{moment(user?.birthday).format("l")}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SocialDistanceIcon />
                <Typography>{user?.social}</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={9}
          sx={{ background: "#fff", width: 700, borderRadius: 5 }}
        >
          <Typography fontWeight={600} p={3} fontSize={23}>
            Giới thiệu bản thân
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Typography p={3}>{user?.description}</Typography>
        </Paper>
      </Box>
      <ProfileModal />
    </Box>
  );
};

export default Profile;
