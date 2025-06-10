import {
  Route,
  BrowserRouter as Router,
  Routes,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchIngredients } from "./services/burger-ingredients-slice";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/Forgot-password";
import { ResetPassword } from "./pages/Reset-password";
import { Profile } from "./pages/Profile";
import { IngredientPage } from "./pages/Ingredient-page";
import { NotFound404 } from "./pages/Not-found-404";
import ProtectedRouteElement from "./services/protected-route";
import { useAppDispatch, RootState } from "./services/store";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import {
  hideIngredient,
  showIngredient,
} from "./services/ingredient-details-slice";

const ModalSwitch = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const background = location.state?.background;
  const selectedIngredient = useSelector(
    (state: RootState) => state.ingredientDetails.selectedIngredient
  );
  const data = useSelector((state: RootState) => state.burgerIngredients.data);
  const isLoading = useSelector(
    (state: RootState) => state.burgerIngredients.isLoading
  );

  useEffect(() => {
    if (!isLoading && data.length > 0 && params.id) {
      const ingredient = data.find((item) => item._id === params.id);
      if (ingredient) {
        dispatch(showIngredient(ingredient));
      } else {
        dispatch(hideIngredient());
      }
    } else if (!params.id) {
      dispatch(hideIngredient());
    }
  }, [params.id, data, isLoading, dispatch]);

  const closeModal = () => {
    dispatch(hideIngredient());
    navigate("/");
  };

  const renderBackground = () => {
    if (background) {
      return <Home />;
    }
    if (location.pathname.startsWith("/ingredients/")) {
      return <Outlet />;
    }
    return <Home />;
  };

  return (
    <>
      {renderBackground()}
      {params.id && background && selectedIngredient && (
        <Modal
          onCloseButtonClick={closeModal}
          headerText="Детали ингредиента"
          type="ingredient"
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModalSwitch />}>
          <Route index element={<Home />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRouteElement redirectTo="/" isAuthRequired={false}>
              <Login />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement redirectTo="/" isAuthRequired={false}>
              <Register />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement redirectTo="/" isAuthRequired={false}>
              <ForgotPassword />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement redirectTo="/" isAuthRequired={false}>
              <ResetPassword />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement redirectTo="/login" isAuthRequired={true}>
              <Profile />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile/*"
          element={
            <ProtectedRouteElement redirectTo="/login" isAuthRequired={true}>
              <Profile />
            </ProtectedRouteElement>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
