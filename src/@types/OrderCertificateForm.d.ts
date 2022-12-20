declare module "@order-certificate-types/fields" {
  import {
    ApplicationGoalEnum,
    ApplicationPaperCopyEnum,
    ApplicationPaperOriginalEnum,
    ApplicationReceiverEnum,
    CertificateTypeEnum,
    EmploymentHistoryTypeEnum,
  } from "../Fields/OrderCertificate/enums";

  export type YearType = number[] | string[];

  export type DataListItemType = {
    Id: string;
    Title: string;
    Default?: boolean;
  };

  export type GetCurrentEmployeeInfoDataType = {
    DepartmentId: string;
    DepartmentName: string;
    DivisionName: string;
    EmployeeName: string;
    Id: string;
    Legal: DataListItemType[];
    Position: string;
    TableNumber: string;
    Title: string;
    Success?: boolean;
  };

  export type FetchedDataType = {
    info: GetCurrentEmployeeInfoDataType;
    types: DataListItemType[];
    goals: DataListItemType[];
    history: DataListItemType[];
    roadGoals: DataListItemType[];
    papers: DataListItemType[];
    receivers: DataListItemType[];
  };

  export type FileFieldDataType = {
    filename: string;
    filestream: any;
    size: number;
    type: string;
  };

  // Тип сертификата
  export type CertificateTypeType = {
    CertificateType: CertificateTypeEnum;
  };

  // Данные о текущем пользователе для отправки
  export type CurrentEmployeeInfoType = {
    // Title: string; //
    EmployeeLogin: string; //
    EmployeeId: string; // табельный номер - “00021437”
    EmployeeName: string; // ФИО - “Куликова Юлия Михайловна”
    EmployeePosition: string; // должность - “Системный аналитик”
    EmployeeLegalId: number | string; // Id юридического лица - “0469”
  };

  // Плейсхолдер для полей формы
  export type initialFormPlaceholderType = CurrentEmployeeInfoType &
    CertificateTypeType & {
      Year: YearType;

      EmploymentHistoryTypeId: EmploymentHistoryTypeEnum; // Id вида трудовой книжки из справочника
      EmploymentHistoryTypeValue: string; // значение вида трудовой книжки из справочника
      Description: string;
      ApplicationPaperOriginalId: ApplicationPaperOriginalEnum; // Id в каком виде необходим оригинал из справочника
      ApplicationPaperOriginalValue: string; // значение в каком виде необходим оригинал из справочника
      ApplicationPaperCopyId: ApplicationPaperCopyEnum; // Id в каком виде необходима копия из справочника
      ApplicationPaperCopyValue: string; // значение в каком виде необходима копия из справочника

      ApplicationGoalId: ApplicationGoalEnum; // Id цели получения справки из справочника
      ApplicationGoalValue: string; // значение цели получения справки из справочника
      ApplicationReceiverId: ApplicationReceiverEnum; // Id для кого необходима справка из справочника
      ApplicationReceiverValue: string; // значение для кого необходима справка из справочника
      RoadGoalId: RoadGoalEnum; // Id цели поездки из справочника
      RoadGoalValue: string; // значение цели поездки из справочника
      EmbassyNameText: string; // Наименование посольства в виде текста

      RoadDate: [any, any]; // Дата окончания поездки
      LeaveDate: [any, any]; // Дата окончания поездки

      // BirthCertificate: FileFieldDataType[]; // Свидетельство о рождении ребенка в виде файла
      // BirthCertificateName: string; // Свидетельство о рождении ребенка в виде файла
      // BirthCertificateUrl: string; // Свидетельство о рождении ребенка в виде файла

      // MarriageCertificate: FileFieldDataType[]; // Свидетельство о браке в виде файла
      // MarriageCertificateName: string; // Свидетельство о браке в виде файла
      // MarriageCertificateUrl: string; // Свидетельство о браке в виде файла

      Files: FileFieldDataType[];

      NeedSalary: boolean; // Требуется указание зарплаты
      ApplicationGoalText: string; // Назначение справки в виде текста
    };

  /* === API === */

  export type PostCurrentEmployeeInfoType = {
    EmployeeId: string; // табельный номер - “00021437”
    EmployeeName: string; // ФИО - “Куликова Юлия Михайловна”
    EmployeePosition: string; // должность - “Системный аналитик”
    EmployeeLegalId: number | string; // Id юридического лица - “0469”
    EmployeeLogin: string; //
    // title: string; //
  };

  // POST - Отправка запроса на справку “2-НДФЛ”
  export type PostCreate2NDFLType = PostCurrentEmployeeInfoType & {
    Year: YearType; // год
  };

  // POST - Отправка запроса на справку “Копия трудовой книжки”
  export type PostCreateEmploymentHistoryType = PostCurrentEmployeeInfoType & {
    EmploymentHistoryTypeId: number; // Id вида трудовой книжки из справочника
    EmploymentHistoryTypeValue: string; // значение вида трудовой книжки из справочника
    Description: string; // Описание
    ApplicationPaperOriginalId: number; // Id в каком виде необходим оригинал из справочника
    ApplicationPaperOriginalValue: string; // значение в каком виде необходим оригинал из справочника
    ApplicationPaperCopyId: number; // Id в каком виде необходима копия из справочника
    ApplicationPaperCopyValue: string; // значение в каком виде необходима копия из справочника
  };

  // POST - Отправка запроса на  справку “Справка с места работы”
  export type PostCreateEmploymentApplicationType =
    PostCurrentEmployeeInfoType & {
      ApplicationGoalId: number; // Id цели получения справки из справочника
      ApplicationGoalValue: string; // значение цели получения справки из справочника
      ApplicationReceiverId: number; // Id для кого необходима справка из справочника
      ApplicationReceiverValue: string; // значение для кого необходима справка из справочника

      RoadGoalId: number; // Id цели поездки из справочника
      RoadGoalValue: string; // значение цели поездки из справочника
      RoadStart: string; // Дата начала поездки
      RoadEnd: string; // Дата окончания поездки
      LeaveStart: string; // Дата начала отпуска
      LeaveEnd: string; // Дата окончания отпуска

      /* birthCertificateName: string; // Свидетельство о рождении ребенка в виде файла
      birthCertificateUrl: string; // Свидетельство о рождении ребенка в виде файла

      marriageCertificateName: string; // Свидетельство о браке в виде файла
      marriageCertificateUrl: string; // Свидетельство о браке в виде файла */

      Filenames: string[];
      Files: string[];

      NeedSalary: boolean; // Требуется указание зарплаты
      ApplicationGoalText: string; // Цель получения справки в виде текста
    };

  export type PostOrderCertificateFormType =
    | PostCreate2NDFLType
    | PostCreateEmploymentHistoryType
    | PostCreateEmploymentApplicationType
    | PostCurrentEmployeeInfoType;
}
