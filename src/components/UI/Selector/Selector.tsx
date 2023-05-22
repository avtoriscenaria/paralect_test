import { useMemo, useRef, useState } from "react";
import "./styles.scss";
import { IconChevronDown } from "@tabler/icons-react";
import { useOnClickOutside } from "src/hooks/useOnClickOutside";

interface PropTypes {
  className?: string;
  label?: string;
  data: { key: string; label: string }[];
  selectedItem?: string;
  placeholder?: string;
  onSelect: (item: { key: string; label: string }) => void;
}

export const Selector = ({
  className,
  label,
  selectedItem,
  placeholder,
  data,
  onSelect,
}: PropTypes) => {
  const selectorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(selectorRef, () => setIsOpen(false));

  const _selectedItem = useMemo(() => {
    const item = (data || []).find((item) => item.key === selectedItem);

    if (item) {
      return item.label;
    }

    if (placeholder) {
      return <span className="selectorPlaceholder">{placeholder}</span>;
    }
  }, [data, placeholder, selectedItem]);

  return (
    <div
      className={`selectorContainer${className ? " " + className : ""}${
        isOpen ? " open" : ""
      }`}
      ref={selectorRef}
    >
      {label ? <label>{label}</label> : null}
      <div className="selectorWrapper">
        <div
          data-elem="industry-select"
          className="selectorLabel"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="selectorLabelText">{_selectedItem}</div>
          <div className="selectorArrow">
            <IconChevronDown />
          </div>
        </div>
        <ul className="selectorList">
          {data.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
