"use client";
import { MotionConfig as MC } from "framer-motion";

interface Props {
  children?: React.ReactNode;
}
const MotionConfig = ({ children }: Props) => (
  <MC reducedMotion="user">{children}</MC>
);

export default MotionConfig;
