import { GetCurrentEmployeeInfoDataType } from "@order-certificate-types/fields";
import { createSlice } from "@reduxjs/toolkit";
import {
  ApplicationGoalEnum,
  CertificateTypeEnum,
  OrderCertificateFormStateEnum,
} from "../components/OrderCertificate/enums";

const initialState: {
  status: OrderCertificateFormStateEnum;
  userInfo: GetCurrentEmployeeInfoDataType;
  form: {
    certificateType: CertificateTypeEnum;
    applicationGoal: ApplicationGoalEnum;
    responsibleEmail: string;
  };
  /* result: {
    action: () => void;
  }; */
} = {
  status: OrderCertificateFormStateEnum.InitInfoFetching,
  userInfo: {
    DepartmentId: "",
    DepartmentName: "",
    DivisionName: "",
    EmployeeName: "",
    Id: "",
    Legal: [
      {
        Id: "",
        Title: "",
      },
    ],
    Position: "",
    TableNumber: "",
    Title: "",
  },
  form: {
    certificateType: CertificateTypeEnum.Empty,
    applicationGoal: ApplicationGoalEnum.Empty,
    responsibleEmail: "",
  },
  /* result: {
    action: () => {},
  }, */
};

const orderCertificateSlice = createSlice({
  name: "orderCertificate",
  initialState,
  reducers: {
    changeStatus(state, action) {
      state.status = action.payload;
    },
    changeCertificateType(state, action) {
      state.form.certificateType = action.payload;
    },
    changeApplicationGoal(state, action) {
      state.form.applicationGoal = action.payload;
    },
    changeResponsibleEmail(state, action) {
      state.form.responsibleEmail = action.payload;
    },
    changeUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    /* changeResultAction(state, action) {
      state.result.action = action.payload;
    }, */
  },
});

export const {
  changeStatus,
  changeCertificateType,
  changeApplicationGoal,
  changeResponsibleEmail,
  changeUserInfo,
  // changeResultAction,
} = orderCertificateSlice.actions;
export default orderCertificateSlice.reducer;
