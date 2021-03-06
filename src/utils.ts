export class Result {
  code: number;
  message: string;
  data?: unknown;

  constructor(code: number, message: string, data?: unknown) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export function getToken(rawToken: string = '') {
  return rawToken.replace('Bearer ', '');
}
