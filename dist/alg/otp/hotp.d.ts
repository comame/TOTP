import { HmacFunc } from '../../types';
export declare function hotp(k: Uint8Array, c: Uint8Array, digits: number, hmacFunc: HmacFunc): number;
