import Text from "../Text/Text";
import { H3 } from "../Titles/Titiles";

type UserTextInfoProps = {
  title: string;
  text: string;
  valid?: boolean;
};

const UserTextInfo = ({ title, text, valid = true }: UserTextInfoProps) => {
  return (
    <div className="user-text-info" data-valid={valid}>
      <H3 context="fio">{title}</H3>
      <Text>{text}</Text>
    </div>
  );
};

export default UserTextInfo;
