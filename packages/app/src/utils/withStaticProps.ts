import React from "react";

export const withStaticProps = <TComponent extends React.ComponentType<any>, TProps>(
    component: TComponent,
    props: TProps
) => {
    return Object.assign(component, props) as TComponent & TProps;
};
