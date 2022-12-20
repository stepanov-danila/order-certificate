type TitleProps = {
  children: any;
  context?: string | null;
  [key: string]: any;
};

export const H1 = ({ children, context = null, ...rest }: TitleProps) => {
  return (
    <h1 className="h1" data-text={context} {...rest}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, context = null, ...rest }: TitleProps) => {
  return (
    <h2 className="h2" data-text={context} {...rest}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, context = null, ...rest }: TitleProps) => {
  return (
    <h3 className="h3" data-text={context} {...rest}>
      {children}
    </h3>
  );
};
