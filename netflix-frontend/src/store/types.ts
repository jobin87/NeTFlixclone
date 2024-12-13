// Loading is true by default. Use case: When needed to call an api on page load.
export const basicInitialState: basicInitialStateProps = {
  data: null,
  loading: false,
  error: {},
};

// Loading is false by default. Use case: When needed to call an api on button click.
export const networkCallInitialState: basicInitialStateProps = {
  data: null,
  loading: false,
  error: {},
};

export interface basicInitialStateProps {
  data: null | object | any;
  loading: boolean;
  error: null | object;
}

