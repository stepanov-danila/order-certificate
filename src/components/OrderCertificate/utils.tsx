import {
  DataListItemType,
  FileFieldDataType,
  initialFormPlaceholderType,
  PostCreate2NDFLType,
  PostCreateEmploymentApplicationType,
  PostCreateEmploymentHistoryType,
  PostCurrentEmployeeInfoType,
  PostOrderCertificateFormType,
} from "@order-certificate-types/fields";
import { SelectMenuItemType } from "@order-certificate-types/inputs";
import {
  applicationKeys,
  commonKeys,
  historyKeys,
  ndflKeys,
} from "./constants";
import { ApplicationGoalEnum, CertificateTypeEnum } from "./enums";
import * as yup from "yup";

export const getFormPostData = (
  form: initialFormPlaceholderType
): PostOrderCertificateFormType => {
  const {
    EmployeeId,
    EmployeeName,
    EmployeePosition,
    EmployeeLegalId,
    EmployeeLogin,
    Year,
    EmploymentHistoryTypeId,
    EmploymentHistoryTypeValue,
    Description,
    ApplicationPaperOriginalId,
    ApplicationPaperOriginalValue,
    ApplicationPaperCopyId,
    ApplicationPaperCopyValue,
    ApplicationGoalId,
    ApplicationGoalValue,
    ApplicationReceiverId,
    ApplicationReceiverValue,
    RoadGoalId,
    RoadGoalValue,
    EmbassyNameText,
    RoadDate,
    LeaveDate,
    // BirthCertificate,
    // BirthCertificateName,
    // BirthCertificateUrl,
    // MarriageCertificate,
    // MarriageCertificateName,
    // MarriageCertificateUrl,
    Files,
    NeedSalary,
    ApplicationGoalText,
  } = form;

  const currentEmployeeInfoPostData: PostCurrentEmployeeInfoType = {
    // title: Title,
    EmployeeLogin,
    EmployeeId,
    EmployeeName,
    EmployeePosition,
    EmployeeLegalId,
    // CertificateType,
  };

  switch (form.CertificateType) {
    case CertificateTypeEnum.NDFL:
      return {
        ...currentEmployeeInfoPostData,
        Year,
      } as PostCreate2NDFLType;
    case CertificateTypeEnum.EmploymentHistory:
      return {
        ...currentEmployeeInfoPostData,
        EmploymentHistoryTypeId,
        EmploymentHistoryTypeValue,
        Description,
        ApplicationPaperOriginalId,
        ApplicationPaperOriginalValue,
        ApplicationPaperCopyId,
        ApplicationPaperCopyValue,
      } as PostCreateEmploymentHistoryType;
    case CertificateTypeEnum.EmploymentApplication:
      return {
        ...currentEmployeeInfoPostData,
        ApplicationGoalId,
        ApplicationGoalValue,
        ApplicationReceiverId,
        ApplicationReceiverValue,
        RoadGoalId,
        RoadGoalValue,

        RoadStart: RoadDate[0]?.format("DD/MM/YYYY") ?? "", // 13/04/2022
        RoadEnd: RoadDate[1]?.format("DD/MM/YYYY") ?? "", // 13/04/2022

        LeaveStart: LeaveDate[0]?.format("DD/MM/YYYY") ?? "", // 13/04/2022
        LeaveEnd: LeaveDate[1]?.format("DD/MM/YYYY") ?? "", // 13/04/2022

        NeedSalary,
        ApplicationGoalText:
          ApplicationGoalId === ApplicationGoalEnum.Embassy
            ? EmbassyNameText
            : ApplicationGoalText,

        /* birthCertificateName: checkFiles(BirthCertificate)
          ? BirthCertificateName
          : "",
        birthCertificateUrl: checkFiles(BirthCertificate)
          ? BirthCertificateUrl
          : "",

        marriageCertificateName: checkFiles(MarriageCertificate)
          ? MarriageCertificateName
          : "",
        marriageCertificateUrl: checkFiles(MarriageCertificate)
          ? MarriageCertificateUrl
          : "", */

        Filenames: Files.map((file) => file.filename),
        Files: Files.map((file) => file.filestream),
      } as PostCreateEmploymentApplicationType;
    default:
      return {
        ...currentEmployeeInfoPostData,
      };
  }
};

