import { PageTitleProps } from "@order-certificate-types/typography";

const PageTitle = ({ children, context = null }: PageTitleProps) => {
  return (
    <h1 className="page-title" data-page={context}>
      {children}
    </h1>
  );
};

export default PageTitle;
