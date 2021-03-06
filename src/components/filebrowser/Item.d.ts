import { WithStyles, StyleRules } from "@material-ui/core/styles";

export interface Props extends WithStyles<StyleRules> {
  path: string,
  directory?: boolean,
  label: string,
}

