import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/notFound/NotFound";
import AuthLayout from "../components/layout/AuthLayout/AuthLayout";
import BoardingList from "../pages/boarding/BoardingList";
import BoardingDetail from "../pages/boarding/BoardingDetail";
import ApartmentFullhouseList from "../pages/apartmentFullHouse/ApartmentFullhouseList";
import ApartmentFullHouseDetail from "../pages/apartmentFullHouse/ApartmentFullHouseDetail";
import LookingForRoommatesDetail from "../pages/lookingForRoommates/LookingForRoommatesDetail";
import LookingForRoommatesList from "../pages/lookingForRoommates/LookingForRoommatesList";
import Account from "../pages/account";
import ChangePassword from "../pages/account/ChangePassword";
import Innkeeper from "../pages/innkeeper";
import Reviews from "../pages/innkeeper/Reviews";
import ManageBoarding from "../pages/innkeeper/ManageBoarding";
import Membership from "../pages/innkeeper/Membership";
import Pricing from "../pages/innkeeper/Pricing";
import History from "../pages/innkeeper/History";
import AddFunds from "../pages/addFunds";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";


const Router = () => {
  return (
    <Routes>
      {/* <Route element={<UnAuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/show-component" element={<ShowComponent />} />
      </Route> */}

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boarding" element={<BoardingList />} />
        <Route path="/boarding/:id" element={<BoardingDetail />} />
        <Route path="/apartment-fullhouse" element={<ApartmentFullhouseList />} />
        <Route path="/apartment-fullhouse/:id" element={<ApartmentFullHouseDetail />} />
        <Route path="/looking-for-roommates" element={<LookingForRoommatesList />} />
        <Route path="/looking-for-roommates/:id" element={<LookingForRoommatesDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/change-password" element={<ChangePassword />} />
        <Route path="/innkeeper" element={<Innkeeper />} />
        <Route path="/history" element={<History />} />
        <Route path="/manage-boarding" element={<ManageBoarding />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/addfunds" element={<AddFunds />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
