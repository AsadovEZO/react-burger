import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import { Feed } from "./pages/Feed";
import { NotFound404 } from "./pages/Not-found-404";
import { Orders } from "./pages/Orders";
import OrderPage from "./pages/Order-page";

import ProtectedRouteElement from "./services/protected-route";
import { useAppDispatch, RootState } from "./services/store";

import Modal from "./components/modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import {
  hideIngredient,
  showIngredient,
} from "./services/ingredient-details-slice";
import { hideOrder } from "./services/order-preview-slice";
import OrderDetails from "./components/orders/order-details";
import useAuthCheck from "./services/user/auth-check";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAuthCheck();

  const background = location.state && location.state.background;

  const selectedIngredient = useSelector(
    (state: RootState) => state.ingredientDetails.selectedIngredient
  );
  const selectedOrder = useSelector(
    (state: RootState) => state.orderPreview.selectedOrder
  );

  const ingredients = useSelector(
    (state: RootState) => state.burgerIngredients.data
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const isIngredientModal = location.pathname.startsWith("/ingredients/");
    const id = location.pathname.split("/").pop();

    if (isIngredientModal && ingredients.length && id) {
      const item = ingredients.find((i) => i._id === id);
      if (item) {
        dispatch(showIngredient(item));
      }
    }
  }, [location.pathname, ingredients, dispatch]);

  const closeIngredientModal = () => {
    dispatch(hideIngredient());
    navigate(-1);
  };

  const closeOrderModal = () => {
    dispatch(hideOrder());
    navigate(-1);
  };

  if (isLoading) return <div>Проверка авторизации...</div>;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderPage />} />
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
          path="/profile/orders"
          element={
            <ProtectedRouteElement redirectTo="/login" isAuthRequired={true}>
              <Orders />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRouteElement redirectTo="/login" isAuthRequired={true}>
              <OrderPage />
            </ProtectedRouteElement>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background &&
        location.pathname.startsWith("/ingredients/") &&
        selectedIngredient && (
          <Modal
            onCloseButtonClick={closeIngredientModal}
            headerText="Детали ингредиента"
            type="ingredient"
          >
            <IngredientDetails />
          </Modal>
        )}

      {(background ||
        location.pathname.startsWith("/feed/") ||
        location.pathname.startsWith("/profile/orders/")) &&
        selectedOrder && (
          <Modal
            onCloseButtonClick={closeOrderModal}
            headerText="Информация о заказе"
            type="order"
          >
            <OrderDetails order={selectedOrder} />
          </Modal>
        )}
    </>
  );
}

export default App;
