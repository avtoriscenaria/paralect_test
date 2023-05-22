import { TextInput, useMantineTheme, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import "./styles.scss";
import { useState } from "react";

interface PropTypes {
  className?: string;
  placeholder: string;
  submitlabel: string;
  onSubmit: (value: string) => void;
}

export function InputWithButton({
  className,
  placeholder,
  submitlabel,
  onSubmit,
}: PropTypes) {
  const theme = useMantineTheme();
  const [value, setValue] = useState("");

  return (
    <TextInput
      data-elem="search-input"
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rightSection={
        <Button
          data-elem="search-button"
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          className="submitButton"
          onClick={() => onSubmit(value)}
        >
          {submitlabel}
        </Button>
      }
      placeholder={placeholder}
      rightSectionWidth={"auto"}
      className={`searchContainer${className ? " " + className : ""}`}
    />
  );
}
