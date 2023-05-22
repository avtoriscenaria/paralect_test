import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import "./styles.scss";

interface PropTypes {
  children: any;
  label: string;
}

export const Accordion = ({ children, label }: PropTypes) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordionContainer${open ? " open" : ""}`}>
      <button className="accordionBtn" onClick={() => setOpen(!open)}>
        {label} <IconChevronDown />
      </button>
      <div className="contentWrapper">{children}</div>
    </div>
  );
};