export const getCertificateTypeName = (
  certificateType: CertificateTypeEnum
) => {
  switch (certificateType) {
    case CertificateTypeEnum.NDFL:
      return "2-НДФЛ";
    case CertificateTypeEnum.EmploymentHistory:
      return "Копия трудовой книжки";
    case CertificateTypeEnum.EmploymentApplication:
      return "Справка с места работы";
    case CertificateTypeEnum.Empty:
    default:
      return "Empty";
  }
};

export const setCertificateSubmitDisabled = (
  certificateType: CertificateTypeEnum
): boolean => {
  switch (certificateType) {
    case CertificateTypeEnum.NDFL:
    case CertificateTypeEnum.EmploymentHistory:
    case CertificateTypeEnum.EmploymentApplication:
      return false;
    default:
      return true;
  }
};

export const getApplicationRequestName = (
  certificateType: CertificateTypeEnum
): string => {
  switch (certificateType) {
    case CertificateTypeEnum.NDFL:
      return "Create2NDFL";
    case CertificateTypeEnum.EmploymentHistory:
      return "CreateEmploymentHistory";
    case CertificateTypeEnum.EmploymentApplication:
      return "CreateEmploymentApplication";
    default:
      return "";
  }
};

export const setYearMenuItemsArray = (
  currentYear: number,
  minYear: number
): SelectMenuItemType[] => {
  const value = [];
  for (let index = currentYear; index >= minYear; index--) {
    value.push({
      Id: index.toString(),
      Title: index.toString(),
    });
  }
  return value;
};

export const formatPostDataContentType = (
  data: PostOrderCertificateFormType | FileFieldDataType
): string => {
  const arr = [];

  Object.entries(data).forEach((item: [string, string]) => {
    arr.push(`${item[0]}=${item[1]}`);
  });

  return arr.join("&");
};

export const filterKeys = (keys, form: initialFormPlaceholderType) => {
  console.log(keys, form);
  const filtered = Object.keys(form)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = form[key];
      return obj;
    }, {});
  return filtered;
};

export const filterForm = (form: initialFormPlaceholderType) => {
  switch (form.CertificateType) {
    case CertificateTypeEnum.NDFL:
      return filterKeys(ndflKeys, form);
    case CertificateTypeEnum.EmploymentHistory:
      return filterKeys(historyKeys, form);
    case CertificateTypeEnum.EmploymentApplication:
      return filterKeys(applicationKeys, form);
    default:
      return filterKeys(commonKeys, form);
  }
};

