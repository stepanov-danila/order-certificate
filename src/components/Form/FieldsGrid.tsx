import React from "react";

export type FieldsGridProps = {
  children: React.ReactNode;
  context: string | null;
};

const FieldsGrid = ({ children, context }: FieldsGridProps) => {
  return (
    <div className="fields-grid" data-context={context ?? null}>
      {children}
    </div>
  );
};

export default FieldsGrid;
