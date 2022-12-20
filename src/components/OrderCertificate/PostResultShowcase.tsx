import { useSelector } from "react-redux";
import {
  selectResponsibleEmail,
  // selectResultAction,
  selectStatus,
} from "../../redux/selectors";
import Button from "../Buttons/Button";
import {
  Kapibara404,
  KapibaraError,
  KapibaraSuccess,
} from "../Svg/Icons/SvgIcons";
import Text from "../Text/Text";
import { H1 } from "../Titles/Titiles";
import {
  KAPIBARA_IMG_TOOLTIP,
  RESULT_404_TITLE,
  RESULT_ERROR_BTN_TEXT,
  RESULT_ERROR_TEXT,
  RESULT_ERROR_TITLE,
  RESULT_SUCCESS_ADD_TEXT,
  RESULT_SUCCESS_TEXT,
  RESULT_SUCCESS_TITLE,
} from "./constants";
import { OrderCertificateFormStateEnum } from "./enums";
import { setResponsibleEmail } from "./utils";

export type PostResultShowcaseDataType = {
  pic: React.ReactNode;
  title: React.ReactNode | string;
  text: React.ReactNode | string;
  addText?: React.ReactNode | string;
  btnText?: string;
  // btnAction?: () => void;
};

export type PostResultShowcaseProps = {
  btnAction?: () => void;
};

const PostResultShowcase = ({
  btnAction = () => {},
}: PostResultShowcaseProps) => {
  const status = useSelector(selectStatus);
  const responsibleEmail = useSelector(selectResponsibleEmail);
  // const resultAction = useSelector(selectResultAction);

  const handleData = (status) => {
    switch (status) {
      case OrderCertificateFormStateEnum.NotFound:
        return {
          pic: <Kapibara404 title={KAPIBARA_IMG_TOOLTIP} />,
          title: RESULT_404_TITLE,
          text: setResponsibleEmail(responsibleEmail),
        };
      case OrderCertificateFormStateEnum.Success:
        return {
          pic: <KapibaraSuccess title={KAPIBARA_IMG_TOOLTIP} />,
          title: RESULT_SUCCESS_TITLE,
          text: RESULT_SUCCESS_TEXT,
          addText: RESULT_SUCCESS_ADD_TEXT,
        };
      case OrderCertificateFormStateEnum.Error:
      default:
        return {
          pic: <KapibaraError title={KAPIBARA_IMG_TOOLTIP} />,
          title: RESULT_ERROR_TITLE,
          text: RESULT_ERROR_TEXT,
          btnText: RESULT_ERROR_BTN_TEXT,
        };
    }
  };

  const data: PostResultShowcaseDataType = handleData(status);

  return (
    <section className="post-result-showcase" data-status-id={status}>
      <figure>{data.pic}</figure>
      <H1 style={{ textAlign: "left" }}>{data.title}</H1>
      <Text style={{ color: "#1F1F1F", textAlign: "left" }}>{data.text}</Text>
      {data?.addText && (
        <Text style={{ color: "#1F1F1F", textAlign: "left" }}>
          {data?.addText}
        </Text>
      )}
      {data?.btnText && status === OrderCertificateFormStateEnum.Error && (
        <Button
          handleClick={() => {
            btnAction();
          }}
        >
          {data?.btnText ?? ""}
        </Button>
      )}
    </section>
  );
};

export default PostResultShowcase;