export const getValidateSchema = (
  certificateType: CertificateTypeEnum,
  ApplicationGoal: ApplicationGoalEnum
) => {
  console.log(certificateType, ApplicationGoal);
  const yupString = yup.string();
  const yupNumber = yup.number();
  const yupBoolean = yup.boolean();
  const yupArray = yup.array();
  const yupObject = yup.object();

  const validateObj = {
    string: yupString,
    stringReq: yupString.min(1).required(),
    stringLimitedReq: (max) => yupString.min(3).max(max).required(),
    number: yupNumber,
    numberReq: yupNumber.min(1).required(),
    boolean: yupBoolean,
    booleanReq: yupBoolean.required(),
    array: yupArray,
    arrayReq: yupArray.of(yupString.required()).min(1).required(),
    object: yupObject,
    objectReq: yupArray
      .of(
        yupObject
          .shape({
            filename: yupString.min(1).required(),
            filestream: yupString.min(1).required(),
            size: yupNumber.required(),
            type: yupString.min(1).required(),
          })
          .required()
      )
      .min(1)
      .required(),
  };

  return yup
    .object({
      EmployeeId: validateObj.stringReq,
      EmployeeName: validateObj.stringReq,
      EmployeePosition: validateObj.stringReq,
      EmployeeLegalId: validateObj.stringReq,
      EmployeeLogin: validateObj.stringReq,
      CertificateType: validateObj.stringReq,

      Year:
        certificateType === CertificateTypeEnum.NDFL
          ? validateObj.arrayReq.max(4)
          : validateObj.array,

      EmploymentHistoryTypeId:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.numberReq
          : validateObj.number,
      EmploymentHistoryTypeValue:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.stringReq
          : validateObj.string,
      Description:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.stringReq
          : validateObj.string,
      ApplicationPaperOriginalId:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.numberReq
          : validateObj.number,
      ApplicationPaperOriginalValue:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.stringReq
          : validateObj.string,
      ApplicationPaperCopyId:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.numberReq
          : validateObj.number,
      ApplicationPaperCopyValue:
        certificateType === CertificateTypeEnum.EmploymentHistory
          ? validateObj.stringReq
          : validateObj.string,

      ApplicationGoalId:
        certificateType === CertificateTypeEnum.EmploymentApplication
          ? validateObj.numberReq
          : validateObj.number,
      ApplicationGoalValue:
        certificateType === CertificateTypeEnum.EmploymentApplication
          ? validateObj.stringReq
          : validateObj.string,
      ApplicationReceiverId:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Embassy
          ? validateObj.numberReq
          : validateObj.number,
      ApplicationReceiverValue:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Embassy
          ? validateObj.stringReq
          : validateObj.string,
      RoadGoalId:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Embassy
          ? validateObj.numberReq
          : validateObj.number,
      RoadGoalValue:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Embassy
          ? validateObj.stringReq
          : validateObj.string,
      EmbassyNameText:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Embassy
          ? validateObj.stringLimitedReq(150)
          : validateObj.string,
      RoadDate: validateObj.array,
      // RoadDate:
      //   certificateType === CertificateTypeEnum.EmploymentApplication &&
      //   ApplicationGoal === ApplicationGoalEnum.Embassy
      //     ? validateObj.arrayReq
      //     : validateObj.array,
      LeaveDate:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Kindergarten
          ? validateObj.arrayReq
          : validateObj.array,
      /* BirthCertificate:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.objectReq
          : validateObj.array,
      BirthCertificateName:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.stringReq
          : validateObj.string,
      BirthCertificateUrl:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.stringReq
          : validateObj.string,
      MarriageCertificate:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.objectReq
          : validateObj.array,
      MarriageCertificateName:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.stringReq
          : validateObj.string,
      MarriageCertificateUrl:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.stringReq
          : validateObj.string, */
      Files:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        (ApplicationGoal === ApplicationGoalEnum.ChildBenefit ||
          ApplicationGoal === ApplicationGoalEnum.NotParentalLeave)
          ? validateObj.objectReq
          : validateObj.array,
      NeedSalary:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Other
          ? validateObj.booleanReq
          : validateObj.boolean,
      ApplicationGoalText:
        certificateType === CertificateTypeEnum.EmploymentApplication &&
        ApplicationGoal === ApplicationGoalEnum.Other
          ? validateObj.stringLimitedReq(200)
          : validateObj.string,
    })
    .required();
};

export const setResponsibleEmail = (email: string = "/") => {
  return (
    <>
      {"В настоящее время сервис недоступен,"}
      <br />
      <>
        чтобы получить услугу обратитесь в{" "}
        {email ? (
          <a href={`mailto:${email}`}>отдел кадров.</a>
        ) : (
          "отдел кадров."
        )}
      </>
    </>
  );
};

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// export const checkFiles = (files: FileFieldDataType[]): boolean =>
//   !(files.length === 1 && files[0].filename === "");

export const getTitleFromArrayItem = (
  array: DataListItemType[],
  id: string
): string => {
  console.log(array, id);
  const targetItem = array.find((item) => item.Id === id);
  console.log(targetItem);
  return targetItem.Title;
};

export const getDefaultLegal = (Legal: DataListItemType[]): DataListItemType =>
  Legal.find((legalItem, index) => legalItem.Default === true || index === 0);
