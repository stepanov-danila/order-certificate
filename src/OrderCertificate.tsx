import OrderCertificateForm from "./components/OrderCertificate/OrderCertificateForm";
import { OrderCertificateFormStateEnum } from "./components/OrderCertificate/enums";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus } from "./redux/selectors";
import {
  changeResponsibleEmail,
  changeStatus,
  changeUserInfo,
} from "./redux/slice";
import PostResultShowcase from "./components/OrderCertificate/PostResultShowcase";
import { useEffect, useState } from "react";
import { api } from "./api/api";
import { GetCurrentEmployeeInfoDataType } from "@order-certificate-types/fields";
import Preloader from "../AchievementsBoard/components/Preloader/Preloader";
import { getDefaultLegal } from "./components/OrderCertificate/utils";
import "./assets/styles/components/index.sass";

export const userLogin: string = _spPageContextInfo.userLoginName.toLowerCase();

const OrderCertificate: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const fetchData = async () => {
    try {
      const info: GetCurrentEmployeeInfoDataType =
        await api.getCurrentEmployeeInfo(userLogin);
      console.log("info:", info);

      const hasLegal = !!info?.Legal?.length && info?.Legal?.length !== 0;

      console.log(info, hasLegal);

      const email: string = await api.getResponsibleEmail(
        hasLegal ? getDefaultLegal(info.Legal).Id : "0000"
      );

      console.log("email", email);

      dispatch(changeResponsibleEmail(email.replace("{", "").replace("}", "")));

      if (!hasLegal) {
        dispatch(changeStatus(OrderCertificateFormStateEnum.NotFound));
      } else {
        dispatch(changeUserInfo(info));
        dispatch(changeStatus(OrderCertificateFormStateEnum.DataFetching));
      }
    } catch (error) {
      console.error(error);
      dispatch(changeStatus(OrderCertificateFormStateEnum.NotFound));
    }
  };

  const handleRender = (state: OrderCertificateFormStateEnum) => {
    switch (state) {
      case OrderCertificateFormStateEnum.DataFetching:
      case OrderCertificateFormStateEnum.Fetched:
      case OrderCertificateFormStateEnum.Error:
        return <OrderCertificateForm />;
      case OrderCertificateFormStateEnum.Success:
      case OrderCertificateFormStateEnum.NotFound:
        return <PostResultShowcase />;
      case OrderCertificateFormStateEnum.InitInfoFetching:
      default:
        return <Preloader isFullScreen />;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return <div className="order-certificate">{handleRender(status)}</div>;
};

export default OrderCertificate;
