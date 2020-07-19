import { HmacFunc } from '../../types';
export declare function totp(k: Uint8Array, hmacFunc: HmacFunc, digits: number, currentTimeMilliSeconds?: number): number;
