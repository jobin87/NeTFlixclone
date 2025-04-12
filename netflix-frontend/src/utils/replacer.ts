// import { IUserDetails } from 'src/types/user';

export function replaceValues(data: string) {
  // const userDetails: IUserDetails = auth?.data;

  const replacements = [
    {
      data: '{sellerId}',
      // value: userDetails?.sellerId,
    },
    {
      data: '{userId}',
      // value: userDetails?.userId,
    },
  ];

  replacements.forEach(({ data: placeholder,  }) => {
    data = data.replace(new RegExp(placeholder, 'g'),"j" );
  });
  // value value
  return data;
}
