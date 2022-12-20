import { GetCurrentEmployeeInfoDataType } from "@order-certificate-types/fields";
import { createSelector } from "reselect";
import {
  ApplicationGoalEnum,
  CertificateTypeEnum,
  OrderCertificateFormStateEnum,
} from "../components/OrderCertificate/enums";
/**
 * Адаптер стора под redux-form
 */
export const selectStatus = createSelector<any, OrderCertificateFormStateEnum>(
  ({ orderCertificate }) => orderCertificate,
  ({ status }) => status
);

export const selectCertificateType = createSelector<any, CertificateTypeEnum>(
  ({ orderCertificate }) => orderCertificate,
  ({ form }) => form.certificateType
);

export const selectApplicationGoal = createSelector<any, ApplicationGoalEnum>(
  ({ orderCertificate }) => orderCertificate,
  ({ form }) => form.applicationGoal
);
export const selectResponsibleEmail = createSelector<any, string>(
  ({ orderCertificate }) => orderCertificate,
  ({ form }) => form.responsibleEmail
);

export const selectUserInfo = createSelector<
  any,
  GetCurrentEmployeeInfoDataType
>(
  ({ orderCertificate }) => orderCertificate,
  ({ userInfo }) => userInfo
);

/* export const selectResultAction = createSelector<any, () => void>(
  ({ orderCertificate }) => orderCertificate,
  ({ result }) => result.action
); */
