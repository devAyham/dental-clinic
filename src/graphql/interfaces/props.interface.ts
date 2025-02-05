export interface Props {
  id?: number;
  data?: any;
  modelName?: string;
}

export interface OtpProps {
  phone_number: string;
  template?: string;
  verify_code?: string;
}
