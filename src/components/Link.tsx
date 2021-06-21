import { Node } from '@ontologies/core';
import * as H from "history";
import { useLinkRenderContext } from 'link-redux';
import { FC } from "react";
import * as React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export type Props<S = H.LocationState> = { to?: Node } & Omit<NavLinkProps<S>, "to">

/**
 * Renders a navigation element
 *
 * Will default to navigate to the resource in the current render context.
 */
const Link: FC<Props> = ({ children, to, ...props }) => {
  const { subject } = useLinkRenderContext();

  return (
    <NavLink
      to={`/?resource=${encodeURIComponent(to?.value || subject.value)}`}
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default Link;
