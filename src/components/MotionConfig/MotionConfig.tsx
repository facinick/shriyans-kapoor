"use client";
import { MotionConfig as MC } from "framer-motion";

interface Props {
  children?: React.ReactNode
}

export const MotionConfig = ({ children }: Props) => (
  <MC reducedMotion="user">{children}</MC>
);
