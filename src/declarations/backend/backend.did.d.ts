import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Phone {
  'id' : string,
  'url' : string,
  'storage' : string,
  'name' : string,
  'color' : string,
  'description' : string,
  'image' : string,
  'price' : bigint,
}
export interface _SERVICE {
  'getPhone' : ActorMethod<[string], [] | [Phone]>,
  'getPhones' : ActorMethod<[], Array<Phone>>,
  'searchPhones' : ActorMethod<[string], Array<Phone>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
