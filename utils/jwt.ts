export const parseJwt = (token: string): { uid: string } => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}
