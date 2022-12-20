import { FileFieldDataType } from "@order-certificate-types/fields";
import axios from "axios";
import { CertificateTypeEnum } from "../components/OrderCertificate/enums";
import {
  formatPostDataContentType,
  getApplicationRequestName,
} from "../components/OrderCertificate/utils";

// Конкретный экземпляр axios, для настройки работы с одним api
const getInstance = axios.create({
  baseURL: "/references/_vti_bin/MyLanit.Applications/webservice.svc",
});

const postInstance = axios.create({
  baseURL: "/references/_vti_bin/MyLanit.Applications/webservice.svc",
});

const get = (url, params = {}) => {
  return getInstance
    .get(url, {
      params,
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        // console.log(error.response);
        return error.response;
      } else if (error.request) {
        // client never received a response, or request never left
        // console.log(error);
        // console.log(error.request);
        return error.request;
      } else {
        // anything else
        // console.log("Произошла ошибка");
      }
    });
};

const post = (url, data) => {
  return postInstance
    .post(url, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        // console.log(error.response);
        return error.response;
      } else if (error.request) {
        // client never received a response, or request never left
        // console.log(error);
        // console.log(error.request);
        return error.request;
      } else {
        // anything else
        // console.log("Произошла ошибка");
      }
    });
};

export const api = {
  getCurrentEmployeeInfo(epmloyeeLogin: string) {
    const data = { epmloyeeLogin };
    console.log(data);
    return get("GetCurrentEmployeeInfo", data);
  },

  // Тип справки
  getApplicationTypes() {
    return get("GetApplicationTypes");
  },

  // Цель справки
  getApplicationGoals() {
    return get("GetApplicationGoals");
  },

  // Вид трудовой книжки
  getEmploymentHistoryType() {
    return get("GetEmploymentHistoryType");
  },

  // Назначение поездки
  getRoadGoals() {
    return get("GetRoadGoals");
  },

  // Оригинал (копия) справки
  getApplicationPapers() {
    return get("GetApplicationPapers");
  },

  // Назначение справки (данные о получателе справки)
  getApplicationReceivers() {
    return get("GetApplicationReceivers");
  },

  // Назначение справки (данные о получателе справки)
  getResponsibleEmail(LegalId: string) {
    const data = { code: LegalId };
    console.log(data);
    return get("GetResponsibleEmail", data);
  },

  postUploadFilesToDocumentLibrary(files: FileFieldDataType[]) {
    const data = files;

    return post("UploadFilesToDocumentLibrary", data);
  },

  /* postUploadFileToDocumentLibrary(filename: string, filestream: any) {
    const data: FileFieldDataType = {
      filename,
      filestream,
    };

    return post("UploadFileToDocumentLibrary", formatPostDataContentType(data));
  }, */

  postApplicationRequest(certificateType: CertificateTypeEnum, data: string) {
    return post(getApplicationRequestName(certificateType), data);
  },
};
