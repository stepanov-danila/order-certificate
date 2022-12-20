import {
  CurrentEmployeeInfoType,
  FetchedDataType,
  FileFieldDataType,
  initialFormPlaceholderType,
} from "@order-certificate-types/fields";
import {
  ApplicationGoalEnum,
  ApplicationPaperCopyEnum,
  ApplicationPaperOriginalEnum,
  ApplicationReceiverEnum,
  CertificateTypeEnum,
  EmploymentHistoryTypeEnum,
  RoadGoalEnum,
} from "./enums";

export const CURRENT_YEAR: number = new Date().getFullYear();
export const MIN_YEAR: number = 1990;

export const MAX_FILES_SIZE: number = 10000000;

export const acceptedFilesString: string =
  ".jpeg, .jpg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .txt, .rar, .zip";

export const acceptedFilesExtensions: string[] = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/octet-stream",
  "application/rar",
  "application/vnd.rar",
  "application/x-rar-compressed",
  "application/zip",
  "application/zip-compressed",
  "application/x-zip",
  "application/x-zip-compressed",
];

export const KAPIBARA_IMG_TOOLTIP =
  "Привет, я капибара Кузьма! Я живу в Московском зоопарке и меня опекает ЛАНИТ.";

export const RESULT_ERROR_TITLE = "Ой! Не получилось";
export const RESULT_ERROR_TEXT = (
  <>
    {
      "К сожалению, во время формирования заявки на заказ справки произошла ошибка."
    }
    <br />
    {"Пожалуйста, повторите операцию позднее."}
  </>
);
export const RESULT_ERROR_BTN_TEXT = "Заказать справку еще раз";

export const RESULT_404_TITLE = "Упс! Никого нет";
export const RESULT_404_TEXT = (
  <>
    В настоящее время сервис недоступен,
    <br />
    <>
      чтобы получить услугу обратитесь в <a href="/">отдел кадров</a>.
    </>
  </>
);

export const RESULT_SUCCESS_TITLE = "Поздравляем!";
export const RESULT_SUCCESS_TEXT = (
  <>
    {"Ваша заявка создана и передана специалисту."}
    <br />
    {
      "На вашу рабочую почту придет письмо с содержанием заявки и копией email-адреса специалиста."
    }
  </>
);
export const RESULT_SUCCESS_ADD_TEXT = (
  <>
    {"Срок изготовления заявки – 3 рабочих дня."}
    {/* <br />
    {
      "В ближайшее время вы получите email с содержанием заявки и копией email-адреса специалиста."
    }
    <br />
    {
      "Все вопросы по статусу обработки заявки вы можете направить ответом на полученный email."
    } */}
  </>
);

export const ELECTRONIC_EMPLOYMENT_HISTORY_TYPE_DESCRIPTION = (
  <>
    Будет сформирована справка по форме СТД-Р. Также выписку из трудовой книжки
    вы можете сформировать на портале&nbsp;
    <a href="https://www.gosuslugi.ru/600302/1/form?_=1651061185347">
      Госуcлуг
    </a>
    .
  </>
);

export const infoKeys = [
  "EmployeeId",
  "EmployeeName",
  "EmployeePosition",
  "EmployeeLegalId",
  "EmployeeLogin",
];
export const typeKey = ["CertificateType"];
export const commonKeys = [...infoKeys, ...typeKey];
export const ndflKeys = [...commonKeys, "Year"];
export const historyKeys = [
  ...commonKeys,
  "EmploymentHistoryTypeId",
  "EmploymentHistoryTypeValue",
  "Description",
  "ApplicationPaperOriginalId",
  "ApplicationPaperOriginalValue",
];
export const applicationKeys = [
  ...commonKeys,
  "ApplicationPaperCopyId",
  "ApplicationPaperCopyValue",
  "ApplicationGoalId",
  "ApplicationGoalValue",
  "ApplicationReceiverId",
  "ApplicationReceiverValue",
  "RoadGoalId",
  "RoadGoalValue",
  "EmbassyNameText",
  "RoadDate",
  "LeaveDate",
  "BirthCertificate",
  "BirthCertificateName",
  "BirthCertificateUrl",
  "MarriageCertificate",
  "MarriageCertificateName",
  "MarriageCertificateUrl",
  "NeedSalary",
  "ApplicationGoalText",
];

