import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import "./styles.scss";

interface PropTypes extends TextInputProps {
  submitlabel?: string;
}

export function InputWithButton(props: PropTypes) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <Button
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          className="submitButton"
        >
          {props.submitlabel}
        </Button>
      }
      placeholder="Search questions"
      rightSectionWidth={"auto"}
      {...props}
      className={`searchContainer${
        props.className ? " " + props.className : ""
      }`}
    />
  );
}
