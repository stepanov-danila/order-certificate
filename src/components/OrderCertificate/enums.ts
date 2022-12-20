enum OrderCertificateFormStateEnum {
  InitInfoFetching,
  DataFetching,
  Fetched,
  Error,
  Success,
  NotFound,
}

enum CertificateTypeEnum {
  Empty = "0", // Пустой
  NDFL = "1", // 2-НДФЛ
  EmploymentHistory = "2", // Копия трудовой книжки
  EmploymentApplication = "3", // Справка с места работы
}

enum EmploymentHistoryTypeEnum {
  Empty = "0", // Пустой
  Electronic = "1", // Электронная
  Paper = "2", // Бумажная
}

enum ApplicationPaperOriginalEnum {
  Empty = "0", // Пустой
  NotRequired = "1", // Не требуется
  CertifiedCopyRequired = "2", // Нужен заверенный экземпляр
  UncertifiedCopyRequired = "3", // Нужен незаверенный экземпляр
}

enum ApplicationPaperCopyEnum {
  Empty = "0", // Пустой
  NotRequired = "1", // Не требуется
  CertifiedCopyRequired = "2", // Нужен заверенный экземпляр
  UncertifiedCopyRequired = "3", // Нужен незаверенный экземпляр
}

enum ApplicationGoalEnum {
  Empty = "0", // Пустой
  Embassy = "1", // В посольство
  Kindergarten = "2", // В детский сад
  ChildBenefit = "3", // Для получения единовременного пособия в связи с рождением ребенка
  Other = "4", // Иная цель
  NotParentalLeave = "5", // О том, что я не в отпуске по уходу за ребенком
}

enum ApplicationReceiverEnum {
  Empty = "0", // Пустой
  Me = "1", // Для себя
  Family = "2", // Для семьи (спонсорское письмо)
}

enum RoadGoalEnum {
  Empty = "0", // Пустой
  Vacation = "1", // Отпуск
  BusinessTrip = "2", // Командировка
}

export {
  CertificateTypeEnum,
  EmploymentHistoryTypeEnum,
  ApplicationPaperOriginalEnum,
  ApplicationPaperCopyEnum,
  ApplicationGoalEnum,
  ApplicationReceiverEnum,
  RoadGoalEnum,
  OrderCertificateFormStateEnum,
};
