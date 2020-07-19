import { totp as _totp } from './alg/otp/totp';
export declare const totp: typeof _totp;
export declare function generateTotp(base32Secret: string): number;
