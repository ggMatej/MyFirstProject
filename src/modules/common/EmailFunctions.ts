import { Linking } from 'react-native';
import qs from 'qs';

export function validateEmail(email: string): boolean {
  const emailIsValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
  return emailIsValid;
}

export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<any> {
  let url = `mailto:${to}`;

  const query = qs.stringify({
    subject,
    body
  });

  if (query.length) {
    url += `?${query}`;
  }

  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) throw new Error('Provided URL can not be handled!');
  return Linking.openURL(url);
}
