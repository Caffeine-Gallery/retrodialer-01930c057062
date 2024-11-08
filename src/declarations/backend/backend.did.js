export const idlFactory = ({ IDL }) => {
  const Phone = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'storage' : IDL.Text,
    'name' : IDL.Text,
    'color' : IDL.Text,
    'description' : IDL.Text,
    'image' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'getPhone' : IDL.Func([IDL.Text], [IDL.Opt(Phone)], ['query']),
    'getPhones' : IDL.Func([], [IDL.Vec(Phone)], ['query']),
    'searchPhones' : IDL.Func([IDL.Text], [IDL.Vec(Phone)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
