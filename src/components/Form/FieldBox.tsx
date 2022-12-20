import { FieldBoxProps } from "@order-certificate-types/forms";

const FieldBox = ({ head, body }: FieldBoxProps) => {
  return (
    <section className="field-box">
      <h2 className="field-box__head">{head}</h2>
      <div className="field-box__body">{body}</div>
    </section>
  );
};

export default FieldBox;