export const fetchDataPlaceholder: FetchedDataType = {
  info: {
    DepartmentId: "",
    DepartmentName: "",
    DivisionName: "",
    EmployeeName: "",
    Id: "",
    Legal: [
      {
        Id: "",
        Title: "",
        Default: true,
      },
    ],
    Position: "",
    TableNumber: "",
    Title: "",
  },
  types: [
    {
      Id: "",
      Title: "",
    },
  ],
  goals: [
    {
      Id: "",
      Title: "",
    },
  ],
  history: [
    {
      Id: "",
      Title: "",
    },
  ],
  roadGoals: [
    {
      Id: "",
      Title: "",
    },
  ],
  papers: [
    {
      Id: "",
      Title: "",
    },
  ],
  receivers: [
    {
      Id: "",
      Title: "",
    },
  ],
};

export const EPMTY_FILES_FIELD: FileFieldDataType[] = [
  {
    filename: "",
    filestream: "",
    size: 0,
    type: "",
  },
];

export const currentEmployeeInfoFormPlaceholder: CurrentEmployeeInfoType = {
  EmployeeId: "", // табельный номер
  EmployeeName: "", // ФИО
  EmployeePosition: "", // должность
  EmployeeLegalId: "0", // Id юридического лица
  EmployeeLogin: "", // логин
  // Title: "", // логин
};

export const initialFormPlaceholder: initialFormPlaceholderType = {
  ...currentEmployeeInfoFormPlaceholder,
  CertificateType: CertificateTypeEnum.Empty,
  Year: [CURRENT_YEAR.toString()],
  EmploymentHistoryTypeId: EmploymentHistoryTypeEnum.Empty, // Id вида трудовой книжки из справочника
  EmploymentHistoryTypeValue: "", // значение вида трудовой книжки из справочника
  Description:
    "Будет сформирована справка по форме СТД-Р. Также вы можете сформировать справку СТД-Р на портале Госуcлуг.", // Описание
  ApplicationPaperOriginalId: ApplicationPaperOriginalEnum.NotRequired, // Id в каком виде необходим оригинал из справочника
  ApplicationPaperOriginalValue: "Не требуется", // значение в каком виде необходим оригинал из справочника
  ApplicationPaperCopyId: ApplicationPaperCopyEnum.NotRequired, // Id в каком виде необходима копия из справочника
  ApplicationPaperCopyValue: "Не требуется", // значение в каком виде необходима копия из справочника
  ApplicationGoalId: ApplicationGoalEnum.Empty, // Id цели получения справки из справочника
  ApplicationGoalValue: "", // значение цели получения справки из справочника
  ApplicationReceiverId: ApplicationReceiverEnum.Empty, // Id для кого необходима справка из справочника
  ApplicationReceiverValue: "", // значение для кого необходима справка из справочника

  RoadGoalId: RoadGoalEnum.Empty, // Id цели поездки из справочника
  RoadGoalValue: "", // Id цели поездки из справочника

  EmbassyNameText: "", // Наименование посольства в виде текста

  RoadDate: [null, null], // Дата окончания поездки
  LeaveDate: [null, null], // Дата окончания поездки

  // BirthCertificate: EPMTY_FILES_FIELD, // Свидетельство о рождении ребенка в виде файла
  // BirthCertificateName: "", // Свидетельство о рождении ребенка в виде файла
  // BirthCertificateUrl: "", // Свидетельство о рождении ребенка в виде файла

  // MarriageCertificate: EPMTY_FILES_FIELD, // Свидетельство о браке в виде файла
  // MarriageCertificateName: "", // Свидетельство о браке в виде файла
  // MarriageCertificateUrl: "", // Свидетельство о браке в виде файла

  Files: EPMTY_FILES_FIELD,

  NeedSalary: true, // Требуется указание зарплаты
  ApplicationGoalText: "", // Назначение справки в виде текста
};
